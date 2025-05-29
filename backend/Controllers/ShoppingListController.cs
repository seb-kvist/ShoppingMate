using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

using ShoppingMate.Data;
using ShoppingMate.Models;
using ShoppingMate.DTO.ShoppingList;

namespace ShoppingMate.Controllers
{
    [Authorize] // Alla endpoints kräver inloggning (JWT)
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        // Konstruktor – injicerar databas och användarhantering
        public ShoppingListController(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Hämta alla inköpslistor för inloggad användare (GET: api/shoppinglist)
        [HttpGet]
        public async Task<IActionResult> GetUserShoppingLists()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Hämta userId från JWT-token


            // Hämta alla listor där användaren är ägare eller medlem
            var shoppingLists = await _context.ShoppingLists
                .Include(l => l.ListMembers)
                    .ThenInclude(lm => lm.User)
                .Where(list => list.OwnerId == userId
                    || list.ListMembers.Any(m => m.UserId == userId))
                .ToListAsync();

            // Gör om listor till DTOs för frontend
            var result = shoppingLists.Select(list => new ShoppingListDto
            {
                Id = list.Id,
                Name = list.Name,
                OwnerId = list.OwnerId,
                CreatedAt = list.CreatedAt,
                ListMembers = list.ListMembers.Select(lm => new ListMemberDto
                {
                    UserId = lm.UserId,
                    Email = lm.User?.Email ?? ""
                }).ToList()
            });

            return Ok(result);
        }

        //Skapa en ny inköpslista (POST: api/shoppinglist)
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateShoppingList([FromBody] ShoppingListCreateDto dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Name))
            {
                return BadRequest("Invalid data.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            // Skapa ny ShoppingList och spara till databas
            var shoppingList = new ShoppingList
            {
                Name = dto.Name,
                OwnerId = userId,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                _context.ShoppingLists.Add(shoppingList);
                await _context.SaveChangesAsync();

                // Lägg till ägaren som medlem direkt
                var listMember = new ListMember
                {
                    ShoppingListId = shoppingList.Id,
                    UserId = userId
                };
                _context.ListMembers.Add(listMember);
                await _context.SaveChangesAsync();

                // Skicka tillbaka info om skapad lista
                var shoppingListDto = new ShoppingListDto
                {
                    Id = shoppingList.Id,
                    Name = shoppingList.Name,
                    OwnerId = shoppingList.OwnerId,
                    CreatedAt = shoppingList.CreatedAt
                };

                return Ok(shoppingListDto);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        //  Uppdatera namn på en inköpslista (PUT: api/shoppinglist/1)
        [HttpPut("{listId}")]
        public async Task<IActionResult> UpdateShoppingListName(int listId, [FromBody] UpdateListNameDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Tillåt ägare och medlemmar att ändra namnet
            var shoppingList = await _context.ShoppingLists
                .Include(l => l.ListMembers)
                    .ThenInclude(lm => lm.User)
                .FirstOrDefaultAsync(l => l.Id == listId && (l.OwnerId == userId || l.ListMembers.Any(m => m.UserId == userId)));

            if (shoppingList == null)
                return Unauthorized("You do not have permission to update this list.");

            shoppingList.Name = dto.NewListName;
            await _context.SaveChangesAsync();

            // Bygg och returnera uppdaterad lista som DTO
            var shoppingListDto = new ShoppingListDto
            {
                Id = shoppingList.Id,
                Name = shoppingList.Name,
                OwnerId = shoppingList.OwnerId,
                CreatedAt = shoppingList.CreatedAt,
                ListMembers = shoppingList.ListMembers.Select(lm => new ListMemberDto
                {
                    UserId = lm.UserId,
                    Email = lm.User?.Email ?? ""
                }).ToList()
            };

            return Ok(shoppingListDto);
        }


        // Radera en inköpslista (och produkter)  (DELETE: api/shoppinglist/1)
        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteShoppingList(int listId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            // Hämta listan, endast ägaren får radera
            var shoppingList = await _context.ShoppingLists
                .FirstOrDefaultAsync(l => l.Id == listId && l.OwnerId == userId);

            if (shoppingList == null)
                return Unauthorized("You do not have permission to delete this list.");

            // Ta bort alla medlemmar och objekt i listan
            var listMembers = await _context.ListMembers
                .Where(m => m.ShoppingListId == listId)
                .ToListAsync();
            _context.ListMembers.RemoveRange(listMembers);

            var listItems = await _context.ShoppingListItems
                .Where(i => i.ShoppingListId == listId)
                .ToListAsync();
            _context.ShoppingListItems.RemoveRange(listItems);

            // Ta bort själva listan
            _context.ShoppingLists.Remove(shoppingList);
            await _context.SaveChangesAsync();

            return Ok("Shopping list deleted.");
        }

        // Bjud in användare till en lista via e-post (POST: api/shoppinglist/invite)
        [HttpPost("invite")]
        public async Task<IActionResult> InviteUserToList([FromBody] InviteUserDto dto, [FromQuery] int listId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return Unauthorized("User not found");

            var shoppingList = await _context.ShoppingLists.FindAsync(listId);
            if (shoppingList == null)
                return NotFound("Shopping list not found");

            // Endast ägare får bjuda in nya medlemmar
            if (shoppingList.OwnerId != userId)
                return Unauthorized("You do not have permission to invite users.");

            // Hämta användare utifrån e-post
            var email = dto.Email.Trim().ToLower();
            var invitedUser = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);
            if (invitedUser == null)
                return NotFound("User not found");

             // Kontrollera om användaren redan är medlem
            var existingMember = await _context.ListMembers
                .FirstOrDefaultAsync(m => m.ShoppingListId == listId && m.UserId == invitedUser.Id);

            if (existingMember != null)
                return BadRequest("User is already a member of the shopping list.");

            // Lägg till användaren som medlem
            var listMember = new ListMember
            {
                ShoppingListId = listId,
                UserId = invitedUser.Id
            };

            _context.ListMembers.Add(listMember);
            await _context.SaveChangesAsync();

            return Ok("User invited successfully");
        }
    }
}

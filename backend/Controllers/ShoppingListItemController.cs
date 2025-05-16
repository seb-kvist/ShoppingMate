using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ShoppingMate.Data;
using ShoppingMate.DTO.ShoppingList;
using ShoppingMate.Models;

namespace ShoppingMate.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/shoppinglist/{listId}/items")]
    public class ShoppingListItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShoppingListItemController(AppDbContext context)
        {
            _context = context;
        }

        // GEMENSAM accesskontroll för ägare och medlemmar
        private async Task<bool> UserHasAccessAsync(int listId, string userId)
        {
            var shoppingList = await _context.ShoppingLists
                .Include(l => l.ListMembers)
                .FirstOrDefaultAsync(l => l.Id == listId);

            if (shoppingList == null)
                return false;

            return shoppingList.OwnerId == userId ||
                   shoppingList.ListMembers.Any(m => m.UserId == userId);
        }

        // GET: api/shoppinglist/1/items
        [HttpGet]
        public async Task<IActionResult> GetItems(int listId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!await UserHasAccessAsync(listId, userId))
                return Unauthorized("You do not have access to this list.");

            var items = await _context.ShoppingListItems
                .Where(i => i.ShoppingListId == listId)
                .ToListAsync();

            var itemDtos = items.Select(i => new ShoppingListItemDto
            {
                Name = i.Name,
                Quantity = i.Quantity,
                IsBought = i.IsBought
            }).ToList();

            return Ok(itemDtos);
        }

        // POST: api/shoppinglist/1/items
        [HttpPost]
        public async Task<IActionResult> AddItem(int listId, [FromBody] ShoppingListItemDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!await UserHasAccessAsync(listId, userId))
                return Unauthorized("You do not have access to this list.");

            var item = new ShoppingListItem
            {
                Name = dto.Name,
                Quantity = dto.Quantity,
                IsBought = false,
                ShoppingListId = listId
            };

            _context.ShoppingListItems.Add(item);
            await _context.SaveChangesAsync();

            var responseDto = new ShoppingListItemDto
            {
                Name = item.Name,
                Quantity = item.Quantity,
                IsBought = item.IsBought
            };

            return Ok(responseDto);
        }

        // PUT: api/shoppinglist/1/items/5
        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateItem(int listId, int itemId, [FromBody] ShoppingListItemDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!await UserHasAccessAsync(listId, userId))
                return Unauthorized("You do not have access to this list.");

            var item = await _context.ShoppingListItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ShoppingListId == listId);
            if (item == null)
                return NotFound("Item not found.");

            item.Name = dto.Name;
            item.Quantity = dto.Quantity;
            item.IsBought = dto.IsBought;

            await _context.SaveChangesAsync();

            var responseDto = new ShoppingListItemDto
            {
                Name = item.Name,
                Quantity = item.Quantity,
                IsBought = item.IsBought
            };

            return Ok(responseDto);
        }

        // DELETE: api/shoppinglist/1/items/5
        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(int listId, int itemId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!await UserHasAccessAsync(listId, userId))
                return Unauthorized("You do not have access to this list.");

            var item = await _context.ShoppingListItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ShoppingListId == listId);
            if (item == null)
                return NotFound("Item not found.");

            _context.ShoppingListItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item deleted.");
        }
    }
}

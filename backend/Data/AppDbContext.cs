using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShoppingMate.Models;

namespace ShoppingMate.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) {}

        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; } = null!;
        public DbSet<ListMember> ListMembers { get; set; }

        // Add this method to configure entity relationships and define primary keys
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure primary key for ListMember
            modelBuilder.Entity<ListMember>()
                .HasKey(lm => lm.Id);  // Set 'Id' as the primary key for ListMember
            
        }

        public static async Task Initialize(UserManager<ApplicationUser> userManager, AppDbContext context)
        {
            // Skapa mockanvändare om de inte finns
            var mockUser = await userManager.FindByEmailAsync("mockuser@example.com");
            if (mockUser == null)
            {
                var newUser = new ApplicationUser
                {
                    UserName = "mockuser@example.com",
                    Email = "mockuser@example.com",
                    FirstName = "Mock",
                    LastName = "User"
                };

                var result = await userManager.CreateAsync(newUser, "Password123!");
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine(error.Description);
                    }
                }
            }

            // Lägg till mer mockdata här om du har t.ex. ShoppingLists eller andra entiteter
            // Exempel:
            // if (!context.ShoppingLists.Any())
            // {
            //     context.ShoppingLists.Add(new ShoppingList { Name = "Sample List", CreatedAt = DateTime.Now });
            //     await context.SaveChangesAsync();
            // }
        }
    }
}

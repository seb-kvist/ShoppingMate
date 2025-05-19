using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShoppingMate.Models;

namespace ShoppingMate.Data
{       
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        // DbSets – aka tabellerna i databasen
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; } = null!;
        public DbSet<ListMember> ListMembers { get; set; }

        // relation mellan entiteter och nycklar
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             // Sätt primärnyckel för ListMember på 'Id'
            modelBuilder.Entity<ListMember>()
                .HasKey(lm => lm.Id);

        }

        // Metod för att skapa mockdata/användare i databasen vid uppstart (kan anropas från Program.cs eller Startup.cs)
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
        }
    }
}

using Microsoft.AspNetCore.Identity;

namespace ShoppingMate.Models {
    public class ApplicationUser : IdentityUser
    { 
        public string FirstName { get; set; } ="";
        public string LastName { get; set; } ="";
    }
}
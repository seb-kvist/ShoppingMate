using System;
using System.ComponentModel.DataAnnotations;

namespace ShoppingMate.Models;

public class ListMember
{

    [Key]
    public int Id { get; set; }  // Add this Id property as the primary key

    // Relaterar till shoppinglistan
    public int ShoppingListId { get; set; }  
    public ShoppingList ShoppingList { get; set; }

    // Relaterar till användaren
    public string UserId { get; set; } 
    public ApplicationUser User { get; set; }
}

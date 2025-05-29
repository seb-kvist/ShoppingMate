using System;

namespace ShoppingMate.Models;

public class ShoppingListItem
{
     public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsBought { get; set; }
    public int ShoppingListId { get; set; }

    public int Quantity { get; set; }

    // Navigation
    public ShoppingList? ShoppingList { get; set; }
}

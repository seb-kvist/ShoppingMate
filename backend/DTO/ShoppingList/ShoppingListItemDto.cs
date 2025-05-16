using System;
using System.ComponentModel.DataAnnotations;

namespace ShoppingMate.DTO.ShoppingList;

public class ShoppingListItemDto
{
    [Required(ErrorMessage = "Item name is required")]
    public string Name { get; set; } 
    
    [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100")]
    public int Quantity { get; set; }
    
    public bool IsBought { get; set; }
}
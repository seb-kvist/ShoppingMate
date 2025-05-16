using System;

namespace ShoppingMate.DTO.ShoppingList;

public class ShoppingListDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string OwnerId { get; set; }
    public DateTime CreatedAt { get; set; }
   // public List<ShoppingListItemDto> Items { get; set; } = new List<ShoppingListItemDto>();
}

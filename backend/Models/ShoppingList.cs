namespace ShoppingMate.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set;}

        public ApplicationUser Owner { get; set;} // Referens till ägaren (ApplicationUser)
        public List<ShoppingListItem> Items { get; set; } // Objekt i listan
        public DateTime CreatedAt { get; set; }

        public List<ListMember> ListMembers { get; set; }  // Ny lista för medlemmar
    }
}

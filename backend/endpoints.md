# I Filen ApiTest.http kan du testa alla nedanstående endpoints. Här är en förklaring vad varje är till för.

## AUTH CONTROLLER

(1) Registrera ny användare

POST http://localhost:5096/api/auth/register
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "Anna",
  "lastName": "Andersson"
}

Använder en RegisterDto med e-post, lösenord, förnamn och efternamn. Returnerar 200 OK vid lyckad registrering.

(2) Logga in och få JWT-token
POST http://localhost:5096/api/auth/login

{
  "email": "user@example.com",
  "password": "Password123!"
}

Returnerar ett JSON-objekt med token om inloggningen lyckas. Token används sedan i Authorization-header för skyddade endpoints.

(3) Hämta aktuell användare
GET http://localhost:5096/api/auth/user
Header: Authorization: Bearer {jwt-token}

Returnerar information om den inloggade användaren, som e-post, förnamn och efternamn.

##SHOPPINGLIST CONTROLLER

(4) Hämta alla inköpslistor för en användare
GET http://localhost:5096/api/shoppinglist
Header: Authorization: Bearer {jwt-token}
[
  {
    "id": 1,
    "name": "Matinköp",
    "ownerId": "userid123",
    "createdAt": "2024-05-17T08:52:25.130Z",
    "listMembers": [
      { "userId": "userid123", "email": "user@example.com" }
    ]
  }
]

Returnerar en lista av ShoppingListDto, där användaren är ägare eller medlem.

(5) Skapa en ny inköpslista
POST http://localhost:5096/api/shoppinglist
Header: Authorization: Bearer {jwt-token}

{ "name": "Veckohandel" }

Returnerar skapad lista som ShoppingListDto. Ägaren läggs automatiskt till som medlem.

(6) Uppdatera namn på inköpslista
PUT http://localhost:5096/api/shoppinglist/{listId}
Header: Authorization: Bearer {jwt-token}

{ "newListName": "Ny lista" }

Returnerar den uppdaterade listan.

(7) Ta bort en inköpslista
DELETE http://localhost:5096/api/shoppinglist/{listId}
Header: Authorization: Bearer {jwt-token}

Tar bort listan, dess medlemmar och produkter.

(8) Bjud in användare till inköpslista
POST http://localhost:5096/api/shoppinglist/invite?listId={id}
Header: Authorization: Bearer {jwt-token}

{ "email": "friend@example.com" }

Endast listägare kan bjuda in. Om användaren redan är medlem returneras fel.

## SHOPPINGLIST ITEM CONTROLLER

(9) Hämta alla produkter i en inköpslista
GET http://localhost:5096/api/shoppinglist/{listId}/items
Header: Authorization: Bearer {jwt-token}

Returnerar en lista av ShoppingListItemDto för angiven lista.

(10) Lägg till produkt i inköpslista
POST http://localhost:5096/api/shoppinglist/{listId}/items
Header: Authorization: Bearer {jwt-token}

{
  "name": "Oboy",
  "quantity": 2
}

Returnerar skapad produkt.

(11) Uppdatera produkt i inköpslista
PUT http://localhost:5096/api/shoppinglist/{listId}/items/{itemId}
Header: Authorization: Bearer {jwt-token}

{
  "name": "Oboy",
  "quantity": 3,
  "isBought": true
}

Returnerar uppdaterad produkt.

(12) Ta bort produkt från inköpslista
DELETE http://localhost:5096/api/shoppinglist/{listId}/items/{itemId}
Header: Authorization: Bearer {jwt-token}

Tar bort produkten.

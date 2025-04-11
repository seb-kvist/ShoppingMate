import React, { useState } from 'react';

// Komponent för att skapa en ny inköpslista
function CreateShoppingList({ onCreateList }) { //State för att spara namn email och felmeddelanden
  const [listName, setListName] = useState('');
  const [emails, setEmails] = useState('');


  //Funktion för när man submittar formuläret
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gör om eposten till en array separerat med ","
    const emailArray = emails.split(',').map(email => email.trim());

    // Skapa en ny lista
    const newList = {
      id: Date.now(),  // Skapar ett unikt id baserat på när det läggs in
      name: listName,
      emails: emailArray,
    };

    // Skicka den nya listan till MainBody
    onCreateList(newList);

    // Återställer formuläret
    setListName('');
    setEmails('');
  };

  return (
    <div className="create-shopping-list-view">
      <h2>Skapa en ny shoppinglista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Listnamn</label>
          <input 
            type="text" 
            value={listName} 
            onChange={(e) => setListName(e.target.value)} 
            placeholder="Exempel: Arbetsplatsen" 
            required
          />
        </div>

        <div>
          <label>Bjud in användare via e-post (separera med kommatecken)</label>
          <input 
            type="email" 
            value={emails} 
            onChange={(e) => setEmails(e.target.value)} 
            placeholder="email1@exempel.com, email2@exempel.com"
          />
        </div>
        <button type="submit">Skapa lista</button> 

      </form>
    </div>
  );
}

export default CreateShoppingList;

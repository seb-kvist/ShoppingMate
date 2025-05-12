import React, { useState } from 'react';

function ShoppingListOverview({ lists, onSelectList, onNavigate, onUpdateLists }) {

  //Funktion som väljer en lista och dess vy
  const handleSelectList = (listId) => {
    onSelectList(listId); // skickar id:et till föräldern för listan
    onNavigate('selectedShoppingList'); 
  };

  //Funktion som tar borty lista
  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);  // Skapar en ny "lista" med alla listor utom den som ska tas bort
    onUpdateLists(updatedLists); // Uppdaterar listorna i föräldern 
  };


  //Redigera namn på lista
  const handleEditListName = (listId, newName) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, name: newName } : list
    );
    onUpdateLists(updatedLists);
  };

  return (
    <div className="shopping-list-view">
      <h2>Dina listor</h2>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <div className="list-item">
              <button className="list-name-button" onClick={() => handleSelectList(list.id)}>
                {list.name}
              </button>
              {/* Visa de inbjudna e-postadresserna om det finns några */}
              {list.emails && list.emails.length > 0 && (
                <div className="invited-users">
                  <strong>Inbjudna användare:</strong>
                  <ul>
                    {list.emails.map((email, index) => (
                      <li key={index} className="email-item">{email}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Om inga användare är inbjudna, visa en text */}
              {list.emails && list.emails.length === 0 && <p className="no-users">Inga inbjudna användare än.</p>}

              <div className="list-actions">
                <button className="delete-button" onClick={() => handleDeleteList(list.id)}>Ta bort</button>
                <button className="edit-button" onClick={() => {
                  // Prompt för att redigera listans namn
                  const newName = prompt("Skriv ett nytt namn för listan:", list.name);
                  if (newName && newName !== list.name) {
                    handleEditListName(list.id, newName); // Uppdaterar listans namn om det är ändrat
                  }
                }}>Redigera namn</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Knapp för att skapa en ny lista */}
      <button onClick={() => onNavigate('createShoppingList')}>Skapa ny lista</button>
    </div>
  );
}

export default ShoppingListOverview;

import React, { useState, useEffect } from 'react'; 

// Komponent som visar den valda inköpslistan
function SelectedShoppingList({ list, changeView }) {
  const [items, setItems] = useState([]);  // Produkter som hör till listan
  const [newItem, setNewItem] = useState('');  // Nytt produktnamn som användaren skriver in
  const [editingId, setEditingId] = useState(null); // Om man redigerar en produkt – ID på den som redigeras
  const [editingText, setEditingText] = useState(''); // Texten som skrivs in vid redigering

  const storageKey = `items_${list?.id}`; // Skapar en nyckel för localStorage baserat på listans ID
  
  // När komponenten hämtas så laddar vi in sparade produkter om de finns i localstorage.
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setItems(JSON.parse(saved));
  }, [storageKey]);

  // Uppdaterar både state och localStorage
  const updateStorage = (newItems) => {
    setItems(newItems);
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  };

  // Funktion som lägger till en ny produkt
  const addItem = () => {
    if (!newItem.trim()) return;
    const newList = [...items, { id: Date.now(), name: newItem, purchased: false }];
    updateStorage(newList);
    setNewItem('');
  };

  // Togglefunktionen mellan "köpt" och "ej köpt"
  const toggleItem = (id) => {
    const newList = items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    updateStorage(newList);
  };

  // Ta bort ett objekt från listan
  const deleteItem = (id) => {
    const newList = items.filter(item => item.id !== id);
    updateStorage(newList);
  };

  // Spara ändringar vid redigering
  const saveEdit = (id) => {
    const newList = items.map(item =>
      item.id === id ? { ...item, name: editingText } : item
    );
    updateStorage(newList);
    setEditingId(null);
    setEditingText('');
  };

  // Om ingen lista är vald så visar vi nedan <p>
  if (!list) return <p>Ingen lista vald.</p>;

  return (
    <div className="selected-shopping-list-view">

      <h1>{"Lista: " + list.name}</h1>

      <h3>Denna lista delar du med:</h3>
      <ul>
        {list.emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>

      <ul>
        {items.map(item => (
          <li key={item.id} className="product-item">
            <input
              type="checkbox"
              checked={item.purchased}
              onChange={() => toggleItem(item.id)}
              className="purchase-checkbox"
            />
            {editingId === item.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(item.id)} className="save-btn">Spara</button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">Avbryt</button>
              </>
            ) : (
              <>
                <span className={`item-name ${item.purchased ? 'purchased' : ''}`}>
                  {item.name}
                </span>
                <button onClick={() => { setEditingId(item.id); setEditingText(item.name); }} className="edit-btn">Redigera</button>
                <button onClick={() => deleteItem(item.id)} className="delete-btn">Ta bort</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Lägg till produkt"
        className="new-item-input"
      />
      <button onClick={addItem} className="add-item-btn">Lägg till</button>
      <button onClick={() => changeView('shoppingListOverview')} className="back-btn">Tillbaka</button>
    </div>
  );
}

export default SelectedShoppingList;

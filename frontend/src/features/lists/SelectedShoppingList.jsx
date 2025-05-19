import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL, authHeaders } from '../../api';

/**
 * Visar och hanterar en vald inköpslista och dess produkter.
 * Det går även bjuda in medlemmar här med .
 * Props: refreshLists: callback för att uppdatera huvudlistan i MainBody efter t.ex. inbjudan
 */
function SelectedShoppingList({ refreshLists }) {
  const { id } = useParams();         // ID från url-parametern
  const navigate = useNavigate();

  // State för listan, produkter och olika UI/feedback
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingQuantity, setEditingQuantity] = useState(1);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hämta själva listan när komponenten laddas eller byter id
  useEffect(() => {
    fetch(`${API_URL}/shoppinglist`, { headers: authHeaders() })
      .then(res => res.json())
      .then(data => {
        const found = data.find(l => l.id === parseInt(id));
        setList(found);
      });
  }, [id]);

  // Hämta alla produkter (items) för denna lista
  useEffect(() => {
    fetch(`${API_URL}/shoppinglist/${id}/items`, { headers: authHeaders() })
      .then(res => res.json())
      .then(data => setItems(data))
      .finally(() => setLoading(false));
  }, [id]);

  // Lägg till en ny produkt
  const addItem = async () => {
    if (!newItem.trim()) return;
    const body = {
      name: newItem,
      quantity: parseInt(newQuantity, 10),
      isBought: false,
    };
    const res = await fetch(`${API_URL}/shoppinglist/${id}/items`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const added = await res.json();
      setItems([...items, added]);
      setNewItem('');
      setNewQuantity(1);
    } else {
      alert('Kunde inte lägga till produkt.');
    }
  };

  // Markera produkt som köpt/ej köpt
  const toggleItem = async (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const body = {
      name: item.name,
      quantity: item.quantity,
      isBought: !item.isBought,
    };
    const res = await fetch(`${API_URL}/shoppinglist/${id}/items/${item.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map(it => it.id === itemId ? updated : it));
    } else {
      alert('Kunde inte uppdatera produkt.');
    }
  };

  // Ta bort produkt
  const deleteItem = async (itemId) => {
    const res = await fetch(`${API_URL}/shoppinglist/${id}/items/${itemId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      setItems(items.filter(item => item.id !== itemId));
    } else {
      alert('Kunde inte ta bort produkt.');
    }
  };

  // Spara ändringar när man redigerar en produkt
  const saveEdit = async (item) => {
    const body = {
      name: editingText,
      quantity: parseInt(editingQuantity, 10),
      isBought: item.isBought,
    };
    const res = await fetch(`${API_URL}/shoppinglist/${id}/items/${item.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      const newItems = items.map(it => it.id === item.id ? updated : it);
      setItems(newItems);
      setEditingId(null);
      setEditingText('');
    } else {
      alert('Kunde inte spara ändring.');
    }
  };

  // Bjud in medlem (invite-system)
  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviteMsg('');
    const res = await fetch(`${API_URL}/shoppinglist/invite?listId=${id}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email: inviteEmail }),
    });
    if (res.ok) {
      setInviteMsg('Användare inbjuden!');
      setInviteEmail('');
      // Hämta om listan från backend så medlemmar uppdateras direkt
      fetch(`${API_URL}/shoppinglist`, { headers: authHeaders() })
        .then(res => res.json())
        .then(data => {
          const found = data.find(l => l.id === parseInt(id));
          setList(found);
          // Uppdatera huvudlistan i overview/översikt
          if (typeof refreshLists === "function") refreshLists();
        });
    } else {
      const err = await res.text();
      setInviteMsg('Kunde inte bjuda in: ' + err);
    }
  };

  // Visa laddar/ej hittad text om det behövs
  if (loading) return <p className="selected-shopping-list-loading">Laddar lista...</p>;
  if (!list) return <p className="selected-shopping-list-error">Listan kunde inte hittas.</p>;

  return (
    <div className="selected-shopping-list-root">
      {/* Rubrik, bjud in och medlemmar */}
      <div className="list-header-row selected-shopping-list-header">
        <h1 className="list-title">{list.name}</h1>
        {/* Öppna invite-systemet (bjud in användare) */}
        <button className="invite-toggle-btn" onClick={() => setShowInvite(true)}>
          Bjud in till lista
        </button>
      </div>
      {/* Visa medlemmar i listan */}
      <div className="member-container">
        <div className="shared-with-label">Delad med:</div>
        <ul className="member-list">
          {list.listMembers && list.listMembers.length > 0
            ? list.listMembers.map((member, idx) => (
              <li key={idx}>{member.email}</li>
            ))
            : <li>Inga medlemmar ännu.</li>
          }
        </ul>
      </div>

      {/* SYSTEM FÖR BJUD IN */}
      {showInvite && (
        <div className="invite-system-bg" onClick={() => setShowInvite(false)}>
          <div className="invite-system" onClick={e => e.stopPropagation()}>
            <h2>Bjud in användare till listan</h2>
            <input
              type="email"
              className="invite-system-input"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="Användarens e-post"
            />
            <div className="invite-system-btn-row">
              <button onClick={handleInvite} className="invite-system-invite-btn">Bjud in</button>
              <button onClick={() => setShowInvite(false)} className="invite-system-close-btn">Stäng</button>
            </div>
            {/* Feedback-meddelande efter inbjudan */}
            {inviteMsg && <div className="invite-msg">{inviteMsg}</div>}
          </div>
        </div>
      )}

      {/* Lista alla produkter */}
      <div className="product-card">
        <h2>Produkter</h2>
        {items.map(item =>
          editingId === item.id ? (
            // Redigeringsläge för produkt
            <div className="product-row" key={item.id}>
              <input
                type="checkbox"
                checked={item.isBought}
                onChange={() => toggleItem(item.id)}
              />
              <input
                type="text"
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
              />
              <input
                type="number"
                min="1"
                value={editingQuantity}
                onChange={e => setEditingQuantity(e.target.value)}
              />
              <button className="save-btn" onClick={() => saveEdit(item)}>Spara</button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>Avbryt</button>
            </div>
          ) : (
            // Visningsläge för produkt
            <div
              className={`product-row${item.isBought ? " purchased" : ""}`}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.isBought}
                onChange={() => toggleItem(item.id)}
                title="Markera som köpt"
              />
              <span className="item-name">{item.name}</span>
              <span className="antals-text">(Antal: {item.quantity})</span>
              <button className="edit-btn" onClick={() => {
                setEditingId(item.id);
                setEditingText(item.name);
                setEditingQuantity(item.quantity);
              }}>Redigera</button>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>Ta bort</button>
            </div>
          )
        )}

        {/* Lägg till produkt-rad */}
        <div className="add-product-row">
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Lägg till produkt"
          />
          <input
            type="number"
            min="1"
            value={newQuantity}
            onChange={e => setNewQuantity(e.target.value)}
          />
          <button onClick={addItem} className="add-item-btn">Lägg till</button>
        </div>
      </div>

      {/* Tillbaka-knapp till översikten */}
      <button onClick={() => navigate('/lists')} className="back-btn selected-shopping-list-back-btn">
        Tillbaka
      </button>
    </div>
  );
}

export default SelectedShoppingList;

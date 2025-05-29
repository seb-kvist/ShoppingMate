import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralAlert from '../../components/GeneralAlert';
import ProductRow from './ProductRow';
import InviteSystem from './InviteSystem';
import { fetchShoppingLists, fetchListItems, addItemToList, updateItemInList, deleteItemInList, inviteUserToList } from '../../api/FetchCalls';

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
  const [error, setError] = useState('');

  // Hämta själva listan när komponenten laddas eller byter id
  useEffect(() => {
    setLoading(true);
    fetchShoppingLists()
      .then(data => {
        const found = data.find(l => l.id === parseInt(id));
        setList(found);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Hämta alla produkter (items) för denna lista
  useEffect(() => {
    setLoading(true);
    fetchListItems(id)
      .then(setItems)
      .catch(e => setError(e.message))
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
    try {
      const added = await addItemToList(id, body);
      setItems([...items, added]);
      setNewItem('');
      setNewQuantity(1);
    } catch (e) {
      setError('Kunde inte lägga till produkt.');
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
    try {
      const updated = await updateItemInList(id, item.id, body);
      setItems(items.map(it => it.id === itemId ? updated : it));
    } catch (e) {
      setError('Kunde inte uppdatera produkt.');
    }
  };

  // Ta bort produkt
  const deleteItem = async (itemId) => {
    try {
      await deleteItemInList(id, itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (e) {
      setError('Kunde inte ta bort produkt.');
    }
  };

  // Spara ändringar när man redigerar en produkt
  const saveEdit = async (item) => {
    const body = {
      name: editingText,
      quantity: parseInt(editingQuantity, 10),
      isBought: item.isBought,
    };
    try {
      const updated = await updateItemInList(id, item.id, body);
      const newItems = items.map(it => it.id === item.id ? updated : it);
      setItems(newItems);
      setEditingId(null);
      setEditingText('');
    } catch (e) {
      setError('Kunde inte spara ändring.');
    }
  };

  // Bjud in medlem (invite-system)
  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviteMsg('');
    try {
      await inviteUserToList(id, inviteEmail);
      setInviteMsg('Användare inbjuden!');
      setInviteEmail('');
      // Hämta om listan från backend så medlemmar uppdateras direkt
      const data = await fetchShoppingLists();
      const found = data.find(l => l.id === parseInt(id));
      setList(found);
      if (typeof refreshLists === "function") refreshLists();
    } catch (e) {
      setInviteMsg('Kunde inte bjuda in: ' + e.message);
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
      <InviteSystem
        show={showInvite}
        onClose={() => setShowInvite(false)}
        inviteEmail={inviteEmail}
        onEmailChange={setInviteEmail}
        onInvite={handleInvite}
        inviteMsg={inviteMsg}
      />


      {/* Lista alla produkter */}
      <div className="product-card">
        <h2>Produkter</h2>
        {items.map(item => (
          <ProductRow
            key={item.id}
            item={item}
            isEditing={editingId === item.id}
            editingText={editingText}
            editingQuantity={editingQuantity}
            onToggle={toggleItem}
            onEdit={(item) => {
              setEditingId(item.id);
              setEditingText(item.name);
              setEditingQuantity(item.quantity);
            }}
            onDelete={deleteItem}
            onChangeEditText={setEditingText}
            onChangeEditQuantity={setEditingQuantity}
            onSaveEdit={saveEdit}
            onCancelEdit={() => setEditingId(null)}
          />
        ))}

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

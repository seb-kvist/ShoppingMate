import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, authHeaders } from '../../api';

/**
 * Visar alla inköpslistor i översikten och hanterar val, redigering och borttagning.
 * Props:
 * - lists: array med alla inköpslistor
 * - onSelectList: funktion för att välja en lista
 * - onNavigate: funktion för navigation (inte alltid nödvändig om du använder navigate direkt)
 * - onUpdateLists: funktion för att uppdatera hela list-arrayen (t.ex. vid borttagning)
 */
function ShoppingListOverview({ lists, onSelectList, onNavigate, onUpdateLists }) {
  const navigate = useNavigate();

  // Välj en lista och visa dess detaljvy
  const handleSelectList = (listId) => {
    onSelectList(listId);
    navigate(`/lists/${listId}`);
  };

  // Ta bort en lista (via backend) och uppdatera arrayen i state
  const handleDeleteList = async (listId, e) => {
    e.stopPropagation();
    const res = await fetch(`${API_URL}/shoppinglist/${listId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      const updatedLists = lists.filter(list => list.id !== listId);
      onUpdateLists(updatedLists);
    } else {
      alert("Kunde inte ta bort listan.");
    }
  };

  // Ändra namn på en lista (via backend)
  const handleEditListName = async (listId, newName, e) => {
    e.stopPropagation();
    const res = await fetch(`${API_URL}/shoppinglist/${listId}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ newListName: newName })
    });
    if (res.ok) {
      const updated = await res.json();
      const updatedLists = lists.map(list => list.id === listId ? updated : list);
      onUpdateLists(updatedLists);
    } else {
      alert("Kunde inte uppdatera namn på lista.");
    }
  };

  return (
    <div className="shopping-list-view">
      {/* Rubrik */}
        <h2 className="shopping-list-view-title">Dina listor</h2>
      {/* Lista med alla inköpslistor */}
      <div className="shopping-list-cards">
        {lists.map((list) => (
          <div
            className="list-card"
            key={list.id}
            onClick={() => handleSelectList(list.id)}
            tabIndex={0}
            role="button"
            onKeyPress={e => {
              if (e.key === "Enter" || e.key === " ") handleSelectList(list.id);
            }}
          >
            {/* Listans namn */}
            <div className="list-card-title-row">
              <div className="list-card-title">
                {list.name}
              </div>
            </div>
            {/* Visa alla medlemmar i listan (om några) */}
            {list.listMembers && list.listMembers.length > 0 ? (
              <div className="member-tag-list">
                {list.listMembers.map((member, idx) => (
                  <div key={idx} className="member-tag">
                    <span className="member-email">{member.email}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-members">Inga medlemmar än.</div>
            )}

            {/* Redigera eller ta bort lista */}
            <div className="list-actions-row">
              <button
                className="delete-button"
                onClick={e => handleDeleteList(list.id, e)}
                tabIndex={-1}
              >
                Ta bort
              </button>
              <button
                className="edit-button"
                onClick={e => {
                  e.stopPropagation();
                  const newName = prompt("Skriv ett nytt namn för listan:", list.name);
                  if (newName && newName !== list.name) {
                    handleEditListName(list.id, newName, e);
                  }
                }}
                tabIndex={-1}
              >
                Redigera namn
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Skapa ny lista-knapp */}
      <button className="create-list-btn" onClick={() => navigate('/lists/create')}>Skapa ny lista</button>
    </div>
  );
}

export default ShoppingListOverview;

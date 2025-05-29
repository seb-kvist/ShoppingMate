import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListCard from './ListCard';
import ListMember from './ListMember';
import { deleteShoppingList, updateShoppingListName } from '../../api/FetchCalls';
import { useUser } from '../../context/UserContext';


/**
 * Visar alla inköpslistor i översikten och hanterar val, redigering och borttagning.
 * Props:
 * - lists: array med alla inköpslistor
 * - onSelectList: funktion för att välja en lista
 * - onUpdateLists: funktion för att uppdatera hela list-arrayen (t.ex. vid borttagning)
 */
function ShoppingListOverview({ lists, onSelectList, onUpdateLists }) {
  const navigate = useNavigate();
  const { user } = useUser();

  // Välj en lista och visa dess detaljvy
  const handleSelectList = (listId) => {
    onSelectList(listId);
    navigate(`/lists/${listId}`);
  };

  // Ta bort en lista
  const handleDeleteList = async (listId) => {
    try {
      await deleteShoppingList(listId); 
      const updatedLists = lists.filter(list => list.id !== listId);
      onUpdateLists(updatedLists);
    } catch (e) {
      alert("Kunde inte ta bort listan: " + e.message);
    }
  };

  // Ändra namn på en lista
  const handleEditListName = async (listId, newName) => {
    try {
      const updated = await updateShoppingListName(listId, newName);
      const updatedLists = lists.map(list => list.id === listId ? updated : list);
      onUpdateLists(updatedLists);
    } catch (e) {
      alert("Kunde inte uppdatera namn på lista: " + e.message);
    }
  };

  return (
    <div className="shopping-list-view">
      <h2 className="shopping-list-view-title">Dina listor</h2>
      <div className="shopping-list-cards">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            user={user}
            onSelect={handleSelectList}
            onDelete={(id) => handleDeleteList(id)}
            onEdit={(id) => {
              const newName = prompt("Skriv ett nytt namn för listan:", list.name);
              if (newName && newName !== list.name) {
                handleEditListName(id, newName);
              }
            }}
          >
            {list.listMembers && list.listMembers.length > 0 ? (
              <div className="member-tag-list">
                {list.listMembers.map((member, idx) => (
                  <ListMember key={idx} email={member.email} />
                ))}
              </div>
            ) : (
              <div className="no-members">Inga medlemmar än.</div>
            )}
          </ListCard>
        ))}
      </div>
      <button className="create-list-btn" onClick={() => navigate('/lists/create')}>
        Skapa ny lista
      </button>
    </div>
  );
}

export default ShoppingListOverview;

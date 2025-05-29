import React from 'react';
import PropTypes from 'prop-types';

/**
 * ListCard – Presenterar en inköpslista i kortformat med valbara actions.
 *
 * Props:
 * - list: objektet för listan som ska visas
 * - user: inloggad användare (för ägarkoll)
 * - onSelect: funktion, anropas vid klick på kortet
 * - onDelete: funktion, anropas vid klick på "Ta bort" (endast ägare ser knappen)
 * - onEdit: funktion, anropas vid klick på "Redigera namn"
 * - children: eventuella barnkomponenter
 */

function ListCard({ list, user, onSelect, onDelete, onEdit, children }) {
  // Kontrollera om nuvarande användare är ägare av listan
  const isOwner = user && list.ownerId === user.id;
  return (
    
    <div className="list-card" onClick={() => onSelect(list.id)} tabIndex={0} role="button">
      <div className="list-card-title-row">
        <div className="list-card-title">{list.name}</div>
      </div>
      {children}
      <div className="list-actions-row">
        {/* "Ta bort" endast för ägaren */}
        {isOwner && (
          <button
            className="delete-button"
            onClick={e => { e.stopPropagation(); onDelete(list.id); }}
          >
            Ta bort
          </button>
        )}

        {/* "Redigera namn" alltid synlig */}
        <button
          className="edit-button"
          onClick={e => { e.stopPropagation(); onEdit(list.id); }}
        >
          Redigera namn
        </button>

      </div>
    </div>
  );
}
 //Proptypes för att definiera vilka typer av props komponenten förväntar sig
ListCard.propTypes = {
  list: PropTypes.object.isRequired,
  user: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ListCard;

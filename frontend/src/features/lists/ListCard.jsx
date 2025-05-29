import React from 'react';
import PropTypes from 'prop-types';

function ListCard({ list, user, onSelect, onDelete, onEdit, children }) {
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

ListCard.propTypes = {
  list: PropTypes.object.isRequired,
  user: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ListCard;

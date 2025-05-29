import React from 'react';
import PropTypes from 'prop-types';

function ProductRow({
  item,
  isEditing,
  editingText,
  editingQuantity,
  onToggle,
  onEdit,
  onDelete,
  onChangeEditText,
  onChangeEditQuantity,
  onSaveEdit,
  onCancelEdit
}) {
  if (isEditing) {
    // Redigeringsläge
    return (
      <div className="product-row">
        <input
          type="checkbox"
          checked={item.isBought}
          onChange={() => onToggle(item.id)}
        />
        <input
          type="text"
          value={editingText}
          onChange={e => onChangeEditText(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={editingQuantity}
          onChange={e => onChangeEditQuantity(e.target.value)}
        />
        <button className="save-btn" onClick={() => onSaveEdit(item)}>Spara</button>
        <button className="cancel-btn" onClick={onCancelEdit}>Avbryt</button>
      </div>
    );
  }

  // Visningsläge
  return (
    <div className={`product-row${item.isBought ? " purchased" : ""}`}>
      <input
        type="checkbox"
        checked={item.isBought}
        onChange={() => onToggle(item.id)}
        title="Markera som köpt"
      />
      <span className="item-name">{item.name}</span>
      <span className="antals-text">(Antal: {item.quantity})</span>
      <button className="edit-btn" onClick={() => onEdit(item)}>Redigera</button>
      <button className="delete-btn" onClick={() => onDelete(item.id)}>Ta bort</button>
    </div>
  );
}

ProductRow.propTypes = {
  item: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  editingText: PropTypes.string,
  editingQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeEditText: PropTypes.func,
  onChangeEditQuantity: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onCancelEdit: PropTypes.func
};

export default ProductRow;
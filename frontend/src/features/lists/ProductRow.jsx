import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProductRow – Visar en rad för en produkt i inköpslistan, samt hanterar redigering och borttagning.
 *
 * Props:
 * - item: produkt-objektet (name, quantity, isBought, id)
 * - isEditing: true om raden är i redigeringsläge
 * - editingText: nuvarande text i namn-fältet vid redigering
 * - editingQuantity: nuvarande antal vid redigering
 * - onToggle: funktion som togglar "köpt"/ej köpt
 * - onEdit: funktion som går in i redigeringsläge för produkten
 * - onDelete: funktion som tar bort produkten
 * - onChangeEditText: funktion som uppdaterar text i namn-fältet vid redigering
 * - onChangeEditQuantity: funktion som uppdaterar antal vid redigering
 * - onSaveEdit: funktion som sparar ändringar (skickas produkten)
 * - onCancelEdit: funktion som avbryter redigering
 */

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
    // Om raden är i redigeringsläge visas inputfält och "Spara/Avbryt"
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

  // Annars visas produktens namn, antal och knappar för "Redigera" och "Ta bort"
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

// Prop-types: krav och typer för varje prop
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
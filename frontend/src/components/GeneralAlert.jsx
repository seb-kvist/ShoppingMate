import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GeneralAlert.css'; 

/**
 * GeneralAlert är en återanvändningsbar komponent för feedback/meddelanden.
 * Kan användas för att visa info, fel, succé eller varningar.
 *
 * Props:
 * - message (string) – Texten som visas.
 * - type (string) – Typ av meddelande: "success", "error", "info", "warning"
 * - onClose (funktion, valfri) – Om du vill visa en stäng-knapp.
 */
function GeneralAlert({ message, type, onClose }) {
  return (
    <div className={`general-alert general-alert--${type}`}>
      <span className="general-alert-message">{message}</span>
      {onClose && (
        <button className="general-alert-close-btn" onClick={onClose} aria-label="Stäng">
          &times;
        </button>
      )}
    </div>
  );
}

GeneralAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onClose: PropTypes.func,
};

GeneralAlert.defaultProps = {
  type: 'info',
  onClose: null,
};

export default GeneralAlert;

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/GeneralAlert.css'; 

/**
 * GeneralAlert är en återanvändningsbar komponent för feedback/meddelanden.
 * Används för att visa info, fel, succé eller varningar.
 *
 * Props:
 * - message (string) – Texten som visas.
 * - type (string) – Typ av meddelande: "success", "error", "info", "warning" och dess färg.
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

// Typkontroll för props
GeneralAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onClose: PropTypes.func,
};

// Defaultvärden för props – visas om ingen prop skickas in
GeneralAlert.defaultProps = {
  type: 'info',
  onClose: null,
};

export default GeneralAlert;

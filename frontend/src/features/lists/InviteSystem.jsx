import React from 'react';
import PropTypes from 'prop-types';

/**
 * InviteSystem – Modal/popup för att bjuda in en användare till listan.
 * 
 * Props:
 * - show: boolean, om modalen ska visas
 * - onClose: funktion, stänger popupen
 * - inviteEmail: string, det aktuella värdet i inputfältet
 * - onEmailChange: funktion, anropas vid ändring av input
 * - onInvite: funktion, anropas vid klick på "Bjud in"
 * - inviteMsg: string, eventuellt meddelande (feedback/fel/success)
 */

function InviteSystem({
  show,
  onClose,
  inviteEmail,
  onEmailChange,
  onInvite,
  inviteMsg
}) {
  if (!show) return null;

  return (
    <div className="invite-system-bg" onClick={onClose}>
      <div className="invite-system" onClick={e => e.stopPropagation()}>
        <h2>Bjud in användare till listan</h2>
        <input
          type="email"
          className="invite-system-input"
          value={inviteEmail}
          onChange={e => onEmailChange(e.target.value)}
          placeholder="Användarens e-post"
        />
        <div className="invite-system-btn-row">
          <button onClick={onInvite} className="invite-system-invite-btn">Bjud in</button>
          <button onClick={onClose} className="invite-system-close-btn">Stäng</button>
        </div>
        {inviteMsg && <div className="invite-msg">{inviteMsg}</div>}
      </div>
    </div>
  );
}

// Definierar vilka typer av props komponenten förväntar sig
InviteSystem.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  inviteEmail: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  inviteMsg: PropTypes.string
};

export default InviteSystem;

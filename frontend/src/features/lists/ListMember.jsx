import React from 'react';
import PropTypes from 'prop-types';

/**
 * ListMember – visar en användares e-post (eller namn om du vill).
 * Kan återanvändas för att visa varje medlem i en lista.
 * Props:
 * - email: string (obligatoriskt)
 * - name: string 
 */
function ListMember({ email, name }) {
  return (
    <div className="member-tag">
      <span className="member-email">{name ? `${name} (${email})` : email}</span>
    </div>
  );
}

ListMember.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default ListMember;

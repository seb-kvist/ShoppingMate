import React, { useState } from 'react';
import { API_URL } from '../../api';

/**
 * LoginView – hanterar både inloggning och registrering.
 * Props: onLogin: callback som anropas när användaren loggat in (för att MainBody ska uppdateras)
 */
function LoginView({ onLogin }) {
  // State för att hålla reda på formulärfält, registreringsläge och felmeddelande
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Hanterar formulärets submit (login eller register)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isRegistering) {
        // Registrera (POST /api/auth/register)
        const res = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, firstName, lastName }),
        });
        if (!res.ok) throw new Error("Registrering misslyckades")
      }
      // Logga in (POST /api/auth/login)
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Inloggning misslyckades");
      const data = await res.json();
      localStorage.setItem('token', data.token); // Spara JWT-token i localStorage
      onLogin(); // Signalera till App/MainBody att man är inloggad
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="login-view">
      {/* Rubrik (växlar beroende på login/registrering) */}
      <h2>{isRegistering ? 'Registrera dig' : 'Logga in'}</h2>
      <form onSubmit={handleSubmit}>
        {/* E-postfält */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            id="email"
            required
          />
        </div>
        {/* Lösenordsfält */}
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            required
          />
        </div>
        {/* Visa extra fält vid registrering */}
        {isRegistering && (
          <>
            <div>
              <label htmlFor="firstName">Förnamn:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Efternamn:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {/* Login/registrerings-knapp */}
        <button type="submit">
          {isRegistering ? 'Registrera' : 'Logga in'}
        </button>
        {/* Visa felmeddelande om något gått fel */}
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
      {/* Länk för att växla mellan login/registrering */}
      <p>
        {isRegistering ? 'Har du redan ett konto? ' : 'Har du inget konto? '}
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Logga in istället' : 'Registrera dig'}
        </button>
      </p>
    </div>
  );
}

export default LoginView;

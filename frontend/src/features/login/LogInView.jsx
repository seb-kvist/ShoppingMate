import React, { useState } from 'react';
import GeneralAlert from '../../components/GeneralAlert';
import { login as loginApi, register, fetchCurrentUser } from '../../api/FetchCalls';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

/**
 * LoginView – hanterar både inloggning och registrering.
 * Loggar in användaren via Context-API efter lyckad inloggning eller registrering.
 */
function LoginView()  {
  // Context-funktion för att logga in användaren globalt
  const { login } = useUser();
  const navigate = useNavigate();
  
  // State för formulärfält, reg-läge och felmeddelande
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
        await register(email, password, firstName, lastName);
      }
      // Logga in efter ev. registrering
      const data = await loginApi(email, password);
      // Spara token till Context/localStorage (user = null först)
      login(null, data.token); 

      // Hämta användarinfo nu när token är satt, spara i Context
      const userData = await fetchCurrentUser(); 
      login(userData, data.token); 
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="login-view">
      <h2>{isRegistering ? 'Registrera dig' : 'Logga in'}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">
          {isRegistering ? 'Registrera' : 'Logga in'}
        </button>
        {errorMsg && <GeneralAlert type="error" message={errorMsg} />}
      </form>
      {/* Byt mellan login och register-läge */}
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

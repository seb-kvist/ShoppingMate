import React, { useState } from 'react';

function LoginView({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Simulera inloggning
  };

  return (
    <div className="login-view">
      <h2>{isRegistering ? 'Registrera dig' : 'Logga in'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">{isRegistering ? 'Registrera' : 'Logga in'}</button>
      </form>

      <p>
        {isRegistering ? 'Har du redan ett konto? ' : 'Har du inget konto? '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Logga in istället' : 'Registrera dig'}
        </button>
      </p>
    </div>
  );
}

export default LoginView;

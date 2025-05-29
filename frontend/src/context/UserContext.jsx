import React, { createContext, useState, useContext } from 'react';

// Skapa context för användare och autentisering
const UserContext = createContext();


/**
 * UserProvider – Context-provider för användarens tillstånd och token.
 * Gör det möjligt att dela login-info mellan alla komponenter.
 */

export function UserProvider({ children }) {
  // State för aktuell användare och auth-token (hämtas från localStorage om den finns)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Login-funktion – Sätter user och token både i state och localStorage.
  const login = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

   // Logout-funktion – Tar bort user och token från state och localStorage.
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Gör contextet tillgängligt för alla barnkomponenter
  return (
    <UserContext.Provider value={{ user, token, login, logout, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook för att använda context i andra komponenter
export function useUser() {
  return useContext(UserContext);
}

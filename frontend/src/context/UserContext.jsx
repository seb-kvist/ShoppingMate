import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // State för användare och token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Uppdatera både context och localStorage vid login/logout
  const login = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

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

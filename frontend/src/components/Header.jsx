// src/components/Header.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  // Är vi på login-sidan?
  const isLoginView = location.pathname === '/login';

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-logo">ShoppingMate</h1>

        {/* Navigationslänkar (visa ej på login-sidan) */}
        {!isLoginView && (
          <nav className="header-nav">
            <a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>Hem</a>
            <a href="#" onClick={e => { e.preventDefault(); navigate('/lists'); }}>Inköpslistor</a>
          </nav>
        )}

        {/* Användarinformation och logga ut-knapp */}
        <div className="header-user-actions">
          {user && (
            <div className="header-user-info">
              Inloggad som:<br />
              <span className="header-user-name">
                {user.firstName} {user.lastName}
              </span>
              <span className="header-user-email">
                ({user.email})
              </span>
            </div>
          )}
          {/* Logga ut-knapp visas bara om användaren är inloggad */}
          {user && (
            <button className="header-logout-btn" onClick={logout}>Logga ut</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

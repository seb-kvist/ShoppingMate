import React from 'react';

function Header({ isLoginView, onNavigate, user, onLogout }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-logo">ShoppingMate</h1>

        {/* Navigationslänkar (visa ej på login-sidan) */}
        {!isLoginView && (
          <nav className="header-nav">
            {/* Navigera till startsidan */}
            <a href="#" onClick={() => onNavigate('startup')}>Hem</a>
            {/* Navigera till inköpslistor */}
            <a href="#" onClick={() => onNavigate('shoppingListOverview')}>Inköpslistor</a>
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
            <button className="header-logout-btn" onClick={onLogout}>Logga ut</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

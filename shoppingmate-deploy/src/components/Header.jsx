import React from 'react';

// Min Header-komponenten visar apptitel och navigeringslänkar (om man inte är på inloggningssidan), då en funktionell komponent som tar emot två props
function Header({ isLoginView, onNavigate }) {
  return (
    <header className="header">
      <h1>ShoppingMate</h1>

      {/* Här så säger vi att om vi INTE är på inloggningssida, så ska vi visa navigeringslänkarna */}
      {!isLoginView && (
        <nav>
          <a href="#" onClick={() => onNavigate('startup')}>Hem</a>
          <a href="#" onClick={() => onNavigate('shoppingListOverview')}>Inköpslistor</a>
        </nav>
      )}
    </header>
  );
}

export default Header;

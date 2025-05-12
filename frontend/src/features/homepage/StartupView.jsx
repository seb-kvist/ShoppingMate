import React from 'react';

function StartupView({ changeView }) {
  return (
    <div className="startup-view">
      <h2>Välkommen till ShoppingMate!</h2>
      <p>Hantera dina inköpslistor tillsammans med familj och vänner.</p>
      <button onClick={() => changeView('shoppingListOverview')}>Dina listor</button>
      <button onClick={() => changeView('createShoppingList')}>Skapa en ny lista</button>
    </div>
  );
}

export default StartupView;

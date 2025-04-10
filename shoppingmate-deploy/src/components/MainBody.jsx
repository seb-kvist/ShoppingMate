import React, { useState } from 'react';
import LoginView from '../features/login/LogInView.jsx';
import StartupView from '../features/homepage/StartupView.jsx';
import ShoppingListOverview from '../features/lists/ShoppingListOverview.jsx';
import CreateShoppingList from '../features/lists/CreateShoppingList.jsx';
import SelectedShoppingList from '../features/lists/SelectedShoppingList.jsx';
import Header from './Header.jsx';

//MainBody kommer ansvara för att visa rätt vy då beroende på användarens val och status
//isLogged in kollar om man är inloggad eller inte (boolean true false) och setIsLoggedIn är funktionen som ändrar mellan dessa.
function MainBody({ isLoggedIn, setIsLoggedIn }) {
  const [currentView, setCurrentView] = useState('login'); //Vilken vy som ska synas.

  //Sparar alla inköpslistor i state
  const [lists, setLists] = useState([
    { id: 1, name: 'Hemmet', emails: ['exempel1@gmail.com'] },
    { id: 2, name: 'Jobbgruppen', emails: ['exempel2@gmail.com'] },
  ]);
  const [selectedList, setSelectedList] = useState(null); //Detta håller koll vilken state som är vald
  
  // Funktion för att byta vy
  const handleNavigate = (view) => {
    setCurrentView(view);
  };
  
  //När vi skapar en lista så lägger vi till den i listorna och sen går tillbaka till overview
  const handleCreateList = (newList) => {
    setLists([...lists, newList]);
    setCurrentView('shoppingListOverview');
  };

  //Vi väljer en lista och sätter den som vald och visar dess innehåll
  const handleSelectList = (id) => {
    setSelectedList(lists.find(list => list.id === id));
    setCurrentView('selectedShoppingList');
  };

  //Funktion som uppdaterar listor när man ändrar
  const handleUpdateLists = (updatedLists) => {
    setLists(updatedLists);
  };

  return (
    <>
      {/* Header visas alltid, men döljer navigeringen på inloggningssidan */}
      <Header isLoginView={currentView === 'login'} onNavigate={handleNavigate} />

      {/* Om användaren inte är inloggad, visa inloggningsformuläret */}
      <main className={`fade-in`}>
        {!isLoggedIn ? ( 
          <LoginView onLogin={() => {
             setIsLoggedIn(true); 
             setCurrentView('startup'); 
            }} 
          />
        ) : (
          <>
          {/* Visa rätt komponent beroende på aktuell vy */}
            {currentView === 'startup' && <StartupView changeView={setCurrentView} />}
            {currentView === 'shoppingListOverview' && <ShoppingListOverview lists={lists} onSelectList={handleSelectList} onNavigate={handleNavigate} onUpdateLists={handleUpdateLists} />}
            {currentView === 'createShoppingList' && <CreateShoppingList onCreateList={handleCreateList} />}
            {currentView === 'selectedShoppingList' && <SelectedShoppingList list={selectedList} changeView={setCurrentView}  />} 
          </>
        )}
      </main>
    </>
  );
}

export default MainBody;

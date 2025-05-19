import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import LoginView from '../features/login/LogInView.jsx';
import StartupView from '../features/homepage/StartupView.jsx';
import ShoppingListOverview from '../features/lists/ShoppingListOverview.jsx';
import CreateShoppingList from '../features/lists/CreateShoppingList.jsx';
import SelectedShoppingList from '../features/lists/SelectedShoppingList.jsx';
import Header from './Header.jsx';
import { API_URL, authHeaders } from '../api';

/**
 * MainBody är den huvudsakliga routingen och innehållskomponenten för hela appen.
 * Här styrs användarflödet beroende på inloggning, navigation och hämtning av data.
 */
function MainBody({ isLoggedIn, setIsLoggedIn }) {
  // State för inköpslistor, vald lista, laddning, och användarinformation
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Hämta alla inköpslistor från backend
  const fetchLists = () => {
    setLoading(true);
    fetch(`${API_URL}/shoppinglist`, { headers: authHeaders() })
      .then(res => res.json())
      .then(data => setLists(data))
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  };

  // Hämta info om inloggad användare vid inloggning (eller logga ut om token är ogiltig)
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${API_URL}/auth/user`, { headers: authHeaders() })
        .then(res => {
          if (!res.ok) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser(null);
            return null;
          }
          return res.json();
        })
        .then(data => setUser(data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  // Hämta alla listor när man är inloggad (och nollställ när man loggar ut)
  useEffect(() => {
    if (isLoggedIn) {
      fetchLists();
    } else {
      setLists([]);
    }
  }, [isLoggedIn]);

  // Välj en lista och navigera till dess detaljsida
  const handleSelectList = (id) => {
    const found = lists.find(list => list.id === id);
    setSelectedList(found);
    navigate(`/lists/${id}`);
  };

  // Uppdatera hela list-arrayen vid t.ex. borttagning eller namnbyte
  const handleUpdateLists = (updatedLists) => {
    setLists(updatedLists);
  };

  // Logga ut användare (rensa token, state och navigera till login)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  // Privat route: om ej inloggad, redirecta till login
  function PrivateRoute({ children }) {
    return isLoggedIn ? children : <Navigate to="/login" />;
  }

  return (
    <>
      {/* Header visas alltid högst upp */}
      <Header
        isLoginView={location.pathname === '/login'}
        onNavigate={(view) => {
          if (view === 'startup') navigate('/');
          else if (view === 'shoppingListOverview') navigate('/lists');
          else if (view === 'createShoppingList') navigate('/lists/create');
        }}
        user={user}
        onLogout={handleLogout}
      />

      <main>
        <Routes>
          {/* Login-vy: Efter lyckad login går man till StartupView ("/") */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLogin={() => {
                    setIsLoggedIn(true);
                    navigate('/');
                  }}
                />
              )
            }
          />

          {/* StartupView: startsidan efter login */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <StartupView changeView={(view) => {
                  if (view === 'shoppingListOverview') navigate('/lists');
                  else if (view === 'createShoppingList') navigate('/lists/create');
                }} />
              </PrivateRoute>
            }
          />

          {/* Översikt över alla inköpslistor */}
          <Route
            path="/lists"
            element={
              <PrivateRoute>
                {loading ? (
                  <p>Laddar listor...</p>
                ) : (
                  <ShoppingListOverview
                    lists={lists}
                    onSelectList={handleSelectList}
                    onNavigate={(view) => {
                      if (view === 'createShoppingList') navigate('/lists/create');
                    }}
                    onUpdateLists={handleUpdateLists}
                  />
                )}
              </PrivateRoute>
            }
          />

          {/* Skapa ny inköpslista */}
          <Route
            path="/lists/create"
            element={
              <PrivateRoute>
                <CreateShoppingList onCreateList={() => {
                  fetchLists();
                  navigate('/lists');
                }} />
              </PrivateRoute>
            }
          />

          {/* Detaljsida för en specifik inköpslista */}
          <Route
            path="/lists/:id"
            element={
              <PrivateRoute>
                <SelectedShoppingList
                  list={selectedList}
                  changeView={(view) => {
                    if (view === 'shoppingListOverview') navigate('/lists');
                  }}
                  refreshLists={fetchLists} // Gör att SelectedShoppingList kan uppdatera översikten
                />
              </PrivateRoute>
            }
          />

          {/* Fångar alla okända rutter */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </main>
    </>
  );
}

export default MainBody;

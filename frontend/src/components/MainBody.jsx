import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import LoginView from '../features/login/LogInView.jsx';
import StartupView from '../features/homepage/StartupView.jsx';
import ShoppingListOverview from '../features/lists/ShoppingListOverview.jsx';
import CreateShoppingList from '../features/lists/CreateShoppingList.jsx';
import SelectedShoppingList from '../features/lists/SelectedShoppingList.jsx';
import Header from './Header.jsx';
import ErrorBoundary from "./ErrorBoundary";
import { fetchShoppingLists, fetchCurrentUser } from '../api/FetchCalls';
import { useUser } from '../context/UserContext';

/**
 * MainBody är den huvudsakliga routingen och innehållskomponenten för hela appen.
 * Här styrs användarflödet beroende på inloggning, navigation och hämtning av data.
 */
function MainBody() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser, token, login, logout } = useUser(); // <-- Context!
  const isLoggedIn = !!token; // <-- Bestäm inloggning baserat på token

  // Hämta alla inköpslistor från backend
  const fetchLists = async () => {
    setLoading(true);
    try {
      const data = await fetchShoppingLists();
      setLists(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hämta info om inloggad användare vid inloggning (eller logga ut om token är ogiltig)
  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentUser()
        .then(data => setUser(data))
        .catch(() => {
          setUser(null);
          logout();
        });
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

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

  // Privat route: om ej inloggad, redirecta till login
  function PrivateRoute({ children }) {
    return isLoggedIn ? children : <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <ErrorBoundary>
        <main>
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView />
                )
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <StartupView />
                </PrivateRoute>
              }
            />
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
                      onUpdateLists={handleUpdateLists}
                    />
                  )}
                </PrivateRoute>
              }
            />
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
            <Route
              path="/lists/:id"
              element={
                <PrivateRoute>
                  <SelectedShoppingList
                    list={selectedList}
                    changeView={(view) => {
                      if (view === 'shoppingListOverview') navigate('/lists');
                    }}
                    refreshLists={fetchLists}
                  />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </>
  );
}

export default MainBody;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import MainBody from './components/MainBody';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="app">
      <Router>
        <MainBody isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;

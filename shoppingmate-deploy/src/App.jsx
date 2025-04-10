import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainBody from './components/MainBody';
import './styles/App.css'; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <MainBody isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Footer />
    </div>
  );
}

export default App;

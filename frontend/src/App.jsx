import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import MainBody from './components/MainBody';
import { UserProvider } from './context/UserContext';
import './styles/App.css';

function App() {
return (
    <div className="app">
      <UserProvider>
        <Router>
          <MainBody />
        </Router>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;

import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';


function App() {
  return (
    <Router>
      <Header />
      <Body />   {/* Here I will show whatever site it being routed to on the main component */}
      <Footer />
    </Router>
  );
}

export default App;
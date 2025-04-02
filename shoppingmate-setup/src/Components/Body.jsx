import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutMe from "../Views/AboutMe.jsx";
import Affarsplan from '../Views/Affarsplan.jsx';
import Produktide from '../Views/Produktide.jsx';
import '../styling/Body.css';

function Body() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<div><h2>Välkommen till ShoppingMate!</h2><p>Tryck på en vy i navigeringsmenyn ovan</p></div>} />
        <Route path="/affarsplan" element={<Affarsplan />} />
        <Route path="/produktide" element={<Produktide />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default Body;
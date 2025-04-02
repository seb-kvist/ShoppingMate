import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';

function Header() {
    return (
        <header>
            <h1>SHOPPINGMATE</h1>
            <nav>
                <ul>
                    <li><Link to="/affarsplan">Affärsplan</Link></li>
                    <li><Link to="/produktide">Produktidé</Link></li>
                    <li><Link to="/aboutme">Om mig</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
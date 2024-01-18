import React from 'react';
import './Navbar.css'; // Import the CSS file for Navbar styling
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="/" className="navbar-link">
            Home
          </a>
        </li>
        {!isAuthenticated && (
          // Display the "Bank Simulator" link for non-authenticated users
          <li className="navbar-item">
            <a href="/bank-simulator" className="navbar-link">
              Bank Simulator
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

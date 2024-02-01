import React from 'react';
import './Navbar.css'; // Import the CSS file for Navbar styling
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  const handleLinkClick = () => {
    if (isAuthenticated) {
      handleLogout();
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
          <li className="navbar-item">
            <Link to="/bank-simulator" className="navbar-link" onClick={handleLinkClick}>
              Bank Simulator
            </Link>
          </li>
      </ul>
    </nav>
  );
}

export default Navbar;

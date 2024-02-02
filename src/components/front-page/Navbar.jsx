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
      <div className="navbar-list">
        <div className='left-section'>
            <Link to="/" className="navbar-link" onClick={handleLinkClick}>
              <span className="dev-symbol">&lt;Dev /&gt;</span> AlbertoAlfaro
            </Link>
        </div>
        <div className='right-section'>
            <Link to="/bank-simulator" className="navbar-link" onClick={handleLinkClick}>
              Bank Simulator
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

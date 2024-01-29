//src/components/NavbarBank.jsx

import React from 'react';
import './NavbarBank.css';

function NavbarBank({ onBecomeMemberClick, onLoginClick, isAuthenticated , handleLogout}) {
  return (
    <div className="navbar-bank">
      <div className='left-section'>
        <h2>
          BANK
        </h2>
      </div>
      <div className='right-section'>
        {!isAuthenticated && (
          <>
            <a href="#!" className="navbar-link-bank" onClick={onBecomeMemberClick}>Become a member</a>
            <button className="navbar-button-link" onClick={onLoginClick}>Login</button>
          </>
        )}
        {isAuthenticated && (
          <button className="navbar-button-link" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}
export default NavbarBank;

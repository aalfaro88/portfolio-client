import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true); // Track if it's the home page

  const handleLinkClick = () => {
    if (isAuthenticated) {
      handleLogout();
    }
  };

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the current location is the home page
    setIsHome(location.pathname === '/');
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-list">
        <div className='left-section'>
          <Link to="/" className="navbar-link" onClick={handleLinkClick}>
            <span className="dev-symbol">&lt;Dev /&gt;</span> AlbertoAlfaro
          </Link>
        </div>
        <div className='right-section'>
            <Link
              to="/"
              spy={true}
              smooth={true}
              duration={500}
              className={`navbar-link ${isHome ? '' : 'hidden'}`}> 
              <FontAwesomeIcon icon={faHome} className="icon" /> Home
            </Link>
            {isHome && ( 
            <>
              <ScrollLink
                to="about-me"
                spy={true}
                smooth={true}
                duration={500}
                className="navbar-link">
                <FontAwesomeIcon icon={faUser} className="icon" /> About Me
              </ScrollLink>
              <ScrollLink
                to="works"
                spy={true}
                smooth={true}
                duration={500}
                className="navbar-link">
                <FontAwesomeIcon icon={faBriefcase} className="icon" /> Works
              </ScrollLink>
              <ScrollLink
                to="contact-info"
                spy={true}
                smooth={true}
                duration={500}
                className="navbar-link">
                <FontAwesomeIcon icon={faEnvelope} className="icon" /> Contact Information
              </ScrollLink>
            </>
          )}
          <Link to="/bank-simulator" className="navbar-link" onClick={handleLinkClick}>
            Bank Simulator
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


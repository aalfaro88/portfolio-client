import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  

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
    setIsHome(location.pathname === '/');

    if (location.pathname === '/bank-simulator') {
      setShowProjectsDropdown(false);
    }
    
  }, [location.pathname]);

  const toggleProjectsDropdown = () => {
    setShowProjectsDropdown(prevState => !prevState);
  };

  // Handle click outside to close the dropdown

  const projects = [
    {
      title: "Bank Simulator",
      description: "Simulate basic transactions like sending money between accounts or investing. The design is based on one of the most important banks in the world.",
      imageUrl: "/images/bank-simulator.png",
      projectUrl: "/bank-simulator"
    },
    {
      title: "ImageJumble",
      description: "Explore how big NFT collections were made. Disclosure: Since I am not paying for server capacity, you'll have to consider doing very small collections with very few layers.",
      imageUrl: "/images/image-jumble.png",
      projectUrl: "https://image-jumble.netlify.app/"
    },
    {
      title: "Epic Chef",
      description: "A culinary adventure. Search through thousands of recipes looking by ingredients or by recipe name.",
      imageUrl: "/images/epic-chef.png",
      projectUrl: "https://epic-chef-app.fly.dev/"
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProjectsDropdown && !event.target.closest('.projects-dropdown-container')) {
        setShowProjectsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProjectsDropdown]);

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
          <div className="projects-dropdown-container">
            <div className="navbar-link projects-button" onClick={toggleProjectsDropdown}>
              Projects
              <FontAwesomeIcon icon={faBars} className="projects-icon" />
            </div>
            {showProjectsDropdown && (
              <div className="projects-dropdown">
                {projects.map((project, index) => (
                  <div key={index} className="dropdown-item">
                    {project.title === "Bank Simulator" ? (
                      <Link to={project.projectUrl} className="dropdown-link" onClick={toggleProjectsDropdown}>
                        {project.title}
                      </Link>
                    ) : project.title === "Word-Minigame" ? (
                      <ScrollLink to="mini-game" smooth={true} duration={500} className="dropdown-link" onClick={toggleProjectsDropdown}>
                        {project.title}
                      </ScrollLink>
                    ) : (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="dropdown-link" onClick={toggleProjectsDropdown}>
                        {project.title}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import './Greeting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Greeting = () => {
  return (
    <div className='welcome-section'>
        <h1 className='welcome-message'>My Portfolio</h1>
        <div className="section-container">
            <div className='left-box'>
                <div className='profile-container'>
                <img src='/images/profile-picture.jpeg' alt="Profile" className="profile-picture" />
                <h2>Alberto Alfaro</h2>
                <p>Full-Stack Web Developer</p>
                <div className='personal-info'>
                    <div className="contact-info">
                        <FontAwesomeIcon icon={faEnvelope} className="contact-info-icon" />
                        <span className="contact-info-text">aalfaro88@gpofinalpa.com</span>
                    </div>
                    <div className="contact-info">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-info-icon" />
                        <span className="contact-info-text">Mexico</span>
                    </div>
                    <a href="/files/CV.pdf" download="CV.pdf" className="download-cv-button">Download CV</a>
                    </div>
                </div>
            </div>
            <div className='middle-box'>
            <h2 className='greeting-title'>Hello<br/>I am <span className="green-text">Alberto</span>,<br/>Full Stack Web Developer</h2>
                <p className='greeting-description'>
                I drive business success by crafting impactful web solutions. As a developer focused on actionable results and innovative problem-solving, I'm dedicated to turning your visionary ideas into reality.
                </p>
            </div>
            <div className='right-box'>
                {['HTML', 'JS', 'REACT', 'CSS', 'PYTHON', 'MYSQL', 'EXCEL'].map(tech => (
                    <div key={tech} className="tech-skill">{tech}</div>
                ))}
            </div>
            </div>
        </div>
  );
};

export default Greeting;

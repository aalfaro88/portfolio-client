import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
  return (
    <div className='contact-info-section'>
      <h1>Contact Information</h1>
      <div className='contact-links'>
        <a
          href='https://www.linkedin.com/in/alberto-alfaro/'
          target='_blank'
          rel='noopener noreferrer'
          className='contact-link'
        >
          <img
            src='https://img.icons8.com/ios-filled/50/linkedin.png' // LinkedIn Icon
            alt='LinkedIn'
            className='contact-icon'
          />
          <p>
              LinkedIn
          </p>
        </a>
        <a
          href='https://github.com/aalfaro88'
          target='_blank'
          rel='noopener noreferrer'
          className='contact-link'
        >
          <img
            src='https://img.icons8.com/ios-filled/50/github.png' // GitHub Icon
            alt='GitHub'
            className='contact-icon'
          />
          <p>
              GitHub
          </p>
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;

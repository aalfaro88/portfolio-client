import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className='aboutme-section'>
        <div className='about-left-section'>
            <div className='title-box'>
                <h1 className='title'>About Me</h1>
            </div>
            <div className='description-box'>
                <p className='greeting-text'>
                    <span className='hello-text'>Hello!</span><br />
                    I'm Alberto, a dedicated Full-Stack Web Developer with a passion for building web applications that make an impact. My technical journey includes launching a tech company in the blockchain and NFT space, equipping me with a forward-thinking approach and an understanding of the latest technologies.<br /><br />
                    With a background in financial planning and data analytics, I blend my programming skills in Python, SQL, and web development to deliver data-driven and innovative solutions. Whether it's developing user-centric applications or utilizing machine learning to decipher data trends, I'm all about creating value and growth through technology.<br /><br />
                    If you're looking for a developer who is committed to turning challenges into opportunities with smart and scalable solutions, let's connect!
                </p>
        </div>

        </div>
        <div className='about-right-section'>
            <img src="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg" alt="Tech Background" className="tech-background-image" />
        </div>
    </div>
  );
};

export default AboutMe;

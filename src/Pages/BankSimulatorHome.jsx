//BankSimulator.jsx

import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BankSimulatorHome.css';
import NavbarBank from '../components/bank_simulator/NavbarBank';
import { BankSignUp } from '../components/bank_simulator/BankSignUp';
import BankLogin from '../components/bank_simulator/BankLogin';
import MyAccount from '../components/bank_simulator/MyAccount';


function BankSimulator() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleBecomeMemberClick = () => {
    setShowLogin(false);
    setShowSignUp(prevShowSignUp => !prevShowSignUp);
  };

  const handleLoginClick = () => {
    setShowSignUp(false); 
    setShowLogin(prevShowLogin => !prevShowLogin);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false); // Hide the login form upon successful login
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className='bank-simulator'>
      <div className="box">
        <NavbarBank 
          onBecomeMemberClick={handleBecomeMemberClick} 
          onLoginClick={handleLoginClick}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        {!isAuthenticated && (
          <>
            {showSignUp && <BankSignUp />}
            {showLogin && <BankLogin onLoginSuccess={handleLoginSuccess} />}
  
            <Slider {...settings} className='information-slider'>
              <div className='information-slide'>
                <div>
                  <h3>Welcome to the Bank Simulator!</h3>
                  <p>Here, you'll experience the thrill of managing finances in a risk-free environment. Transfer and invest virtual funds just like in a real bank. Sign up or log in to begin your journey.</p>
                </div>
                <div>
                  <img src="https://image.sggp.org.vn/w1000/Uploaded/2024/dufkxmeyxq/2022_06_09/digitalbanking1_MXND.png.webp" alt="Digital Banking" />
                </div>
              </div>
              
              <div className='information-slide'>
                <div>
                  <h3>Smooth Carousel Transitions</h3>
                  <p>Powered by React Slick, this versatile component enhances the interactivity of web applications with seamless and responsive experiences.</p>
                </div>
                <div>
                  <img src="https://wallpapercave.com/dwp1x/wp4923991.png" alt="React Slick Carousel" />
                </div>
              </div>
  
              <div className='information-slide'>
                <div>
                  <h3>Optimized for Larger Screens</h3> 
                  <p>This section is designed for larger screens to ensure optimal formatting and user experience, providing tailored content for each device.</p>
                </div>
                <div>
                  <img src="https://c4.wallpaperflare.com/wallpaper/241/580/981/css-css3-wallpaper-preview.jpg" alt="Responsive Design" />
                </div>
              </div>
            </Slider>
            <div className="simulator-info-section">
              <h3 className="simulator-info-title">About the Simulator</h3>
              <p className="simulator-info-description">
                Feel free to explore the Bank Simulator with any fictitious email and card number you prefer. Make sure your card number is unique, has 16 digits, and your email has not been used in the system before. We prioritize your privacy and only store your email and card number for simulation purposes. Remember, there's no functionality for retrieving, altering, or deleting usernames or passwords. Enjoy a risk-free environment to manage virtual finances!
              </p>
            </div>
          </>
          
          
        )} 
        {isAuthenticated && <MyAccount />}
      </div>
    </div>

  );
  
}

export default BankSimulator;

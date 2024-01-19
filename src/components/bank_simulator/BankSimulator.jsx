import React, { useState } from 'react';
import Slider from 'react-slick'; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import default styles
import "slick-carousel/slick/slick-theme.css"; // Import theme styles (optional)
import './BankSimulator.css'; // Your custom CSS
import NavbarBank from './NavbarBank';

function BankSimulator() {
  const [isWebpageVersion, setIsWebpageVersion] = useState(true);

  const toggleVersion = () => {
    setIsWebpageVersion(prevIsWebpageVersion => !prevIsWebpageVersion);
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
    <div className={`bank-simulator ${isWebpageVersion ? 'webpage-version' : 'cellphone-version'}`}>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" id="version-toggle" onChange={toggleVersion} checked={isWebpageVersion} />
          <span className="slider round"></span>
        </label>
        <p>Webpage Version</p>
      </div>
      <div className="box">
        <NavbarBank />
        {isWebpageVersion && (
          <Slider {...settings} className='information-slider'>
            <div className='information-slide'>
              <div>
                  <h3>Welcome to the Bank Simulator!</h3>
                <p>
                  Here, you'll experience the thrill of managing finances in a risk-free environment. You can transfer and invest virtual funds just like in a real bank. <br/>
                  Simply sign up or log in to begin your journey.
                </p>
              </div>
              <div>
                <img src="https://image.sggp.org.vn/w1000/Uploaded/2024/dufkxmeyxq/2022_06_09/digitalbanking1_MXND.png.webp" alt="React" />
              </div>
            </div>
            
            <div className='information-slide'>
              <div>
                <h3>Have you noticed the smooth transitions of this carousel?</h3>
              <p>
                It's powered by React Slick, a versatile carousel component for React. <br/>
                React Slick offers a seamless and responsive slider experience, enhancing the visual appeal and interactivity of web applications.</p>
              </div>
              <div>
                <img src="https://wallpapercave.com/dwp1x/wp4923991.png" alt="React" />
              </div>
            </div>

            <div className='information-slide'>
              <div>
                <h3>Notice something different on your mobile?</h3> 
              <p>
                This information section is exclusively designed for larger screens for optimal formatting and user experience. <br />
                We ensure content is tailored to each device, providing information where it fits best.</p>
              </div>
              <div>
                <img src="https://c4.wallpaperflare.com/wallpaper/241/580/981/css-css3-wallpaper-preview.jpg" alt="React" />
              </div>
            </div>
          
          </Slider>
        )}
        <h1>BANK</h1>
        <p>Welcome</p>
      </div>
    </div>
  );
  
}

export default BankSimulator;

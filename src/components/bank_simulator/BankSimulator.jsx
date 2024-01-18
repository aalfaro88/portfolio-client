import React, { useState } from 'react';
import './BankSimulator.css'; // Import your CSS file for styling
import NavbarBank from './NavbarBank';

function BankSimulator() {
  const [isWebpageVersion, setIsWebpageVersion] = useState(true);

  const toggleVersion = () => {
    setIsWebpageVersion((prevIsWebpageVersion) => !prevIsWebpageVersion);
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
        <h1>BBVA</h1>
        <p>What?? Whjere are you?</p>
      </div>
    </div>
  );
}

export default BankSimulator;

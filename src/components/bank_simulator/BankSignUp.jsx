// src/components/BankSignUp.jsx

import React, { useState } from 'react';
import { post } from '../../services/authService';
import './BankSignUp.css';

export const BankSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    card_number: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
  
    // Check for card number length
    if (formData.card_number.length !== 16) {
      setErrorMessage('Card number must be 16 characters long.');
      return;
    }
  
    try {
      const response = await post('/auth/signup', formData);
      console.log('Signup successful:', response.data);
      setIsSignedUp(true);
    } catch (error) {
      console.error('Signup Error:', error.response.data.message);
      setErrorMessage(error.response.data.message); // Display error message from server
    }
  };

  return (
    <div className='Signup-box'>
      {!isSignedUp ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Card Number:</label>
            <input type="text" name="card_number" value={formData.card_number} onChange={handleChange} required />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <div>
          <p>Signup successful! You can now log in.</p>
          {/* Consider providing a link or button to switch to the login form */}
        </div>
      )}
    </div>
  );
};

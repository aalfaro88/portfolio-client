import React, { useState } from 'react';
import { post } from '../../services/authService';
import './BankSignUp.css'; 


const BankLogin = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
      identifier: '', 
      password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
      
        try {
          const response = await post('/auth/login', formData);
        //   console.log('Login successful:', response.data);
          localStorage.setItem('authToken', response.data.authToken);  // Store the token
          if (onLoginSuccess) {
            onLoginSuccess(); // Trigger the callback on successful login
          }
        } catch (error) {
          console.error('Login Error:', error.response.data.message);
          setErrorMessage(error.response.data.message);
        }
      };
      
      
      return (
        <div className='Signup-box'>
          <form onSubmit={handleSubmit} className='bank-form'>
            <div>
              <label>Email/Card Number:</label>
              <input 
                type="text" 
                name="identifier" 
                value={formData.identifier} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };
    

      export default BankLogin;

      
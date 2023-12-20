//app.jsx

import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { SERVER_URL } from './services/SERVER_URL'; 

function App() {
  const handleLogin = async (googleData) => {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/google-login`, {
        tokenId: googleData.credential,
      });
      const { authToken } = response.data;
      localStorage.setItem("authToken", authToken);
      // Update UI or redirect as needed
    } catch (error) {
      console.error("Login Error", error.response);
    }
  };

  return (
    <GoogleOAuthProvider clientId="369527887188-jc5rpas4gfd0e4teldg7qt54h86u4j5n.apps.googleusercontent.com">
      <div>
        <h1>Welcome to my Portfolio</h1>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

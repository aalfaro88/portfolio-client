import { useState, useEffect } from 'react';
import { get, post } from './services/authService';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { SERVER_URL } from './services/SERVER_URL';
import MiniGame from './components/MiniGame';
import AddUsernameForm from './components/AddUsernameForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldShowAddUsernameForm, setShouldShowAddUsernameForm] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false); // New state variable

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      checkUsername(); // Call the username check function on app load
    } else {
      setUsernameChecked(true); // Set usernameChecked to true if no token is found
    }
  }, []);
  

  const checkUsername = async () => {
    try {
      const usernameResponse = await get('/users/check-username');
      if (usernameResponse.status === 200) {
        const { hasUsername, username } = usernameResponse.data;
        console.log('Logged in user username:', username);
  
        if (hasUsername) {
          // User has a username, no need to show the form
          setShouldShowAddUsernameForm(false);
        } else {
          // User doesn't have a username, show the form
          setShouldShowAddUsernameForm(true);
        }
      } else {
        console.error('Failed to fetch username:', usernameResponse.statusText);
      }
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setUsernameChecked(true); // Ensure that setUsernameChecked is always called
    }
  };
  

  const handleLogin = async (googleData) => {
    try {
      const response = await post('/auth/google-login', {
        tokenId: googleData.credential,
      });
      const { authToken } = response.data;
      localStorage.setItem('authToken', authToken);
      setIsAuthenticated(true); // Update authentication state
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); // Update authentication state
  };

  const handleUsernameAdded = () => {
    // Hide the AddUsernameForm after username is added
    setShouldShowAddUsernameForm(false);
  };

  return (
    <GoogleOAuthProvider clientId="369527887188-jc5rpas4gfd0e4teldg7qt54h86u4j5n.apps.googleusercontent.com">
      <div>
        <h1>Welcome to my Portfolio</h1>
        {!isAuthenticated ? (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        ) : usernameChecked && shouldShowAddUsernameForm ? ( // Check usernameChecked and shouldShowAddUsernameForm
          <AddUsernameForm onUsernameAdded={handleUsernameAdded} />
        ) : (
          <>
            <MiniGame />
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

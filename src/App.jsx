import { useState, useEffect } from 'react';
import { get, post } from './services/authService';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/front-page/Navbar';
import Greeting from './components/front-page/Greeting';
import AboutMe from './components/front-page/AboutMe';
import MiniGameHome from './components/front-page/MiniGameHome';
import BankSimulatorHome from './Pages/BankSimulatorHome';
import Works from './components/front-page/Works';
import ContactInfo from './components/front-page/ContactInfo';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shouldShowAddUsernameForm, setShouldShowAddUsernameForm] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      checkUsername();  // Ensure this is called
    } else {
      setUsernameChecked(true);
    }
  }, []);
  
  const checkUsername = async () => {
    console.log("Checking username...");  // Confirm this is called
    try {
      const usernameResponse = await get('/users/check-username');
      console.log('Username response:', usernameResponse);  // Inspect the response
  
      if (usernameResponse.status === 200) {
        const { hasUsername, username } = usernameResponse.data;
        console.log('Logged in user username:', username);  // Check the username
  
        if (hasUsername) {
          console.log('User has a username, hiding form.'); // Confirm this logic
          setShouldShowAddUsernameForm(false);
        } else {
          console.log('User does not have a username, showing form.'); // And this
          setShouldShowAddUsernameForm(true);
        }
      } else {
        console.error('Failed to fetch username:', usernameResponse.statusText);
      }
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setUsernameChecked(true); // Confirm this is set
    }
  };
  
  const handleLogin = async (googleData) => {
    try {
      const response = await post('/auth/google-login', {
        tokenId: googleData.credential,
      });
      const { authToken } = response.data;
      localStorage.setItem('authToken', authToken);
      setIsAuthenticated(true); 
      checkUsername(); 
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); 
  };

  const handleUsernameAdded = () => {
    // Hide the AddUsernameForm after username is added
    setShouldShowAddUsernameForm(false);
  };

  return (
    <GoogleOAuthProvider clientId="369527887188-jc5rpas4gfd0e4teldg7qt54h86u4j5n.apps.googleusercontent.com">
      <div>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        {shouldShowAddUsernameForm && !usernameChecked && (
          <AddUsernameForm onUsernameAdded={handleUsernameAdded} />
        )}
        {location.pathname !== '/bank-simulator' && <Greeting />}
        {location.pathname !== '/bank-simulator' && <AboutMe />}
        {location.pathname !== '/bank-simulator' && <Works />}
        <Routes>
          <Route
            path="/"
            element={<MiniGameHome
              isAuthenticated={isAuthenticated}
              handleLogin={handleLogin}
              usernameChecked={usernameChecked}
              shouldShowAddUsernameForm={shouldShowAddUsernameForm}
              handleUsernameAdded={handleUsernameAdded}
              handleLogout={handleLogout}
              />}
              />
          <Route path="/bank-simulator" element={<BankSimulatorHome />} /> 
        </Routes>
              {location.pathname !== '/bank-simulator' && <ContactInfo />}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
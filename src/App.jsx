import { useState, useEffect } from 'react';
import { get, post } from './services/authService';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom'; // Import BrowserRouter
import MiniGame from './components/MiniGame';
import AddUsernameForm from './components/AddUsernameForm';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import BankSimulator from './components/BankSimulator';


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
        <Navbar isAuthenticated={isAuthenticated} />

        <Routes>
          <Route path="/" element={
            <>
              {!isAuthenticated && (
                <>
                  <h1>Welcome to my Portfolio</h1>
                  <h3>Explore my projects and creations. Let's start with a fun word MiniGame!</h3>
                  <p>
                    Discover the technologies behind the MiniGame. Click on each logo to learn more about their role in the game.<br />
                    <b>When you are ready to play, login using your Google account.</b>
                  </p>
                             <div className="technology-icons">
              <div className="row">
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/96/external-mongodb-a-cross-platform-document-oriented-database-program-logo-filled-tal-revivo.png" alt="MongoDB" />
                  <p>MongoDB</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/fluency/96/google-logo.png" alt="Google Login API" />
                  <p>Google Login</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/officel/80/react.png" alt="React.js" />
                  <p>React.js</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/fluency/96/node-js.png" alt="Node.js" />
                  <p>Node.js</p>
                </div>
              </div>
              <div className="row">
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/ios/50/css3.png" alt="CSS3" />
                  <p>CSS3</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/color/48/html-5--v1.png" alt="HTML5" />
                  <p>HTML5</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/ios-filled/50/javascript.png" alt="JavaScript" />
                  <p>JavaScript</p>
                </div>
                <div className="technology-icon-box">
                  <img src="https://img.icons8.com/ios-filled/50/github.png" alt="GitHub" />
                  <p>GitHub</p>
                </div>
              </div>
            </div>
                </>
              )}

              <div className="google-login-container">          
                {!isAuthenticated ? (
                  <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                ) : (
                  <>
                    {usernameChecked && shouldShowAddUsernameForm ? (
                      <AddUsernameForm onUsernameAdded={handleUsernameAdded} />
                    ) : (
                      <MiniGame />
                    )}
                    <div className='logout-button'>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </>
                )}
              </div>
            </>
          } />
          <Route path="/bank-simulator" element={<BankSimulator />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
    
}

export default App;

 
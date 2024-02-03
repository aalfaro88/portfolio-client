// Home.jsx
import React from 'react';
import './MiniGameHome.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import MiniGame from './MiniGame';
import AddUsernameForm from './AddUsernameForm';

function MiniGameHome({ isAuthenticated, handleLogin, usernameChecked, shouldShowAddUsernameForm, handleUsernameAdded, handleLogout }) {
  return (
    <>
    <div className='game-container-home'>
        {!isAuthenticated && (
          <>
          <div className="welcome-paragraph">
            <h1>Word mini-game</h1>
            <h3>Explore my projects and creations. Let's start with a fun word MiniGame!</h3>
            <p>
              Discover the technologies behind the MiniGame. Click on each logo to learn more about their role in the game.<br />
              <b>When you are ready to play, login using your Google account.</b>
            </p>
          </div>
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
              <div>
                <button onClick={handleLogout} className='logout-button'>Logout</button>
              </div>
            </>
          )}
        </div>
    </div>
    </>
  );
}

export default MiniGameHome;

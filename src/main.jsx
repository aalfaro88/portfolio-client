// main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="369527887188-jc5rpas4gfd0e4teldg7qt54h86u4j5n.apps.googleusercontent.com">...</GoogleOAuthProvider>;
    <App />
  </React.StrictMode>,
)

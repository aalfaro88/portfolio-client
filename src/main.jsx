// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="website-container">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
    <div className="mobile-message">
      This site is meant to be viewed on larger screens.
    </div>
  </React.StrictMode>,
);

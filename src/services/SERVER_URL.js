// src/services/SERVER_URL.js

let SERVER_URL;

if (window.location.host.includes("localhost:5173")) {
  SERVER_URL = "http://localhost:4000";
} else {
  SERVER_URL = "https://portfolio.adaptable.app/";
}

export { SERVER_URL };


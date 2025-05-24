import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <--- CHANGED THIS LINE: from ./App.js to ./App.jsx
import './App.css'; // Import global styles

// Get the root element from index.html
const rootElement = document.getElementById('root');

// Create a React root and render the App component
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found in the document.");
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Si vous avez l'intention de transformer l'app en PWA, vous pouvez enregistrer un service worker ici
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Vous pouvez activer le service worker si nécessaire
// serviceWorkerRegistration.register();

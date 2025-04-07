import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import "../index.css";

export default function Navbar() {
  return (
    <nav className="navbar bg-opacity-80 backdrop-blur-md">
      <div className="navbar-container">
        <Link to="/" className="logo flex items-center">
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Moteur IA
          </span>
          <span className="ai-badge">Powered by AI</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link hover:text-blue-400 transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="nav-link hover:text-blue-400 transition-colors">
            À Propos
          </Link>
          <Link to="/contact" className="nav-link hover:text-blue-400 transition-colors">
            Contact
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
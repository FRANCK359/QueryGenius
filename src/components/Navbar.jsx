import React, { useState, useEffect } from 'react';  
import { NavLink } from 'react-router-dom';  
import DarkModeToggle from './DarkModeToggle';  

export default function Navbar() {  
  const [scrolled, setScrolled] = useState(false);  

  useEffect(() => {  
    const handleScroll = () => {  
      setScrolled(window.scrollY > 10);  
    };  

    window.addEventListener('scroll', handleScroll);  
    return () => window.removeEventListener('scroll', handleScroll);  
  }, []);  

  return (  
    <>  
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>  
        <div className="navbar-container">  
          <NavLink to="/" className="logo">  
            <span className="text-gradient">Moteur IA</span>  
            <span className="ai-badge">Powered by AI</span>  
          </NavLink>  

          <div className="nav-links">  
            <NavLink   
              to="/"   
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}  
            >  
              Accueil  
            </NavLink>  
            <NavLink   
              to="/about"   
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}  
            >  
              À Propos  
            </NavLink>  
            <NavLink   
              to="/contact"   
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}  
            >  
              Contact  
            </NavLink>  
            <DarkModeToggle />  
          </div>  
        </div>  
      </nav>  
    </>  
  );  
}  
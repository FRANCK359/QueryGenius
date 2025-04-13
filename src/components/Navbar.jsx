import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import AIBadge from './AIBadge';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-black/30 shadow-lg border-b border-indigo-500'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Badge */}
        <NavLink to="/" className="flex items-center gap-3">
          <span className="text-xl font-bold text-gradient drop-shadow-md">Moteur IA</span>
          <AIBadge small pulse />
        </NavLink>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center gap-6 text-sm font-medium transition-all duration-300`}
        >
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-indigo-400 underline' : 'text-gray-300 hover:text-indigo-300'}>
            <i className="fas fa-home mr-1"></i> Accueil
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-indigo-400 underline' : 'text-gray-300 hover:text-indigo-300'}>
            <i className="fas fa-info-circle mr-1"></i> À Propos
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-indigo-400 underline' : 'text-gray-300 hover:text-indigo-300'}>
            <i className="fas fa-envelope mr-1"></i> Contact
          </NavLink>
          <DarkModeToggle />
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex flex-col items-end gap-1 cursor-pointer" onClick={toggleMenu}>
          <span className="w-6 h-0.5 bg-indigo-400 rounded transition-all duration-300" />
          <span className="w-4 h-0.5 bg-indigo-400 rounded transition-all duration-300" />
          <span className="w-5 h-0.5 bg-indigo-400 rounded transition-all duration-300" />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-black/60 backdrop-blur-lg border-t border-indigo-500">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-indigo-400">
            <i className="fas fa-home mr-1"></i> Accueil
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-indigo-400">
            <i className="fas fa-info-circle mr-1"></i> À Propos
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-indigo-400">
            <i className="fas fa-envelope mr-1"></i> Contact
          </NavLink>
          <div className="pt-2">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

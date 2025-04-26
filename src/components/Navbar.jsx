import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import AIBadge from './AIBadge';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 shadow-sm border-b border-indigo-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo + Badge */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Moteur IA
            </span>
            <AIBadge small pulse />
          </NavLink>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { path: "/", name: "Accueil", icon: "🏠" },
            { path: "/about", name: "À Propos", icon: "ℹ️" },
            { path: "/contact", name: "Contact", icon: "✉️" }
          ].map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-1 text-sm font-medium transition-all
                ${isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 hover:text-indigo-500 dark:text-gray-300 dark:hover:text-indigo-300'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
          
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden flex flex-col items-end gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            className="block h-0.5 bg-indigo-500 rounded-full"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1, width: 20 }}
            className="block h-0.5 bg-indigo-500 rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 16 }}
            className="block h-0.5 bg-indigo-500 rounded-full"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-indigo-500/10">
              {[
                { path: "/", name: "Accueil", icon: "🏠" },
                { path: "/about", name: "À Propos", icon: "ℹ️" },
                { path: "/contact", name: "Contact", icon: "✉️" }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink 
                    to={item.path} 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-3 px-2 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2 px-2"
              >
                <DarkModeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
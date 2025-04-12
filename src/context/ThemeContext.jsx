import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AIBadge from '../components/AIBadge';

// Création du contexte avec des valeurs par défaut
const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleTheme: () => {},
  themeConfig: {}
});

// Hook personnalisé pour accéder au contexte
export const useTheme = () => useContext(ThemeContext);

// Composant Provider
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // 1. Vérifier le localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'enabled';
    }
    
    // 2. Vérifier les préférences système
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Configuration du thème
  const themeConfig = useMemo(() => ({
    colors: {
      primary: darkMode ? '#8B5CF6' : '#3B82F6',
      background: darkMode ? '#111827' : '#FFFFFF',
      text: darkMode ? '#F3F4F6' : '#1F2937',
      card: darkMode ? '#1F2937' : '#F9FAFB',
      border: darkMode ? '#374151' : '#E5E7EB'
    },
    transitions: {
      default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    shadows: {
      sm: darkMode 
        ? '0 1px 3px rgba(0, 0, 0, 0.5)' 
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
      md: darkMode
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  }), [darkMode]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
      
      // Animation spéciale lors du changement
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          document.body.classList.toggle('dark', newMode);
        });
      } else {
        document.body.classList.toggle('dark', newMode);
      }
      
      return newMode;
    });
  };

  // Effet pour l'initialisation du thème
  useEffect(() => {
    if (isFirstLoad) {
      document.body.classList.add(darkMode ? 'dark' : 'light');
      document.body.style.opacity = '1';
      setIsFirstLoad(false);
    }
  }, [darkMode, isFirstLoad]);

  // Écoute des changements système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Ne pas écouter les changements si l'utilisateur a déjà une préférence sauvegardée
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Valeur du contexte
  const contextValue = useMemo(() => ({
    darkMode,
    setDarkMode,
    toggleTheme,
    themeConfig
  }), [darkMode, themeConfig]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
      
      {/* Injection de CSS variables */}
      <style>
        {`
          :root {
            --primary: ${themeConfig.colors.primary};
            --bg: ${themeConfig.colors.background};
            --text: ${themeConfig.colors.text};
            --card-bg: ${themeConfig.colors.card};
            --border: ${themeConfig.colors.border};
            --transition: ${themeConfig.transitions.default};
          }
        `}
      </style>
    </ThemeContext.Provider>
  );
}

// Composant pour afficher le badge IA avec le thème
export function ThemedAIBadge() {
  const { darkMode } = useTheme();
  
  return (
    <AIBadge 
      small 
      glowColor={darkMode ? '#8B5CF6' : '#3B82F6'}
      pulseSpeed={darkMode ? '3s' : '2s'}
    />
  );
}
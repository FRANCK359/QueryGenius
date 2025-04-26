import { useEffect, useState, useCallback } from 'react';

// Configuration des préférences
const PREFERENCES_KEY = 'app-preferences';

const DEFAULT_PREFERENCES = {
  theme: 'system',       // 'light' | 'dark' | 'system'
  language: 'fr',        // Langue par défaut
  safeSearch: true,      // Filtrage activé par défaut
  resultsPerPage: 10,    // Nombre de résultats par défaut
  notifications: true    // Notifications activées
};

// Service de stockage sécurisé
const storageService = {
  get: () => {
    try {
      const data = localStorage.getItem(PREFERENCES_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage read error:', error);
      return null;
    }
  },
  set: (value) => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage write error:', error);
      return false;
    }
  },
  clear: () => {
    localStorage.removeItem(PREFERENCES_KEY);
  }
};

// Hook personnalisé
export function usePreferences() {
  const [preferences, setInternalPreferences] = useState(() => {
    const saved = storageService.get();
    return { ...DEFAULT_PREFERENCES, ...saved };
  });

  // Système de thème automatique
  const [systemTheme, setSystemTheme] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // Sauvegarde des préférences
  const savePreferences = useCallback((newPrefs) => {
    const merged = { ...preferences, ...newPrefs };
    if (storageService.set(merged)) {
      setInternalPreferences(merged);
      return true;
    }
    return false;
  }, [preferences]);

  // Réinitialisation
  const resetPreferences = useCallback(() => {
    if (storageService.set(DEFAULT_PREFERENCES)) {
      setInternalPreferences(DEFAULT_PREFERENCES);
      return true;
    }
    return false;
  }, []);

  // Effet pour surveiller les changements
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === PREFERENCES_KEY) {
        const updated = storageService.get();
        setInternalPreferences(prev => ({ ...prev, ...updated }));
      }
    };

    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Configuration des écouteurs
    window.addEventListener('storage', handleStorageChange);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Calcul du thème effectif
  const effectiveTheme = preferences.theme === 'system' ? systemTheme : preferences.theme;

  return {
    preferences: {
      ...preferences,
      effectiveTheme // Ajout du thème calculé
    },
    savePreferences,
    resetPreferences,
    systemTheme
  };
}
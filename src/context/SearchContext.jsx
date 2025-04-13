import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

const defaultPreferences = {
  safeSearch: true,
  language: 'fr',
  resultsPerPage: 10
};

export function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  });

  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem('preferences');
    return stored ? JSON.parse(stored) : defaultPreferences;
  });

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken') || null;
  });

  const addToHistory = (query) => {
    const newHistory = [
      { query, timestamp: new Date().toISOString() },
      ...searchHistory.filter((item) => item.query !== query)
    ].slice(0, 10);

    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const updatePreferences = (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem('preferences', JSON.stringify(updated));
  };

  const login = (token) => {
    setUserToken(token);
    localStorage.setItem('userToken', token);
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('userToken');
  };

  // Synchronisation manuelle (utile si d'autres composants modifient le storage)
  useEffect(() => {
    const syncStorage = () => {
      const storedPrefs = localStorage.getItem('preferences');
      if (storedPrefs) setPreferences(JSON.parse(storedPrefs));
    };
    window.addEventListener('storage', syncStorage);
    return () => window.removeEventListener('storage', syncStorage);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        addToHistory,
        clearHistory,
        preferences,
        updatePreferences,
        userToken,
        login,
        logout
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);

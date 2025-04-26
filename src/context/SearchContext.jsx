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
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading search history from localStorage', e);
      return [];
    }
  });

  const [preferences, setPreferences] = useState(() => {
    const stored = localStorage.getItem('preferences');
    try {
      return stored ? JSON.parse(stored) : defaultPreferences;
    } catch (e) {
      console.error('Error loading preferences from localStorage', e);
      return defaultPreferences;
    }
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);

  const addSearchToHistory = (searchQuery) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = [searchQuery, ...prevHistory.filter(item => item !== searchQuery)];
      return updatedHistory.slice(0, 10); // Limite à 10 éléments dans l'historique
    });
  };

  const removeSearchFromHistory = (searchQuery) => {
    setSearchHistory((prevHistory) => prevHistory.filter(item => item !== searchQuery));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        setSearchHistory,
        addSearchToHistory,
        removeSearchFromHistory,
        preferences,
        setPreferences,
        resetPreferences
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

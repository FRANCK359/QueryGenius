import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [preferences, setPreferences] = useState({
    safeSearch: true,
    language: 'fr',
    resultsPerPage: 10
  });
  const [userToken, setUserToken] = useState(null);

  const addToHistory = (query) => {
    setSearchHistory(prev => [
      { query, timestamp: new Date().toISOString() },
      ...prev.slice(0, 9)
    ]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        addToHistory,
        preferences,
        setPreferences,
        userToken,
        setUserToken
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
import { useState, useEffect, useCallback, useRef } from 'react';
import { search as apiSearch, getSearchSuggestions, getSearchHistory } from '../services/searchService';

export function useSearchOperations() {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  const debounceTimeout = useRef(null);
  const suggestionCache = useRef({}); // Pour éviter les requêtes répétées sur le même mot

  const performSearch = useCallback(async (query, filters = {}) => {
    setIsSearching(true);
    setError(null);

    try {
      const data = await apiSearch(query, filters);
      setResults(data.results || []);
      setHasSearchedOnce(true);

      // Mise à jour de l’historique
      setHistory((prev) => {
        const newHistory = [query, ...prev.filter((q) => q !== query)];
        return newHistory.slice(0, 5);
      });

      return data;
    } catch (err) {
      console.error('Search error:', err);
      setError('Une erreur est survenue lors de la recherche.');
      throw err;
    } finally {
      setIsSearching(false);
    }
  }, []);

  const updateSuggestions = useCallback((query) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      if (query.length <= 2) {
        setSuggestions([]);
        return;
      }

      // Utilise le cache si disponible
      if (suggestionCache.current[query]) {
        setSuggestions(suggestionCache.current[query]);
        return;
      }

      try {
        const data = await getSearchSuggestions(query);
        setSuggestions(data);
        suggestionCache.current[query] = data; // Mise en cache
      } catch (err) {
        console.error('Suggestions error:', err);
        setSuggestions([]);
      }
    }, 300);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const data = await getSearchHistory();
      setHistory(data);
    } catch (err) {
      console.error('Load history error:', err);
      setHistory([]);
    }
  }, []);

  const clearResults = () => {
    setResults([]);
    setHasSearchedOnce(false);
  };

  useEffect(() => {
    loadHistory();

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [loadHistory]);

  return {
    results,
    suggestions,
    history,
    isSearching,
    error,
    hasSearchedOnce,
    performSearch,
    updateSuggestions,
    loadHistory,
    clearResults
  };
}

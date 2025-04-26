import { useState, useEffect, useCallback, useRef } from 'react';
import { searchService } from '../services/searchService';

export function useSearchOperations() {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  const debounceTimeout = useRef(null);
  const suggestionCache = useRef(new Map());
  const abortControllerRef = useRef(null);

  const performSearch = useCallback(async (query, filters = {}, preferences = {}) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsSearching(true);
    setError(null);

    try {
      const combinedFilters = {
        ...filters,
        safeSearch: preferences.safeSearch !== undefined ? preferences.safeSearch : true,
        language: preferences.language || 'fr',
      };

      const data = await searchService.search(query, combinedFilters, {
        signal: abortControllerRef.current.signal
      });

      setResults(data?.results || []);
      setHasSearchedOnce(true);

      setHistory(prev => {
        const newHistory = [
          { query, timestamp: Date.now() },
          ...prev.filter(item => item.query !== query)
        ];
        return newHistory.slice(0, preferences.maxHistoryItems || 10);
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Une erreur est survenue lors de la recherche');
        console.error('Search error:', err);
      }
    } finally {
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  }, []);

  const updateSuggestions = useCallback((query, preferences = {}) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const cached = suggestionCache.current.get(query);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchService.getSuggestions(query, {
          language: preferences.language || 'fr'
        });

        const safeSuggestions = Array.isArray(data) ? data : [];
        suggestionCache.current.set(query, safeSuggestions);
        setSuggestions(safeSuggestions);
      } catch (err) {
        console.error('Suggestions error:', err);
        setSuggestions([]);
      }
    }, 300);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const data = await searchService.getHistory();
      setHistory(Array.isArray(data) 
        ? data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        : []);
    } catch (err) {
      console.error('History load error:', err);
      setHistory([]);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setHasSearchedOnce(false);
    setError(null);
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await searchService.clearHistory();
      setHistory([]);
    } catch (err) {
      console.error('Clear history error:', err);
    }
  }, []);

  useEffect(() => {
    loadHistory();

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
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
    clearResults,
    clearHistory
  };
}
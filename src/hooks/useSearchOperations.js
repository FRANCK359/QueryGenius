// hooks/useSearchOperations.js
import { useState, useEffect, useCallback } from 'react';
import { search as apiSearch, getSearchSuggestions, getSearchHistory } from '../services/searchService';

let debounceTimeout; // Variable pour gérer le debounce

export function useSearchOperations() {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Fonction de recherche avec debounce
  const performSearch = useCallback(async (query, filters = {}) => {
    setIsSearching(true);
    setError(null);
    try {
      const data = await apiSearch(query, filters);
      setResults(data.results);

      // Ajout de la recherche à l'historique
      setHistory((prevHistory) => {
        const newHistory = [query, ...prevHistory.filter((item) => item !== query)];
        return newHistory.slice(0, 5); // Limite l'historique à 5 éléments
      });

      return data;
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche.');
      throw err;
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Mise à jour des suggestions avec debounce
  const updateSuggestions = useCallback((query) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    
    debounceTimeout = setTimeout(async () => {
      if (query.length > 2) { // Limite à 3 caractères pour lancer les suggestions
        try {
          const data = await getSearchSuggestions(query);
          setSuggestions(data);
        } catch (err) {
          console.error('Failed to get suggestions:', err);
          setSuggestions([]); // Si échec, ne rien afficher.
        }
      }
    }, 300); // 300ms de délai avant d'appeler l'API
  }, []);

  // Chargement de l'historique depuis l'API ou du stockage local
  const loadHistory = useCallback(async () => {
    try {
      const data = await getSearchHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history:', err);
      setHistory([]); // Retourne un tableau vide en cas d'erreur.
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    results,
    suggestions,
    history,
    isSearching,
    error,
    performSearch,
    updateSuggestions,
    loadHistory
  };
}

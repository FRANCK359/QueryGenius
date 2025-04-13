import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.moteuria.com/v1';

if (!process.env.REACT_APP_API_URL) {
  toast.warn("API en mode démo, certaines fonctionnalités peuvent être limitées.");
}

let suggestionCache = {}; // Cache local avec timestamps

// ---------- Gestion des erreurs ----------
const handleError = (message) => {
  console.error(message);
  toast.error(message);
};

// ---------- Token ----------
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    handleError("Token d'authentification manquant. Veuillez vous reconnecter.");
    throw new Error("Token d'authentification manquant");
  }
  return token;
};

// ---------- Requête API centralisée ----------
const apiRequest = async (endpoint, options = {}, requireAuth = true) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (requireAuth) headers['Authorization'] = `Bearer ${getToken()}`;

  try {
    toast.loading('Chargement en cours...', { toastId: 'api-loading' });

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error.message);
    throw error;
  } finally {
    toast.dismiss('api-loading');
  }
};

// ---------- Requête de recherche ----------
export const search = (query, filters = {}, preferences = {}) =>
  apiRequest('/search', {
    method: 'POST',
    body: JSON.stringify({ query, filters, preferences }),
  });

// ---------- Suggestions avec cache + durée ----------
const isCacheValid = (entry) => {
  const maxAge = 5 * 60 * 1000; // 5 minutes
  return entry && (Date.now() - entry.timestamp < maxAge);
};

export const getSearchSuggestions = async (query) => {
  const cacheEntry = suggestionCache[query];
  if (isCacheValid(cacheEntry)) {
    console.log('Suggestions depuis le cache :', cacheEntry.data);
    return cacheEntry.data;
  }

  try {
    const response = await fetch(`${API_URL}/suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Erreur API lors de la récupération des suggestions: ${response.statusText}`);
    }

    const data = await response.json();
    suggestionCache[query] = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    handleError(`Erreur lors de la récupération des suggestions : ${error.message}`);
    return [];
  }
};

// ---------- Historique ----------
export const getSearchHistory = () => apiRequest('/search/history');

// ---------- Préférences utilisateur ----------
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    handleError("Échec de la sauvegarde des préférences.");
  }
};

export const getUserPreferences = () => {
  try {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    handleError("Échec du chargement des préférences.");
    return {};
  }
};

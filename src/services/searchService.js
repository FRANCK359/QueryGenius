import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.moteuria.com/v1';

let suggestionCache = {}; // Cache local pour les suggestions

// Fonction pour obtenir le token et vérifier sa présence
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Token d\'authentification manquant. Veuillez vous reconnecter.');
    throw new Error('Token d\'authentification manquant');
  }
  return token;
};

// Fonction pour effectuer une recherche
export const search = async (query, filters = {}, preferences = {}) => {
  const token = getToken(); // Obtenir et vérifier le token
  
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, filters, preferences }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API lors de la recherche: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    toast.error(`Une erreur est survenue lors de la recherche: ${error.message}`);
    throw error;
  }
};

// Fonction pour obtenir les suggestions, avec mise en cache
export const getSearchSuggestions = async (query) => {
  if (suggestionCache[query]) {
    console.log('Suggestions from cache:', suggestionCache[query]);
    return suggestionCache[query];
  }

  try {
    const response = await fetch(`${API_URL}/suggestions?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`Erreur API lors de la récupération des suggestions: ${response.statusText}`);
    }

    const data = await response.json();
    suggestionCache[query] = data;
    return data;
  } catch (error) {
    console.error('Suggestion error:', error);
    toast.error(`Une erreur est survenue lors de la récupération des suggestions: ${error.message}`);
    return [];
  }
};

// Fonction pour récupérer l'historique des recherches
export const getSearchHistory = async () => {
  const token = getToken(); // Obtenir et vérifier le token
  
  try {
    const response = await fetch(`${API_URL}/search/history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API lors de la récupération de l'historique: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('History error:', error);
    toast.error(`Une erreur est survenue lors de la récupération de l'historique: ${error.message}`);
    return [];
  }
};

// Sauvegarde des préférences utilisateur
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

// Chargement des préférences utilisateur
export const getUserPreferences = () => {
  try {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return {};
  }
};

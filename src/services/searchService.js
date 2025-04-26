import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.moteuria.com/v1';

// ---------- Initial Setup ----------
if (!process.env.REACT_APP_API_URL) {
  toast.warn("API en mode démo - données limitées", {
    autoClose: 5000,
    toastId: 'demo-warning'
  });
}

// ---------- Error Handling ----------
const handleError = (error, context = '') => {
  console.error(`[API Error] ${context}:`, error);
  
  let userMessage = "Une erreur est survenue";
  if (error.response?.status === 401) {
    userMessage = "Session expirée - Veuillez vous reconnecter";
    // Optional: Redirect to login
  } else if (error.response?.status === 429) {
    userMessage = "Trop de requêtes - Veuillez patienter";
  } else if (error.message) {
    userMessage = error.message;
  }

  toast.error(userMessage, {
    toastId: `error-${uuidv4()}`,
    autoClose: 5000
  });

  return { error: true, message: userMessage };
};

// ---------- Token Management ----------
const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token manquant");
    
    // Basic token structure validation
    if (token.split('.').length !== 3) {
      throw new Error("Token invalide");
    }
    
    return token;
  } catch (error) {
    handleError(error, "Authentification");
    throw error;
  }
};

// ---------- Core API Request ----------
const apiRequest = async (endpoint, options = {}, requireAuth = true) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const headers = { 
    'Content-Type': 'application/json',
    'X-Request-ID': uuidv4(),
    ...options.headers 
  };

  if (requireAuth) {
    try {
      headers['Authorization'] = `Bearer ${getToken()}`;
    } catch (error) {
      return { error: true, message: error.message };
    }
  }

  const loadingToast = toast.loading("Traitement en cours...", {
    toastId: `loading-${endpoint}`,
    autoClose: false
  });

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }

    const data = await response.json();
    toast.dismiss(loadingToast);
    
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    toast.dismiss(loadingToast);
    return handleError(error, `API Request to ${endpoint}`);
  }
};

// ---------- Enhanced Caching System ----------
class ApiCache {
  constructor(name, ttl = 300000) {
    this.name = name;
    this.ttl = ttl;
    this.dbPromise = this.initDB();
  }

  async initDB() {
    if (!window.indexedDB) return null;
    
    return new Promise((resolve) => {
      const request = indexedDB.open('ApiCacheDB', 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.name)) {
          db.createObjectStore(this.name, { keyPath: 'key' });
        }
      };
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn("IndexedDB initialization failed");
        resolve(null);
      };
    });
  }

  async get(key) {
    const db = await this.dbPromise;
    if (!db) return null;
    
    return new Promise((resolve) => {
      const transaction = db.transaction([this.name], 'readonly');
      const store = transaction.objectStore(this.name);
      const request = store.get(key);
      
      request.onsuccess = () => {
        const entry = request.result;
        if (entry && (Date.now() - entry.timestamp < this.ttl)) {
          resolve(entry.value);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => resolve(null);
    });
  }

  async set(key, value) {
    const db = await this.dbPromise;
    if (!db) return;
    
    return new Promise((resolve) => {
      const transaction = db.transaction([this.name], 'readwrite');
      const store = transaction.objectStore(this.name);
      store.put({ key, value, timestamp: Date.now() });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }
}

const suggestionsCache = new ApiCache('searchSuggestions');

// ---------- API Services ----------
export const searchService = {
  async search(query, filters = {}, preferences = {}) {
    try {
      return await apiRequest('/search', {
        method: 'POST',
        body: { query, filters, preferences }
      });
    } catch (error) {
      return handleError(error, "Search Request");
    }
  },

  async getSuggestions(query) {
    try {
      if (!query || query.length < 2) return [];
      
      const cached = await suggestionsCache.get(query);
      if (cached) return cached;
      
      const data = await apiRequest(
        `/suggestions?q=${encodeURIComponent(query)}`, 
        {}, 
        false
      );
      
      if (data && !data.error) {
        await suggestionsCache.set(query, data);
      }
      return data;
    } catch (error) {
      return handleError(error, "Fetch Suggestions");
    }
  },

  async getHistory() {
    try {
      return await apiRequest('/search/history');
    } catch (error) {
      return handleError(error, "Fetch History");
    }
  }
};

// ---------- Secure Preferences Management ----------
const safeStorage = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      handleError(error, "LocalStorage Read");
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      handleError(error, "LocalStorage Write");
      return false;
    }
  }
};

export const userPreferences = {
  save(preferences) {
    if (safeStorage.set('userPreferences', preferences)) {
      toast.success("Préférences sauvegardées");
    }
  },

  get() {
    return safeStorage.get('userPreferences') || {};
  },

  clear() {
    localStorage.removeItem('userPreferences');
  }
};

// ---------- Utility Functions ----------
export const apiUtils = {
  generateRequestId: () => uuidv4(),
  isApiError: (response) => response && response.error
};
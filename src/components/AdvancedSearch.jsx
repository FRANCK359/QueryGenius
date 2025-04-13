import React, { useState, useEffect, useCallback } from 'react';
import { useSearch } from '../context/SearchContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, CalendarDays, Globe, Quote, Settings, Search
} from "lucide-react";

export default function AdvancedSearch({ onSearch }) {
  const { preferences, setPreferences } = useSearch();
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    fileType: '',
    timeRange: '',
    domain: '',
    exactPhrase: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = useCallback((currentFilters) => {
    if (onSearch) onSearch(currentFilters);
  }, [onSearch]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(filters);
    }, 300);
    return () => clearTimeout(debounce);
  }, [filters, handleSearch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setPreferences(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const resetFilters = () => {
    setFilters({
      fileType: '',
      timeRange: '',
      domain: '',
      exactPhrase: ''
    });
    handleSearch({});
  };

  const iconAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  };

  return (
    <div className={`advanced-search p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 transition-all
      ${theme === 'dark' ? 'bg-black/20 text-white' : 'bg-white/30 text-gray-800'}`}>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-500" />
          Options de recherche avancée
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Réduire ▲' : 'Étendre ▼'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <motion.p className="text-sm italic text-green-400">🧠 Analyse IA en cours...</motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  <motion.span {...iconAnimation}>
                    <Quote className="w-4 h-4 text-purple-500 inline-block mr-1" />
                  </motion.span>
                  Expression exacte :
                </label>
                <input
                  type="text"
                  name="exactPhrase"
                  value={filters.exactPhrase}
                  onChange={handleFilterChange}
                  placeholder='"recherche exacte"'
                  className="w-full filter-input"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <motion.span {...iconAnimation}>
                    <Globe className="w-4 h-4 text-blue-500 inline-block mr-1" />
                  </motion.span>
                  Domaine :
                </label>
                <input
                  type="text"
                  name="domain"
                  value={filters.domain}
                  onChange={handleFilterChange}
                  placeholder="exemple.com"
                  className="w-full filter-input"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <motion.span {...iconAnimation}>
                    <FileText className="w-4 h-4 text-indigo-500 inline-block mr-1" />
                  </motion.span>
                  Type de fichier :
                </label>
                <select
                  name="fileType"
                  value={filters.fileType}
                  onChange={handleFilterChange}
                  className="w-full filter-input"
                >
                  <option value="">Tous</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="ppt">Présentation</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  <motion.span {...iconAnimation}>
                    <CalendarDays className="w-4 h-4 text-pink-500 inline-block mr-1" />
                  </motion.span>
                  Période :
                </label>
                <select
                  name="timeRange"
                  value={filters.timeRange}
                  onChange={handleFilterChange}
                  className="w-full filter-input"
                >
                  <option value="">Toutes</option>
                  <option value="hour">Dernière heure</option>
                  <option value="day">Dernier jour</option>
                  <option value="week">Semaine dernière</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold flex items-center gap-2 mb-3">
                <motion.span {...iconAnimation}>
                  <Search className="w-5 h-5 text-green-500" />
                </motion.span>
                Préférences de recherche
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="safeSearch"
                    checked={preferences.safeSearch || false}
                    onChange={handlePreferenceChange}
                  />
                  SafeSearch
                </label>

                <div>
                  <label className="block text-sm mb-1">Langue :</label>
                  <select
                    name="language"
                    value={preferences.language || 'fr'}
                    onChange={handlePreferenceChange}
                    className="w-full filter-input"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="es">Espagnol</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Résultats / page :</label>
                  <select
                    name="resultsPerPage"
                    value={preferences.resultsPerPage || 10}
                    onChange={handlePreferenceChange}
                    className="w-full filter-input"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition"
              >
                Réinitialiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

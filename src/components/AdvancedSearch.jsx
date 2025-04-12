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
    handleSearch(filters);
  }, [filters, handleSearch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    handleSearch({ ...filters, [name]: value });
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

  const iconAnimation = theme === 'dark'
    ? {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { type: 'spring', stiffness: 200, damping: 15 }
      }
    : {
        initial: { opacity: 0, rotate: -15 },
        animate: { opacity: 1, rotate: 0 },
        transition: { duration: 0.4 }
      };

  return (
    <div className={`advanced-search ${theme}-theme`}>
      <div className="search-header">
        <h3>
          <Settings className="w-5 h-5 text-cyan-500" />
          Options de recherche avancée
        </h3>
        <button 
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Réduire' : 'Étendre'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="search-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="search-filters">
              <div className="filter-group">
                <label htmlFor="exactPhrase">
                  <motion.span {...iconAnimation}>
                    <Quote className="w-4 h-4 text-purple-500 inline-block mr-1" />
                  </motion.span>
                  Expression exacte :
                </label>
                <input
                  type="text"
                  name="exactPhrase"
                  id="exactPhrase"
                  placeholder='"recherche exacte"'
                  value={filters.exactPhrase}
                  onChange={handleFilterChange}
                  className="visible"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="domain">
                  <motion.span {...iconAnimation}>
                    <Globe className="w-4 h-4 text-blue-500 inline-block mr-1" />
                  </motion.span>
                  Domaine :
                </label>
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  placeholder="exemple.com"
                  value={filters.domain}
                  onChange={handleFilterChange}
                  className="visible"
                />
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label htmlFor="fileType">
                    <motion.span {...iconAnimation}>
                      <FileText className="w-4 h-4 text-indigo-500 inline-block mr-1" />
                    </motion.span>
                    Type de fichier :
                  </label>
                  <select 
                    name="fileType" 
                    id="fileType"
                    value={filters.fileType}
                    onChange={handleFilterChange}
                    className="visible"
                  >
                    <option value="">Tous</option>
                    <option value="pdf">PDF</option>
                    <option value="doc">Document</option>
                    <option value="ppt">Présentation</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="timeRange">
                    <motion.span {...iconAnimation}>
                      <CalendarDays className="w-4 h-4 text-pink-500 inline-block mr-1" />
                    </motion.span>
                    Période :
                  </label>
                  <select 
                    name="timeRange" 
                    id="timeRange"
                    value={filters.timeRange}
                    onChange={handleFilterChange}
                    className="visible"
                  >
                    <option value="">Toutes</option>
                    <option value="hour">Dernière heure</option>
                    <option value="day">Dernier jour</option>
                    <option value="week">Semaine dernière</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="search-preferences">
              <h4>
                <motion.span {...iconAnimation}>
                  <Search className="w-4 h-4 inline-block text-green-500 mr-1" />
                </motion.span>
                Préférences de recherche
              </h4>
              <div className="preferences-grid">
                <div className="preference-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="safeSearch"
                      name="safeSearch"
                      checked={preferences.safeSearch || false}
                      onChange={handlePreferenceChange}
                      className="visible"
                    />
                    <span className="checkmark"></span>
                    SafeSearch
                  </label>
                </div>

                <div className="preference-item">
                  <label>Langue :</label>
                  <select
                    name="language"
                    value={preferences.language || 'fr'}
                    onChange={handlePreferenceChange}
                    className="visible"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="es">Espagnol</option>
                  </select>
                </div>

                <div className="preference-item">
                  <label>Résultats par page :</label>
                  <select
                    name="resultsPerPage"
                    value={preferences.resultsPerPage || 10}
                    onChange={handlePreferenceChange}
                    className="visible"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="search-actions">
              <button className="reset-button" onClick={resetFilters}>
                Réinitialiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

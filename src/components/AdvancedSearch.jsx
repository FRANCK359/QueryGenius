import React, { useState, useEffect, useCallback, useMemo } from 'react';  
import { useSearch } from '../context/SearchContext';  
import { useTheme } from '../context/ThemeContext';  
import { motion, AnimatePresence } from 'framer-motion';  
import { FileText, CalendarDays, Globe, Quote, Settings, Search } from "lucide-react";  

// Objet de filtres par défaut pour centraliser leur définition  
const defaultFilters = {  
  fileType: '',  
  timeRange: '',  
  domain: '',  
  exactPhrase: ''  
};  

export default function AdvancedSearch({ onSearch }) {  
  const { preferences, setPreferences } = useSearch();  
  const { theme } = useTheme();  
  const [filters, setFilters] = useState(defaultFilters);  
  const [isExpanded, setIsExpanded] = useState(false);  
  const [error, setError] = useState('');  

  // Fonction de recherche avec debounce  
  const handleSearch = useCallback(() => {  
    if (Object.values(filters).some(f => !f) && filters.exactPhrase === '') {  
      setError('Veuillez remplir au moins un critère de recherche.');  
      return;  
    }  
    setError('');  
    if (onSearch) {  
      onSearch(filters);  
    }  
  }, [filters, onSearch]);  

  useEffect(() => {  
    const debounceTimer = setTimeout(() => {  
      handleSearch();  
    }, 300);  
    return () => clearTimeout(debounceTimer);  
  }, [filters, handleSearch]);  

  // Gestion de la mise à jour des filtres  
  const handleFilterChange = (e) => {  
    const { name, value } = e.target;  
    setFilters(prev => ({ ...prev, [name]: value }));  
  };  

  // Mise à jour des préférences utilisateur  
  const handlePreferenceChange = (e) => {  
    const { name, value, type, checked } = e.target;  
    const newValue = type === 'checkbox' ? checked : value;  
    setPreferences(prev => ({ ...prev, [name]: newValue }));  
  };  

  // Réinitialisation des filtres  
  const resetFilters = () => {  
    setFilters(defaultFilters);  
    if (onSearch) onSearch(defaultFilters);  
  };  

  // Configuration d'animation  
  const iconAnimation = useMemo(() => ({  
    initial: { opacity: 0, y: -10 },  
    animate: { opacity: 1, y: 0 },  
    transition: { type: 'spring', stiffness: 200, damping: 15 }  
  }), []);  

  return (  
    <div className={`advanced-search p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 transition-all  
      ${theme === 'dark' ? 'bg-black/20 text-white' : 'bg-white/30 text-gray-800'}`}>  
      
      <div className="flex items-center justify-between mb-4">  
        <h3 className="text-lg font-semibold flex items-center gap-2">  
          <Settings className="w-5 h-5 text-cyan-500" />  
          Options de recherche avancée  
        </h3>  
        <button  
          onClick={() => setIsExpanded(prev => !prev)}  
          className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition"  
          aria-expanded={isExpanded}  
        >  
          {isExpanded ? 'Réduire ▲' : 'Étendre ▼'}  
        </button>  
      </div>  

      {error && <p className="text-red-500">{error}</p>}  

      <AnimatePresence initial={false}>  
        {isExpanded && (  
          <motion.div  
            initial={{ opacity: 0, scale: 0.95 }}  
            animate={{ opacity: 1, scale: 1 }}  
            exit={{ opacity: 0, scale: 0.95 }}  
            transition={{ duration: 0.4 }}  
            className="space-y-6"  
          >  
            <motion.p className="text-sm italic text-green-400">  
              🧠 Analyse IA en cours...  
            </motion.p>  

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
              {/* Input for exact phrase */}  
              <div>  
                <label htmlFor="exactPhrase" className="block text-sm mb-1">  
                  <motion.span {...iconAnimation}>  
                    <Quote className="w-4 h-4 text-purple-500 inline-block mr-1" />  
                  </motion.span>  
                  Expression exacte :  
                </label>  
                <input  
                  type="text"  
                  id="exactPhrase"  
                  name="exactPhrase"  
                  value={filters.exactPhrase}  
                  onChange={handleFilterChange}  
                  placeholder='"recherche exacte"'  
                  className="w-full filter-input"  
                  aria-describedby="exactPhraseHelp"  
                />  
              </div>  

              {/* Input for domain */}  
              <div>  
                <label htmlFor="domain" className="block text-sm mb-1">  
                  <motion.span {...iconAnimation}>  
                    <Globe className="w-4 h-4 text-blue-500 inline-block mr-1" />  
                  </motion.span>  
                  Domaine :  
                </label>  
                <input  
                  type="text"  
                  id="domain"  
                  name="domain"  
                  value={filters.domain}  
                  onChange={handleFilterChange}  
                  placeholder="exemple.com"  
                  className="w-full filter-input"  
                />  
              </div>  

              {/* Select for file type */}  
              <div>  
                <label htmlFor="fileType" className="block text-sm mb-1">  
                  <motion.span {...iconAnimation}>  
                    <FileText className="w-4 h-4 text-indigo-500 inline-block mr-1" />  
                  </motion.span>  
                  Type de fichier :  
                </label>  
                <select  
                  id="fileType"  
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

              {/* Select for time range */}  
              <div>  
                <label htmlFor="timeRange" className="block text-sm mb-1">  
                  <motion.span {...iconAnimation}>  
                    <CalendarDays className="w-4 h-4 text-pink-500 inline-block mr-1" />  
                  </motion.span>  
                  Période :  
                </label>  
                <select  
                  id="timeRange"  
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

            {/* Preferences section */}  
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
                  <label htmlFor="language" className="block text-sm mb-1">Langue :</label>  
                  <select  
                    id="language"  
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
                  <label htmlFor="resultsPerPage" className="block text-sm mb-1">Résultats / page :</label>  
                  <select  
                    id="resultsPerPage"  
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
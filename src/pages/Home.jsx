import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Input } from "../ui/input";
import Filters from "../components/Filters";
import SearchResults from "../components/SearchResults";
import AIBadge from "../components/AIBadge";
import Loader from "../ui/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchOperations } from '../hooks/useSearchOperations';
import "../index.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("pertinence");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Posez votre question...");
  const resultsPerPage = 8;

  const { results, isSearching, error, performSearch } = useSearchOperations();

  // Génération optimisée des résultats simulés
  const simulatedResults = useMemo(() => {
    const categories = ['tech', 'science', 'news', 'business', 'sports'];
    const now = Date.now();
    
    return Array.from({ length: 50 }, (_, i) => {
      const randomDays = Math.floor(Math.random() * 30);
      const randomHours = Math.floor(Math.random() * 24);
      const date = new Date(now - randomDays * 86400000 - randomHours * 3600000);
      
      return {
        id: `sim-${i}`,
        title: `${categories[i % categories.length]} - Résultat ${i + 1}`,
        description: `Contenu détaillé pour le résultat ${i + 1} dans la catégorie ${categories[i % categories.length]}.`,
        date: date.toISOString(),
        category: categories[i % categories.length],
        aiScore: parseFloat((0.3 + Math.random() * 0.7).toFixed(2)),
      };
    });
  }, []);

  const sourceResults = results.length > 0 ? results : simulatedResults;

  // Recherche optimisée avec mémoïsation
  const searchedResults = useMemo(() => {
    if (!query.trim()) return sourceResults;
    const queryLower = query.toLowerCase();
    
    return sourceResults.filter(item =>
      item.title.toLowerCase().includes(queryLower) ||
      item.description.toLowerCase().includes(queryLower)
    );
  }, [sourceResults, query]);

  // Tri optimisé avec mémoïsation
  const filteredSortedResults = useMemo(() => {
    const resultsCopy = [...searchedResults];
    
    const sortStrategies = {
      date: (a, b) => new Date(b.date) - new Date(a.date),
      category: (a, b) => a.category.localeCompare(b.category),
      'ia-score': (a, b) => b.aiScore - a.aiScore,
      pertinence: (a, b) => b.aiScore - a.aiScore,
    };

    return resultsCopy.sort(sortStrategies[sortBy] || sortStrategies.pertinence);
  }, [searchedResults, sortBy]);

  // Handlers optimisés
  const handleSearch = useCallback(async (searchQuery) => { 
    try { 
      await performSearch(searchQuery); 
      setPage(1);
    } catch (err) {
      console.error("Search error:", err);
    } 
  }, [performSearch]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    if (!value.trim()) performSearch("");
  }, [performSearch]);

  const handlePageChange = useCallback((newPage) => {
    const totalPages = Math.ceil(filteredSortedResults.length / resultsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [filteredSortedResults.length, resultsPerPage]);

  const handleFilterChange = useCallback((filter) => {
    setSortBy(filter);
    setPage(1);
  }, []);

  // Animation des placeholders
  useEffect(() => {
    const placeholders = [
      "Posez votre question...",
      "Ex : Histoire de l'intelligence artificielle",
      "Recherchez des articles récents...",
      "Tapez un sujet qui vous intéresse"
    ];
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setPlaceholder(placeholders[randomIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          QueryGenius <AIBadge pulse />
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Exploration intelligente, résultats inégalés
        </motion.p>
      </div>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Input
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onSearch={handleSearch}
          loading={isSearching}
          className="w-full py-4 px-6 rounded-xl shadow-md border-0 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-lg"
        />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
        >
          {filtersOpen ? 'Masquer filtres' : 'Afficher filtres'}
        </motion.button>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Filters 
                  activeFilter={sortBy} 
                  onFilterChange={handleFilterChange} 
                  aiEnabled 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="min-h-[400px]">
        {isSearching ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12 space-x-4"
          >
            <Loader size="lg" />
            <p className="text-gray-600 dark:text-gray-300">Recherche en cours...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 space-y-4"
          >
            <p className="text-red-500 font-medium">Erreur lors de la recherche</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch(query)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Réessayer
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm italic text-gray-500 dark:text-gray-400 mb-4"
            >
              {results.length === 0 
                ? 'Affichage de résultats simulés' 
                : `${filteredSortedResults.length} résultat${filteredSortedResults.length !== 1 ? 's' : ''}`
              }
            </motion.p>
            
            <SearchResults 
              results={filteredSortedResults} 
              page={page} 
              setPage={handlePageChange} 
              resultsPerPage={resultsPerPage} 
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "../ui/input";
import Filters from "../components/Filters";
import SearchResults from "../components/SearchResults";
import AIBadge from "../components/AIBadge";
import Loader from "../ui/Loader";
import { motion } from "framer-motion";
import { useSearchOperations } from '../hooks/useSearchOperations';
import "../index.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("pertinence");
  const resultsPerPage = 8;

  const { results, suggestions, isSearching, error, performSearch, updateSuggestions } = useSearchOperations();

  // Filtrage et tri des résultats
  const filteredResults = useMemo(() => {
    let sortedResults = [...results];
    switch (sortBy) {
      case "date":
        sortedResults.sort((a, b) => b.date - a.date);
        break;
      case "category":
        sortedResults.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "ia-score":
        sortedResults.sort((a, b) => b.aiScore - a.aiScore);
        break;
      default:
        sortedResults.sort((a, b) =>
          query ? (b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : -1) : b.aiScore - a.aiScore
        );
    }
    return sortedResults;
  }, [query, sortBy, results]);

  // Suggestions basées sur la requête
  useEffect(() => {
    if (query.length > 2) {
      updateSuggestions(query);
    }
  }, [query, updateSuggestions]);

  // Gestion de la recherche
  const handleSearchChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1); // Réinitialiser la page lors d'un changement de recherche
    if (newQuery.length > 2) {
      try {
        await performSearch(newQuery); // Appel de la fonction performSearch
      } catch (err) {
        console.error("Erreur lors de la recherche :", err);
      }
    }
  };

  // Gestion de la pagination
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Gestion du changement de filtre
  const handleFilterChange = (criteria) => {
    setSortBy(criteria);
    setPage(1); // Réinitialiser la page lors d'un changement de filtre
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Moteur de Recherche Intelligent
          <AIBadge pulse={true} />
        </h1>
        <p className="hero-subtitle">
          Utilisez la puissance de l'IA pour trouver des réponses précises et pertinentes
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <Input
          placeholder="Posez votre question à l'IA..."
          value={query}
          onChange={handleSearchChange}
          className="ai-search-input"
          aria-label="Barre de recherche"
        />

        <Filters
          activeFilter={sortBy}
          onFilterChange={handleFilterChange}
          aiEnabled={true}
        />
      </div>

      {/* Loader / Error / Search Results */}
      {isSearching ? (
        <motion.div className="loader-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Loader />
          <p className="loader-text">L'IA analyse votre requête...</p>
        </motion.div>
      ) : error ? (
        <div className="error-message">
          <p>Une erreur est survenue lors de la recherche. Veuillez réessayer.</p>
        </div>
      ) : filteredResults.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SearchResults
            results={filteredResults.slice((page - 1) * resultsPerPage, page * resultsPerPage)}
            page={page}
            setPage={handlePageChange}
            resultsPerPage={resultsPerPage}
          />
        </motion.div>
      ) : (
        <div className="no-results">
          <h3>Aucun résultat trouvé pour "{query}"</h3>
          <p>Essayez une autre requête ou consultez nos suggestions :</p>
          <div className="ai-suggestions">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="suggestion-chip"
                aria-label={`Suggestion: ${suggestion}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Précédent
        </button>
        <span>Page {page} sur {Math.ceil(filteredResults.length / resultsPerPage)}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(filteredResults.length / resultsPerPage)}>
          Suivant
        </button>
      </div>
    </div>
  );
}

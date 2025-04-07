import React, { useState, useMemo } from 'react';
import { Input } from "../ui/input";
import Filters from "../components/Filters";
import SearchResults from "../components/SearchResults";
import AIBadge from "../components/AIBadge";
import "../index.css";

const categories = ["Tech", "Science", "Économie", "IA", "Innovation"];
const mockResults = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Résultat ${i + 1} ${categories[i % categories.length]}`,
  description: `Ce résultat démontre la puissance de l'IA dans le domaine ${categories[i % categories.length]}. La technologie utilisée offre des insights révolutionnaires.`,
  date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  category: categories[i % categories.length],
  aiScore: Math.floor(Math.random() * 100),
}));

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("pertinence");
  const resultsPerPage = 8;

  const filteredResults = useMemo(() => {
    const filtered = mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase())
    );

    switch (sortBy) {
      case "date":
        return [...filtered].sort((a, b) => b.date - a.date);
      case "category":
        return [...filtered].sort((a, b) => a.category.localeCompare(b.category));
      case "ia-score":
        return [...filtered].sort((a, b) => b.aiScore - a.aiScore);
      default:
        return filtered.sort((a, b) => 
          query ? 
            (b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : -1) :
            b.aiScore - a.aiScore
        );
    }
  }, [query, sortBy]);

  const handleFilterChange = (criteria) => {
    setPage(1);
    setSortBy(criteria);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Moteur de Recherche Intelligent 
          <AIBadge />
        </h1>
        <p className="hero-subtitle">
          Découvrez la puissance de l'IA dans la recherche d'informations
        </p>
      </div>

      <div className="search-section">
        <Input
          placeholder="Posez votre question à l'IA..."
          value={query}
          onChange={handleSearchChange}
          className="ai-search-input"
        />
        
        <Filters 
          activeFilter={sortBy}
          onFilterChange={handleFilterChange}
          aiEnabled={true}
        />
      </div>

      {filteredResults.length > 0 ? (
        <SearchResults 
          results={filteredResults} 
          page={page} 
          setPage={setPage} 
          resultsPerPage={resultsPerPage} 
        />
      ) : (
        <div className="no-results">
          <h3>Aucun résultat trouvé</h3>
          <p>Essayez une autre requête ou consultez nos suggestions</p>
          <div className="ai-suggestions">
            <button onClick={() => setQuery("Applications de l'IA en 2025")}>
              Applications de l'IA en 2025
            </button>
            <button onClick={() => setQuery("Dernières innovations technologiques")}>
              Dernières innovations technologiques
            </button>
            <button onClick={() => setQuery("Tendances du machine learning")}>
              Tendances du machine learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
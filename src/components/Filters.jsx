import React from 'react';
import { Button } from "../ui/button";

export default function Filters({ activeFilter, onFilterChange, aiEnabled = true }) {
  const filters = [
    { id: "pertinence", label: "Pertinence", icon: "🏆" },
    { id: "date", label: "Date", icon: "📅" },
    { id: "category", label: "Catégorie", icon: "🏷️" },
    { id: "ia-score", label: "Score IA", icon: "🧠" }
  ];

  return (
    <div className="filters-container">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {filters.map(filter => (
          <Button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
            aria-label={`Filtrer par ${filter.label}`}
            aria-pressed={activeFilter === filter.id ? 'true' : 'false'} // Accessibilité améliorée
          >
            <span className="filter-icon">{filter.icon}</span>
            {filter.label}
            {filter.id === "ia-score" && aiEnabled && (
              <span className="ai-indicator"></span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

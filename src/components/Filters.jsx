import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function Filters({ activeFilter, onFilterChange, aiEnabled = true }) {
  const filters = [
    { id: "pertinence", label: "Pertinence", icon: "🏆" },
    { id: "date", label: "Date", icon: "📅" },
    { id: "category", label: "Catégorie", icon: "🏷️" },
    { id: "ia-score", label: "Score IA", icon: "🧠" },
  ];

  return (
    <div className="filters-container w-full mb-6 px-4">
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <Button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              aria-label={`Filtrer par ${filter.label}`}
              aria-pressed={isActive ? "true" : "false"}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border backdrop-blur-md shadow 
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg scale-105"
                    : "bg-white/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-800"
                }`}
            >
              <span className="text-lg">{filter.icon}</span>
              {filter.label}
              {filter.id === "ia-score" && aiEnabled && (
                <motion.span
                  className="ml-1 w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

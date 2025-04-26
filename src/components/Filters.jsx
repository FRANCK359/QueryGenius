import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Filters({ activeFilter, onFilterChange, aiEnabled = true }) {
  // Mémorisation des filtres pour éviter les recréations inutiles
  const filters = useMemo(() => [
    { id: "pertinence", label: "Pertinence", icon: "🏆" },
    { id: "date", label: "Date", icon: "📅" },
    { id: "category", label: "Catégorie", icon: "🏷️" },
    { id: "ia-score", label: "Score IA", icon: "🧠" },
  ], []);

  // Animation config réutilisable
  const animationConfig = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    aiPulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      rotate: [0, 10, -10, 0],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut" 
      }
    },
    activeIndicator: {
      scaleX: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="relative overflow-x-auto py-2 px-1 sm:px-4">
      <div className="flex space-x-1 sm:space-x-2 w-max">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          const isAiFilter = filter.id === "ia-score" && aiEnabled;
          const buttonClasses = `
            relative flex items-center justify-center
            px-3 py-2 sm:px-4 sm:py-2.5
            rounded-full text-sm sm:text-base font-medium
            transition-all duration-300 ease-out
            border border-transparent
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-white/80 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}
            ${isAiFilter ? 'pr-8 sm:pr-10' : ''}
            group
          `;

          return (
            <motion.button
              key={filter.id}
              whileHover={animationConfig.hover}
              whileTap={animationConfig.tap}
              onClick={() => onFilterChange(filter.id)}
              aria-label={`Filtrer par ${filter.label}`}
              aria-pressed={isActive}
              className={buttonClasses}
            >
              {/* Emoji icon */}
              <span className="mr-2 text-base sm:text-lg">
                {filter.icon}
              </span>
              
              {/* Filter label */}
              <span className="whitespace-nowrap">
                {filter.label}
              </span>

              {/* AI Indicator (animated) */}
              {isAiFilter && (
                <motion.span
                  className="absolute right-3 sm:right-4 flex items-center justify-center"
                  animate={animationConfig.aiPulse}
                >
                  <span className={`
                    absolute h-2 w-2 rounded-full
                    ${isActive ? 'bg-white' : 'bg-purple-500'}
                    group-hover:animate-pulse
                  `} />
                  <span className={`
                    absolute h-3 w-3 rounded-full opacity-40
                    ${isActive ? 'bg-white' : 'bg-purple-500'}
                    animate-ping-slow
                  `} />
                </motion.span>
              )}

              {/* Active indicator bar */}
              {isActive && (
                <motion.span 
                  className="absolute -bottom-1 left-1/2 w-4 h-1 bg-blue-400 rounded-full"
                  initial={{ scaleX: 0, x: "-50%" }}
                  animate={animationConfig.activeIndicator}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
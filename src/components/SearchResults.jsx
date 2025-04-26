import { useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Button from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Configuration des types de médias
const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  NONE: 'none'
};

// Options de filtres
const CATEGORY_OPTIONS = [
  { value: "", label: "Toutes catégories" },
  { value: "tech", label: "Tech", icon: "💻" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "news", label: "Actualité", icon: "📰" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "sports", label: "Sports", icon: "🏅" },
];

const DATE_FILTERS = [
  { value: "", label: "Toutes dates" },
  { value: "24h", label: "Dernières 24h" },
  { value: "7j", label: "Derniers 7j" },
  { value: "mois", label: "Ce mois-ci" },
];

const AI_SCORE_FILTERS = [
  { value: "", label: "Tous scores IA" },
  { value: "high", label: "IA ≥ 0.8" },
  { value: "medium", label: "0.5 ≤ IA < 0.8" },
  { value: "low", label: "IA < 0.5" },
];

// Composant pour afficher les médias
const MediaRenderer = ({ mediaUrl, mediaType }) => {
  if (!mediaUrl || mediaType === MEDIA_TYPES.NONE) return null;

  return (
    <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      {mediaType === MEDIA_TYPES.IMAGE ? (
        <img 
          src={mediaUrl} 
          alt="Contenu visuel" 
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => e.target.style.display = 'none'}
        />
      ) : mediaType === MEDIA_TYPES.VIDEO ? (
        <video 
          controls 
          className="w-full h-48 object-cover"
          poster={mediaUrl.thumbnail}
          preload="metadata"
        >
          <source src={mediaUrl.url} type={`video/${mediaUrl.format || 'mp4'}`} />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
      ) : null}
    </div>
  );
};

// Composant SelectFilter réutilisable
const SelectFilter = ({ value, options, onChange, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`px-3 py-2 bg-white dark:bg-zinc-900 text-sm rounded-lg shadow border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition ${className}`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.icon && `${option.icon} `}{option.label}
      </option>
    ))}
  </select>
);

// Composant ResultCard avec support multimédia
const ResultCard = ({ result, index }) => {
  const getCategoryIcon = (category) => {
    const found = CATEGORY_OPTIONS.find(opt => opt.value === category);
    return found ? found.icon : "📁";
  };

  const getMediaType = () => {
    if (result.imageUrl) return MEDIA_TYPES.IMAGE;
    if (result.videoUrl) return MEDIA_TYPES.VIDEO;
    return MEDIA_TYPES.NONE;
  };

  const mediaType = getMediaType();
  const mediaUrl = result.imageUrl || result.videoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="transition-transform duration-200"
    >
      <Card className="h-full overflow-hidden rounded-2xl bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md border border-gray-200 dark:border-zinc-700 shadow hover:shadow-lg flex flex-col">
        <MediaRenderer mediaUrl={mediaUrl} mediaType={mediaType} />
        
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2">
              {result.title}
            </h2>
            <span 
              title={`Score IA : ${result.aiScore.toFixed(2)}`}
              className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            >
              🧠 {result.aiScore.toFixed(2)}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
            {result.description}
          </p>
          
          <div className="mt-auto flex justify-between items-center text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              {new Date(result.date).toLocaleDateString()}
            </span>
            <span 
              title={`Catégorie : ${result.category}`}
              className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
            >
              {getCategoryIcon(result.category)} {result.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Composant PaginationControls
const PaginationControls = ({ currentPage, totalPages, totalResults, onPageChange }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4"
  >
    <div className="flex gap-2">
      <Button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        aria-label="Première page"
      >
        ⏮️
      </Button>
      <Button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Page précédente"
      >
        ◀️
      </Button>
    </div>
    
    <span className="text-gray-700 dark:text-gray-300 text-sm">
      Page {currentPage} sur {totalPages} • {totalResults} résultat{totalResults !== 1 ? "s" : ""}
    </span>
    
    <div className="flex gap-2">
      <Button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Page suivante"
      >
        ▶️
      </Button>
      <Button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        aria-label="Dernière page"
      >
        ⏭️
      </Button>
    </div>
  </motion.div>
);

// Composant principal SearchResults
export default function SearchResults({ results, page, setPage, resultsPerPage }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [aiFilter, setAiFilter] = useState("");

  const filteredResults = useMemo(() => {
    const now = new Date();
    
    return results.filter((result) => {
      // Filtre par catégorie
      if (categoryFilter && result.category !== categoryFilter) return false;
      
      // Filtre par date
      if (dateFilter) {
        const resultDate = new Date(result.date);
        const timeDiff = now - resultDate;
        
        switch (dateFilter) {
          case "24h": 
            if (timeDiff >= 86400000) return false;
            break;
          case "7j": 
            if (timeDiff >= 604800000) return false;
            break;
          case "mois": 
            if (resultDate.getMonth() !== now.getMonth() || 
                resultDate.getFullYear() !== now.getFullYear()) return false;
            break;
          default:
            break;
        }
      }
      
      // Filtre par score IA
      if (aiFilter) {
        const score = result.aiScore;
        
        switch (aiFilter) {
          case "high": 
            if (score < 0.8) return false;
            break;
          case "medium": 
            if (score < 0.5 || score >= 0.8) return false;
            break;
          case "low": 
            if (score >= 0.5) return false;
            break;
          default:
            break;
        }
      }
      
      return true;
    });
  }, [results, categoryFilter, dateFilter, aiFilter]);

  const paginatedResults = useMemo(() => {
    const start = (page - 1) * resultsPerPage;
    return filteredResults.slice(start, start + resultsPerPage);
  }, [filteredResults, page, resultsPerPage]);

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const handleFilterChange = (type, value) => {
    if (type === "category") setCategoryFilter(value);
    if (type === "date") setDateFilter(value);
    if (type === "ai") setAiFilter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 px-4"
      >
        <SelectFilter
          value={categoryFilter}
          options={CATEGORY_OPTIONS}
          onChange={(value) => handleFilterChange("category", value)}
          className="min-w-[180px]"
        />
        
        <SelectFilter
          value={dateFilter}
          options={DATE_FILTERS}
          onChange={(value) => handleFilterChange("date", value)}
          className="min-w-[160px]"
        />
        
        <SelectFilter
          value={aiFilter}
          options={AI_SCORE_FILTERS}
          onChange={(value) => handleFilterChange("ai", value)}
          className="min-w-[180px]"
        />
      </motion.div>

      {/* Résumé des résultats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 text-sm italic text-gray-600 dark:text-gray-400"
      >
        {filteredResults.length} résultat{filteredResults.length !== 1 ? "s" : ""} trouvé{filteredResults.length !== 1 ? "s" : ""}
      </motion.div>

      {/* Liste des résultats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`results-${page}-${categoryFilter}-${dateFilter}-${aiFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"
        >
          {paginatedResults.map((result, index) => (
            <ResultCard 
              key={`${result.id}-${index}`} 
              result={result} 
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          totalResults={filteredResults.length}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
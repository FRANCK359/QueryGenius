import { useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function SearchResults({ results, page, setPage, resultsPerPage }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" })
    );
  }, [results]);

  const filteredResults = useMemo(() => {
    return sortedResults.filter((result) => {
      const matchCategory = categoryFilter ? result.category === categoryFilter : true;
      const matchDate = (() => {
        if (!dateFilter) return true;
        const resultDate = new Date(result.date);
        const now = new Date();
        if (dateFilter === "24h") return now - resultDate < 86400000;
        if (dateFilter === "7j") return now - resultDate < 604800000;
        if (dateFilter === "mois") return resultDate.getMonth() === now.getMonth();
        return true;
      })();
      return matchCategory && matchDate;
    });
  }, [sortedResults, categoryFilter, dateFilter]);

  const paginatedResults = useMemo(() => {
    return filteredResults.slice((page - 1) * resultsPerPage, page * resultsPerPage);
  }, [filteredResults, page, resultsPerPage]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "tech": return "💻";
      case "science": return "🔬";
      case "news": return "📰";
      default: return "📁";
    }
  };

  return (
    <>
      {/* Filtres dynamiques IA */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-4">
        <div className="flex gap-3">
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 text-sm rounded-lg shadow border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">Toutes les catégories</option>
            <option value="tech">Technologie</option>
            <option value="science">Science</option>
            <option value="news">Actualité</option>
          </select>

          <select
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 text-sm rounded-lg shadow border border-gray-300 dark:border-gray-600 focus:outline-none"
          >
            <option value="">Toutes les dates</option>
            <option value="24h">Dernières 24h</option>
            <option value="7j">Derniers 7 jours</option>
            <option value="mois">Ce mois-ci</option>
          </select>
        </div>
      </div>

      {/* Résultats IA stylisés */}
      <motion.div
        key="search-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"
      >
        {paginatedResults.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 20px rgba(0,200,255,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="transition-all"
          >
            <Card className="relative overflow-hidden p-5 rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(180,120,255,0.3)]">
              {/* Effet IA lumineux */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-pulse pointer-events-none" />
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.title}
                  </h2>
                  <motion.span
                    initial={{ opacity: 0.8, scale: 0.9 }}
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      scale: [0.9, 1.1, 0.9],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 px-2 py-0.5 rounded-full shadow"
                  >
                    🧠 IA
                  </motion.span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                  {result.description}
                </p>
                <div className="text-xs flex justify-between text-gray-500 dark:text-gray-400">
                  <span>📅 {new Date(result.date).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                    {getCategoryIcon(result.category)} {result.category}
                  </span>
                </div>
                {result.iaScore && (
                  <div className="text-xs mt-2 text-right text-purple-600 dark:text-purple-300 italic">
                    🔍 Score IA : {result.iaScore.toFixed(2)} / 1.0
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination dynamique */}
      {filteredResults.length > resultsPerPage && (
        <div className="pagination mt-10 mb-6 flex justify-center items-center gap-4">
          <Button
            aria-label="Première page"
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            ⏮️ Première
          </Button>
          <Button
            aria-label="Précédent"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            ◀️ Précédent
          </Button>
          <span className="mx-4 text-lg font-medium text-gray-800 dark:text-gray-200">
            Page {page} / {Math.ceil(filteredResults.length / resultsPerPage)} ({filteredResults.length} résultats)
          </span>
          <Button
            aria-label="Suivant"
            disabled={page * resultsPerPage >= filteredResults.length}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Suivant ▶️
          </Button>
          <Button
            aria-label="Dernière page"
            disabled={page === Math.ceil(filteredResults.length / resultsPerPage)}
            onClick={() => setPage(Math.ceil(filteredResults.length / resultsPerPage))}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Dernière ⏭️
          </Button>
        </div>
      )}
    </>
  );
}

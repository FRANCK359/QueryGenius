import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function SearchResults({ results, page, setPage, resultsPerPage }) {
  // Tri correct par titre en ordre alphanumérique
  const sortedResults = [...results].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" })
  );

  // Découpage des résultats paginés
  const paginatedResults = sortedResults.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  return (
    <>
      {/* Résultats */}
      <motion.div
        key="search-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"
      >
        {paginatedResults.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 16px rgba(0, 200, 255, 0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="transition-all"
          >
            <Card className="p-5 shadow-md hover:shadow-2xl transform transition duration-300 rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.title}
                  </h2>
                  <span className="text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 px-2 py-0.5 rounded-full shadow-sm">
                    🧠 IA
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                  {result.description}
                </p>
                <div className="text-xs flex justify-between text-gray-500 dark:text-gray-400">
                  <span>📅 {new Date(result.date).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                    {result.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {results.length > resultsPerPage && (
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
            Page {page} / {Math.ceil(results.length / resultsPerPage)} ({results.length} résultats)
          </span>
          <Button
            aria-label="Suivant"
            disabled={page * resultsPerPage >= results.length}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Suivant ▶️
          </Button>
          <Button
            aria-label="Dernière page"
            disabled={page === Math.ceil(results.length / resultsPerPage)}
            onClick={() => setPage(Math.ceil(results.length / resultsPerPage))}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Dernière ⏭️
          </Button>
        </div>
      )}
    </>
  );
}

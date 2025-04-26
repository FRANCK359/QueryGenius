import React from 'react';
import { motion } from 'framer-motion';
import AIBadge from "../components/AIBadge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2, 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] // Courbe de bézier personnalisée
    }
  }),
};

export default function Terms() {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div
      className="min-h-screen py-16 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="w-full max-w-4xl backdrop-blur-xl bg-white/90 dark:bg-gray-800/95 border-2 border-white/40 dark:border-gray-600/40 shadow-2xl rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden"
        variants={fadeIn}
        custom={0}
      >
        {/* Effet de particules légales */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-300/20 dark:bg-purple-400/20"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                opacity: 0
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div className="text-center space-y-4" variants={fadeIn} custom={1}>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Conditions d'Utilisation <AIBadge small className="inline-block align-middle" />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono tracking-wider border border-gray-200 dark:border-gray-700 rounded-full py-1 px-4 inline-block">
            Version effective au : {currentDate}
          </p>
          
          {/* Séparateur juridique animé */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-indigo-400/50 mx-auto w-3/4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          />
        </motion.div>

        <motion.div className="space-y-8 text-lg leading-relaxed" initial="hidden" animate="visible">
          <motion.section variants={fadeIn} custom={2} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 group-hover:bg-indigo-500 transition-colors text-white text-sm font-bold">1</span>
              <span>Acceptation des Conditions</span>
            </motion.h2>
            <p className="pl-8">
              L'utilisation de notre moteur de recherche IA implique l'acceptation pleine et entière des présentes conditions.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} custom={3} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 group-hover:bg-indigo-500 transition-colors text-white text-sm font-bold">2</span>
              <span>Service Fourni</span>
            </motion.h2>
            <p className="mb-3 pl-8">Nous offrons un service de recherche intelligent qui :</p>
            <ul className="space-y-2 pl-8">
              {[
                "Analyse sémantique des requêtes",
                "Fournit des résultats contextuels",
                "S'améliore continuellement grâce au machine learning"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 before:content-['•'] before:text-blue-500 before:text-xl before:font-bold"
                  custom={i + 3.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={4} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 group-hover:bg-indigo-500 transition-colors text-white text-sm font-bold">3</span>
              <span>Restrictions</span>
            </motion.h2>
            <p className="mb-3 pl-8">Il est interdit d'utiliser notre service pour :</p>
            <ul className="space-y-2 pl-8">
              {[
                "Collecte automatisée massive (scraping)",
                "Requêtes illégales ou contraires à l'éthique",
                "Toute activité nuisible à l'infrastructure"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 before:content-['•'] before:text-red-500 before:text-xl before:font-bold"
                  custom={i + 4.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4 p-4 rounded-xl bg-red-100/30 dark:bg-red-900/20 border-2 border-red-200/50 dark:border-red-800/50 text-sm backdrop-blur-sm shadow-inner"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                bounce: 0.5
              }}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 text-red-600 dark:text-red-400 text-xl">⚠️</div>
                <div>
                  <h4 className="font-bold text-red-700 dark:text-red-300 mb-1">Détection Automatique par IA</h4>
                  <p className="text-red-800 dark:text-red-200">
                    Notre système identifie et bloque automatiquement les usages abusifs grâce à des algorithmes de détection d'anomalies.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section variants={fadeIn} custom={5} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 group-hover:bg-indigo-500 transition-colors text-white text-sm font-bold">4</span>
              <span>Propriété Intellectuelle</span>
            </motion.h2>
            <p className="pl-8">
              Les algorithmes d'IA, modèles de langage et interface sont notre propriété exclusive. L'accès à l'API est soumis à autorisation.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} custom={6} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 group-hover:bg-indigo-500 transition-colors text-white text-sm font-bold">5</span>
              <span>Limitations de Responsabilité</span>
            </motion.h2>
            <p className="mb-3 pl-8">Notre IA fournit des résultats basés sur des probabilités. Nous ne garantissons pas :</p>
            <ul className="space-y-2 pl-8">
              {[
                "L'exactitude absolue des résultats",
                "L'exhaustivité de l'indexation",
                "La disponibilité continue du service"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 before:content-['•'] before:text-yellow-500 before:text-xl before:font-bold"
                  custom={i + 6.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.div
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10 dark:from-blue-300/10 dark:via-indigo-300/10 dark:to-purple-300/10 border-2 border-blue-300/30 dark:border-indigo-400/30 shadow-lg relative overflow-hidden"
            variants={fadeIn}
            custom={7}
            whileHover={{ 
              scale: 1.01,
              boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.1)'
            }}
          >
            {/* Effet de gradient animé */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📜</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Transparence Algorithmique
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Nous nous engageons à documenter les principaux mécanismes de notre IA. Consultez notre{" "}
                    <motion.a 
                      href="/ai-ethics" 
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center gap-1"
                      whileHover={{ x: 3 }}
                    >
                      charte éthique
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </motion.a>{" "}
                    pour plus de détails.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
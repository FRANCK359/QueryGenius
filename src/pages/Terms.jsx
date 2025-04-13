import React from 'react';
import { motion } from 'framer-motion';
import AIBadge from "../components/AIBadge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

export default function Terms() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <motion.div
      className="min-h-screen py-16 px-6 flex flex-col items-center justify-center bg-transparent text-gray-900 dark:text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="w-full max-w-4xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-xl rounded-2xl p-8 space-y-8"
        variants={fadeIn}
        custom={0}
      >
        <motion.div className="text-center space-y-2" variants={fadeIn} custom={1}>
          <h1 className="text-3xl md:text-4xl font-bold">
            Conditions d'Utilisation <AIBadge small />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Version effective au : {currentDate}
          </p>
        </motion.div>

        <motion.div className="space-y-6 text-lg leading-relaxed" initial="hidden" animate="visible">
          <motion.section variants={fadeIn} custom={2}>
            <h2 className="text-2xl font-semibold mb-2">1. Acceptation des Conditions</h2>
            <p>
              L'utilisation de notre moteur de recherche IA implique l'acceptation pleine et entière des présentes conditions.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} custom={3}>
            <h2 className="text-2xl font-semibold mb-2">2. Service Fourni</h2>
            <p>Nous offrons un service de recherche intelligent qui :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Analyse sémantique des requêtes</li>
              <li>Fournit des résultats contextuels</li>
              <li>S'améliore continuellement grâce au machine learning</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={4}>
            <h2 className="text-2xl font-semibold mb-2">3. Restrictions</h2>
            <p>Il est interdit d'utiliser notre service pour :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Collecte automatisée massive (scraping)</li>
              <li>Requêtes illégales ou contraires à l'éthique</li>
              <li>Toute activité nuisible à l'infrastructure</li>
            </ul>
            <motion.div
              className="mt-4 p-4 rounded-xl bg-red-100/20 dark:bg-red-400/10 border border-red-300/20 dark:border-red-500/30 text-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">⚠️ Détection Automatique par IA</h4>
              <p>
                Notre système identifie et bloque automatiquement les usages abusifs grâce à des algorithmes de détection d'anomalies.
              </p>
            </motion.div>
          </motion.section>

          <motion.section variants={fadeIn} custom={5}>
            <h2 className="text-2xl font-semibold mb-2">4. Propriété Intellectuelle</h2>
            <p>
              Les algorithmes d'IA, modèles de langage et interface sont notre propriété exclusive. L'accès à l'API est soumis à autorisation.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} custom={6}>
            <h2 className="text-2xl font-semibold mb-2">5. Limitations de Responsabilité</h2>
            <p>Notre IA fournit des résultats basés sur des probabilités. Nous ne garantissons pas :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>L'exactitude absolue des résultats</li>
              <li>L'exhaustivité de l'indexation</li>
              <li>La disponibilité continue du service</li>
            </ul>
          </motion.section>

          <motion.div
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-400/10 to-purple-500/10 dark:from-blue-300/10 dark:to-purple-300/10 border border-blue-300/20 dark:border-purple-400/20"
            variants={fadeIn}
            custom={7}
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold mb-2">📜 Transparence Algorithmique</h3>
            <p>
              Nous nous engageons à documenter les principaux mécanismes de notre IA. Consultez notre{" "}
              <a href="/ai-ethics" className="text-indigo-500 hover:underline">charte éthique</a> pour plus de détails.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

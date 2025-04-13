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

export default function Privacy() {
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
            Politique de Confidentialité <AIBadge small />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : {currentDate}
          </p>
        </motion.div>

        <motion.div className="space-y-6 text-lg leading-relaxed" initial="hidden" animate="visible">
          <motion.section variants={fadeIn} custom={2}>
            <h2 className="text-2xl font-semibold mb-2">1. Collecte des Données</h2>
            <p className="mb-2">Notre moteur de recherche IA collecte les données suivantes :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Requêtes de recherche pour améliorer nos algorithmes</li>
              <li>Métadonnées anonymes (type d'appareil, navigateur)</li>
              <li>Interactions avec les résultats (clics, temps de consultation)</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={3}>
            <h2 className="text-2xl font-semibold mb-2">2. Utilisation des Données</h2>
            <p className="mb-2">Les données collectées servent exclusivement à :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Améliorer la pertinence des résultats de recherche</li>
              <li>Personnaliser l'expérience utilisateur</li>
              <li>Développer de nouvelles fonctionnalités IA</li>
            </ul>
            <motion.div
              className="mt-4 p-4 rounded-xl bg-indigo-100/20 dark:bg-indigo-400/10 border border-indigo-300/20 dark:border-indigo-500/30 text-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <strong>Note IA :</strong> Vos requêtes sont analysées par notre système mais jamais associées à votre identité.
            </motion.div>
          </motion.section>

          <motion.section variants={fadeIn} custom={4}>
            <h2 className="text-2xl font-semibold mb-2">3. Protection des Données</h2>
            <p className="mb-2">Nous utilisons des mesures de sécurité avancées :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Chiffrement AES-256 pour toutes les données</li>
              <li>Anonymisation systématique après 30 jours</li>
              <li>Serveurs sécurisés en Europe</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={5}>
            <h2 className="text-2xl font-semibold mb-2">4. Vos Droits</h2>
            <p className="mb-2">Conformément au RGPD, vous pouvez :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Demander l'accès à vos données</li>
              <li>Exiger leur rectification</li>
              <li>Demander leur suppression</li>
            </ul>
            <p className="mt-2">
              Contactez notre DPO à :{" "}
              <motion.a
                href="mailto:dpo@moteuria.com"
                className="text-indigo-500 hover:underline"
                whileHover={{ scale: 1.05, color: "#7c3aed" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                dpo@moteuria.com
              </motion.a>
            </p>
          </motion.section>

          <motion.div
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-400/10 to-purple-500/10 dark:from-indigo-300/10 dark:to-purple-300/10 border border-indigo-300/20 dark:border-purple-400/20"
            variants={fadeIn}
            custom={6}
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold mb-2">🤖 Engagement Éthique de Notre IA</h3>
            <p>
              Notre système est conçu pour respecter la vie privée par conception. Les modèles d'IA sont entraînés sur des données agrégées et ne conservent pas de traces individuelles.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

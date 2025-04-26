import React from "react";
import AIBadge from "../components/AIBadge";
import { motion } from "framer-motion"; // Retrait de AnimatePresence inutilisé

export default function About() {
  const techFeatures = [
    {
      title: "NLP Avancé",
      description: "Compréhension contextuelle des requêtes en langage naturel avec des modèles de pointe",
      icon: "💬",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Deep Learning",
      description: "Réseaux neuronaux profonds pour l'analyse des patterns et des intentions de recherche",
      icon: "🧠",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Big Data",
      description: "Traitement de milliards de points de données en temps réel avec Elasticsearch",
      icon: "📊",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Scraping Intelligent",
      description: "Collecte de données respectueuse et efficace avec analyse sémantique intégrée",
      icon: "🕷️",
      color: "from-amber-400 to-amber-600"
    },
  ];

  const teamPrinciples = [
    {
      icon: "🌐",
      title: "Analyse Multilingue",
      desc: "Support pour 15 langues avec détection automatique",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
    },
    {
      icon: "🔒",
      title: "Respect de la Vie Privée",
      desc: "Données chiffrées et politiques strictes de confidentialité",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
    },
    {
      icon: "🔄",
      title: "Apprentissage Continu",
      desc: "Le système s'améliore avec chaque interaction",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              À Propos de Notre Moteur IA
            </h1>
            <AIBadge pulse />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une révolution dans la façon dont vous interagissez avec l'information
          </p>
          <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* Vision Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Notre Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Nous croyons en un futur où la recherche d'information est intuitive, précise et adaptative.
                Notre moteur IA ne se contente pas de trouver des mots-clés, il comprend le contexte profond
                de vos requêtes pour fournir des réponses véritablement pertinentes.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "99.7%", label: "Précision", color: "bg-blue-500" },
                { number: "50ms", label: "Rapidité", color: "bg-purple-500" },
                { number: "10M+", label: "Sources", color: "bg-green-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`${stat.color} text-white p-4 rounded-xl shadow-lg text-center`}
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Technologies Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Technologies Clés</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${tech.color} text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                <p className="text-sm opacity-90">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Notre Équipe IA</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
            Une équipe pluridisciplinaire d'experts en intelligence artificielle, linguistique computationnelle
            et expérience utilisateur, dédiée à repousser les limites de la recherche intelligente.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {teamPrinciples.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`${item.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-all`}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Ethics Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Éthique & Transparence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Nous nous engageons à développer une IA responsable. Notre moteur suit des principes stricts
                d'équité, de transparence et de respect des droits d'auteur.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Éthique IA", "RGPD Compliant", "Open Algorithm"].map((badge, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
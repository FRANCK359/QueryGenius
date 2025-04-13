import React from "react";
import AIBadge from "../components/AIBadge";
import { motion } from "framer-motion";

export default function About() {
  const techFeatures = [
    {
      title: "NLP Avancé",
      description: "Compréhension contextuelle des requêtes en langage naturel avec des modèles de pointe",
      icon: "💬",
    },
    {
      title: "Deep Learning",
      description: "Réseaux neuronaux profonds pour l'analyse des patterns et des intentions de recherche",
      icon: "🧠",
    },
    {
      title: "Big Data",
      description: "Traitement de milliards de points de données en temps réel avec Elasticsearch",
      icon: "📊",
    },
    {
      title: "Scraping Intelligent",
      description: "Collecte de données respectueuse et efficace avec analyse sémantique intégrée",
      icon: "🕷️",
    },
  ];

  return (
    <div className="w-full px-6 py-12 md:px-16 lg:px-32 text-gray-800 dark:text-gray-100">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          À Propos de Notre Moteur IA <AIBadge small={true} />
        </h1>
        <p className="text-lg mt-4">
          Une révolution dans la façon dont vous interagissez avec l'information
        </p>
        <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
      </motion.div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Notre Vision</h2>
        <p className="mb-6 max-w-3xl text-justify">
          Nous croyons en un futur où la recherche d'information est intuitive, précise et adaptative.
          Notre moteur IA ne se contente pas de trouver des mots-clés, il comprend le contexte profond
          de vos requêtes pour fournir des réponses véritablement pertinentes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "99.7%", label: "Précision contextuelle" },
            { number: "50ms", label: "Temps moyen de réponse" },
            { number: "10M+", label: "Sources indexées" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 dark:bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold text-blue-500 dark:text-purple-400">{stat.number}</div>
              <div className="mt-2 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Technologies Clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techFeatures.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white/10 to-gray-900/10 dark:from-gray-800/30 dark:to-black/30 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-3xl mb-2">{tech.icon}</div>
              <h3 className="font-semibold text-lg">{tech.title}</h3>
              <p className="text-sm mt-2">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Notre Équipe IA</h2>
        <p className="mb-6">
          Une équipe pluridisciplinaire d'experts en intelligence artificielle, linguistique computationnelle
          et expérience utilisateur, dédiée à repousser les limites de la recherche intelligente.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "🌐",
              title: "Analyse Multilingue",
              desc: "Support pour 15 langues avec détection automatique",
            },
            {
              icon: "🔒",
              title: "Respect de la Vie Privée",
              desc: "Données chiffrées et politiques strictes de confidentialité",
            },
            {
              icon: "🔄",
              title: "Apprentissage Continu",
              desc: "Le système s'améliore avec chaque interaction",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-5 rounded-lg border border-white/10 shadow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Éthique & Transparence</h2>
        <p className="mb-4 max-w-2xl">
          Nous nous engageons à développer une IA responsable. Notre moteur suit des principes stricts
          d'équité, de transparence et de respect des droits d'auteur.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Éthique IA", "RGPD Compliant", "Open Algorithm"].map((badge, i) => (
            <motion.span
              key={i}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </section>
    </div>
  );
}

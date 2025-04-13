import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export default function Faq() {
  const { darkMode } = useTheme();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Comment fonctionne le moteur de recherche IA ?",
      answer: "Notre IA utilise des algorithmes de NLP (Natural Language Processing) pour comprendre l'intention derrière vos requêtes et fournir des résultats pertinents.",
    },
    {
      id: 2,
      question: "Est-ce que mes recherches sont stockées ?",
      answer: "Nous conservons temporairement les requêtes pour améliorer nos services, mais toutes les données sont anonymisées après 30 jours.",
    },
    {
      id: 3,
      question: "Comment puis-je accéder à l'API ?",
      answer: "Visitez notre page API pour obtenir une clé et consulter la documentation technique complète.",
    },
    {
      id: 4,
      question: "L'utilisation est-elle gratuite ?",
      answer: "Oui, notre moteur de recherche est entièrement gratuit pour les utilisateurs individuels. Nous proposons des plans payants pour les usages professionnels.",
    },
  ];

  return (
    <div className={`min-h-screen px-4 md:px-16 py-12 flex flex-col gap-10 ${darkMode ? 'bg-black/60 text-white' : 'bg-white/50 text-gray-900'} backdrop-blur-lg`}>
      
      {/* En-tête */}
      <div className="text-center">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <FaRobot className="text-purple-500 animate-pulse" />
          Foire Aux Questions <AIBadge small />
        </h1>
        <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">Trouvez des réponses à vos questions sur notre moteur de recherche intelligent</p>
      </div>

      {/* Contenu FAQ */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
        {questions.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveQuestion(activeQuestion === item.id ? null : item.id)}
            className={`p-5 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out border backdrop-blur-md ${
              activeQuestion === item.id
                ? 'bg-gradient-to-br from-purple-600/20 to-indigo-500/20 border-purple-500'
                : 'bg-white/40 dark:bg-black/30 border-gray-200 dark:border-gray-700'
            }`}
            role="button"
            tabIndex={0}
            aria-expanded={activeQuestion === item.id}
            aria-controls={`faq-answer-${item.id}`}
            aria-labelledby={`faq-question-${item.id}`}
          >
            <div className="flex justify-between items-center" id={`faq-question-${item.id}`}>
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <span className="text-xl text-purple-500 font-bold">
                {activeQuestion === item.id ? '−' : '+'}
              </span>
            </div>
            <motion.div
              id={`faq-answer-${item.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: activeQuestion === item.id ? 1 : 0,
                height: activeQuestion === item.id ? 'auto' : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="overflow-hidden mt-2 text-base text-gray-700 dark:text-gray-200"
            >
              {activeQuestion === item.id && <p>{item.answer}</p>}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Section contact */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Vous ne trouvez pas de réponse ?</h3>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Notre équipe IA est là pour vous aider.{' '}
          <a href="/contact" className="text-indigo-600 dark:text-indigo-300 hover:underline">Contactez-nous</a> pour toute question supplémentaire.
        </p>
      </div>
    </div>
  );
}

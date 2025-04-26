import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Faq() {
  const { darkMode } = useTheme();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Comment fonctionne le moteur de recherche IA ?",
      answer: "Notre IA utilise des algorithmes avancés de NLP (Natural Language Processing) et de machine learning pour comprendre le contexte et l'intention derrière vos requêtes, fournissant des résultats plus pertinents que les moteurs de recherche traditionnels.",
      icon: "🤖"
    },
    {
      id: 2,
      question: "Est-ce que mes recherches sont stockées ?",
      answer: "Nous conservons temporairement les requêtes pendant 30 jours pour améliorer nos services, mais toutes les données sont anonymisées et cryptées. Vous pouvez supprimer votre historique à tout moment.",
      icon: "🔒"
    },
    {
      id: 3,
      question: "Comment puis-je accéder à l'API ?",
      answer: "Rendez-vous sur notre portail développeurs pour obtenir une clé API gratuite et accéder à notre documentation complète avec des exemples de code pour plusieurs langages de programmation.",
      icon: "💻"
    },
    {
      id: 4,
      question: "L'utilisation est-elle gratuite ?",
      answer: "Notre service de base est entièrement gratuit avec une limite généreuse. Nous proposons des abonnements professionnels avec des fonctionnalités avancées pour les entreprises et les gros volumes.",
      icon: "💰"
    },
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className={`min-h-screen px-4 py-16 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <FaRobot className="text-4xl text-purple-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              FAQ Intelligente
            </h1>
            <AIBadge pulse className="scale-90" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trouvez des réponses à vos questions sur notre moteur de recherche révolutionnaire
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {questions.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className={`w-full flex items-center justify-between p-6 text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                aria-expanded={activeQuestion === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                </div>
                {activeQuestion === item.id ? (
                  <FaChevronUp className="text-purple-500" />
                ) : (
                  <FaChevronDown className="text-purple-500" />
                )}
              </button>

              <AnimatePresence>
                {activeQuestion === item.id && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}
                  >
                    <div className="p-6 pt-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-16 p-8 rounded-2xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            Vous ne trouvez pas de réponse ?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Notre équipe d'assistance IA est disponible 24/7 pour répondre à vos questions.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            Contactez notre support
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
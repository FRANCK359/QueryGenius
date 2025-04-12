import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion'; // Ajout de framer-motion

export default function Faq() {
  const { darkMode } = useTheme();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Comment fonctionne le moteur de recherche IA ?",
      answer: "Notre IA utilise des algorithmes de NLP (Natural Language Processing) pour comprendre l'intention derrière vos requêtes et fournir des résultats pertinents."
    },
    {
      id: 2,
      question: "Est-ce que mes recherches sont stockées ?",
      answer: "Nous conservons temporairement les requêtes pour améliorer nos services, mais toutes les données sont anonymisées après 30 jours."
    },
    {
      id: 3,
      question: "Comment puis-je accéder à l'API ?",
      answer: "Visitez notre page API pour obtenir une clé et consulter la documentation technique complète."
    },
    {
      id: 4,
      question: "L'utilisation est-elle gratuite ?",
      answer: "Oui, notre moteur de recherche est entièrement gratuit pour les utilisateurs individuels. Nous proposons des plans payants pour les usages professionnels."
    }
  ];

  return (
    <div className={`faq-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="faq-header">
        <h1>Foire Aux Questions <AIBadge small /></h1>
        <p>Trouvez des réponses à vos questions sur notre moteur de recherche intelligent</p>
      </div>

      <div className="faq-content">
        {questions.map(item => (
          <div 
            key={item.id} 
            className={`faq-item ${activeQuestion === item.id ? 'active' : ''}`}
            onClick={() => setActiveQuestion(activeQuestion === item.id ? null : item.id)}
            role="button" // Ajout du rôle pour l'accessibilité
            aria-expanded={activeQuestion === item.id} // Accessibilité
            aria-controls={`faq-answer-${item.id}`} // Accessibilité
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="toggle-icon">
                {activeQuestion === item.id ? '−' : '+'}
              </span>
            </div>
            <motion.div 
              id={`faq-answer-${item.id}`} 
              className="faq-answer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: activeQuestion === item.id ? 1 : 0, height: activeQuestion === item.id ? 'auto' : 0 }}
              transition={{ duration: 0.3 }} // Animation douce
            >
              {activeQuestion === item.id && <p>{item.answer}</p>}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <h3>Vous ne trouvez pas de réponse ?</h3>
        <p>
          Notre équipe IA est là pour vous aider. <a href="/contact">Contactez-nous</a> pour toute question supplémentaire.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function PolitiqueCookies() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('necessaires');
  const [preferences, setPreferences] = useState({
    necessaires: true,
    performance: true,
    analytics: true,
  });

  const cookieTypes = [
    {
      id: 'necessaires',
      name: 'Cookies Nécessaires',
      description: 'Essentiels au fonctionnement du moteur de recherche',
    },
    {
      id: 'performance',
      name: 'Cookies de Performance',
      description: 'Améliorent l\'expérience utilisateur',
    },
    {
      id: 'analytics',
      name: 'Cookies Analytiques',
      description: 'Nous aident à améliorer nos services IA',
    },
  ];

  const handleCheckboxChange = (cookieType) => {
    setPreferences((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType],
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Préférences enregistrées!');
  };

  return (
    <div className={`min-h-screen px-6 md:px-12 py-10 backdrop-blur-md ${darkMode ? 'bg-black/60' : 'bg-white/60'}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Politique de Cookies <AIBadge small />
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            Gestion des traceurs utilisés sur notre plateforme IA
          </p>
        </div>

        {/* Onglets */}
        <div className="flex flex-wrap justify-center gap-4">
          {cookieTypes.map((type) => (
            <button
              key={type.id}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border ${
                activeTab === type.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white'
              }`}
              onClick={() => setActiveTab(type.id)}
              role="tab"
              aria-selected={activeTab === type.id}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet actif */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900/60 p-6 rounded-xl shadow-xl space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {cookieTypes.find((c) => c.id === activeTab)?.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {activeTab === 'necessaires' && (
              <>Ces cookies sont indispensables au fonctionnement de notre moteur de recherche IA. Ils gèrent l'authentification, la sécurité et les préférences de base.</>
            )}
            {activeTab === 'performance' && (
              <>Ces cookies nous aident à optimiser les temps de réponse de notre IA et à mémoriser vos préférences d'affichage.</>
            )}
            {activeTab === 'analytics' && (
              <>Utilisés pour comprendre comment les utilisateurs interagissent avec notre IA, ces cookies nous aident à améliorer nos algorithmes.</>
            )}
          </p>
        </motion.div>

        {/* Préférences utilisateur */}
        <div className="bg-white dark:bg-gray-900/60 p-6 rounded-xl shadow-xl space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Gérer mes préférences</h3>
          <div className="flex flex-col space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked
                readOnly
                className="form-checkbox text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">Cookies Nécessaires (toujours actifs)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.performance}
                onChange={() => handleCheckboxChange('performance')}
                className="form-checkbox text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">Cookies de Performance</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handleCheckboxChange('analytics')}
                className="form-checkbox text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">Cookies Analytiques</span>
            </label>
          </div>

          <button
            onClick={handleSavePreferences}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-all"
          >
            Enregistrer mes préférences
          </button>
        </div>
      </div>
    </div>
  );
}

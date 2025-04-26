import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookieBite, FaLock, FaTachometerAlt, FaChartLine } from 'react-icons/fa';

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
      icon: <FaLock className="text-blue-500" />,
      alwaysActive: true
    },
    {
      id: 'performance',
      name: 'Cookies de Performance',
      description: 'Améliorent l\'expérience utilisateur',
      icon: <FaTachometerAlt className="text-purple-500" />,
      alwaysActive: false
    },
    {
      id: 'analytics',
      name: 'Cookies Analytiques',
      description: 'Nous aident à améliorer nos services IA',
      icon: <FaChartLine className="text-green-500" />,
      alwaysActive: false
    },
  ];

  const handleCheckboxChange = (cookieType) => {
    setPreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    // Animation de confirmation
    const button = document.getElementById('save-btn');
    if (button) {
      button.innerHTML = '✓ Préférences enregistrées';
      setTimeout(() => {
        button.innerHTML = 'Enregistrer mes préférences';
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <FaCookieBite className="text-3xl text-amber-500" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Politique de Cookies
            </h1>
            <AIBadge pulse />
          </div>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {cookieTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === type.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : `${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'} shadow-sm`
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              {type.icon}
              {type.name}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl shadow-lg overflow-hidden mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {cookieTypes.find(c => c.id === activeTab)?.icon}
                <h2 className="text-xl font-semibold">
                  {cookieTypes.find(c => c.id === activeTab)?.name}
                </h2>
              </div>
              <div className="pl-9">
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCookieBite className="text-amber-500" />
              Gérer mes préférences
            </h3>

            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <motion.div 
                  key={type.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <input
                    id={`cookie-${type.id}`}
                    type="checkbox"
                    checked={preferences[type.id]}
                    onChange={() => !type.alwaysActive && handleCheckboxChange(type.id)}
                    disabled={type.alwaysActive}
                    className={`h-5 w-5 rounded ${type.alwaysActive ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'text-blue-600 focus:ring-blue-500'} border-gray-300 dark:border-gray-600`}
                  />
                  <label 
                    htmlFor={`cookie-${type.id}`} 
                    className={`ml-3 block ${type.alwaysActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'} cursor-pointer`}
                  >
                    <span className="font-medium">{type.name}</span>
                    <span className="block text-sm">{type.description}</span>
                  </label>
                </motion.div>
              ))}
            </div>

            <motion.button
              id="save-btn"
              onClick={handleSavePreferences}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Enregistrer mes préférences
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
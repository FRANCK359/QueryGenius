import React from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaServer, FaCopyright, FaShieldAlt, FaRobot } from 'react-icons/fa';

export default function MentionsLegales() {
  const { darkMode } = useTheme();

  const sections = [
    {
      id: 1,
      icon: <FaBalanceScale className="text-2xl text-purple-500" />,
      title: "Éditeur du Site",
      content: (
        <>
          <strong>Moteur de Recherche IA</strong><br />
          Société par actions simplifiée au capital de 100 000 €<br />
          RCS Paris 123 456 789<br />
          Siège social : 123 Rue de l'Innovation, 75001 Paris<br />
          Directeur de la publication : Jean Dupont
        </>
      )
    },
    {
      id: 2,
      icon: <FaServer className="text-2xl text-blue-500" />,
      title: "Hébergement",
      content: (
        <>
          <strong>IA Hosting Solutions</strong><br />
          456 Avenue de la Technologie, 69002 Lyon<br />
          Téléphone : +33 1 23 45 67 89<br />
          Email : <a href="mailto:contact@ia-hosting.com" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">contact@ia-hosting.com</a>
        </>
      )
    },
    {
      id: 3,
      icon: <FaCopyright className="text-2xl text-yellow-500" />,
      title: "Propriété Intellectuelle",
      content: "L'ensemble des contenus (textes, images, algorithmes) de ce site sont protégés par les lois sur la propriété intellectuelle. Notre moteur de recherche IA utilise des technologies brevetées."
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-2xl text-green-500" />,
      title: "Données Personnelles",
      content: (
        <>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
          Contactez notre DPO à : <a href="mailto:dpo@moteuria.com" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">dpo@moteuria.com</a>
        </>
      )
    }
  ];

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Mentions Légales
            </h1>
            <AIBadge pulse />
          </div>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {section.icon}
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {section.title}
                  </h2>
                </div>
                <div className={`pl-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {section.content}
                </div>
              </div>
            </motion.section>
          ))}

          {/* AI Transparency Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-800/30' : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <FaRobot className="text-2xl text-purple-500" />
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Transparence Algorithmique
              </h2>
            </div>
            <p className={`pl-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notre IA suit des principes éthiques stricts. Pour plus d'informations sur nos algorithmes, consultez notre{' '}
              <a 
                href="/transparence" 
                className={`font-medium ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'} transition-colors`}
              >
                charte de transparence
              </a>.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}
        >
          <p>© {new Date().getFullYear()} Moteur de Recherche IA - Tous droits réservés</p>
        </motion.div>
      </div>
    </div>
  );
}
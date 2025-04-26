import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Api() {
  const { darkMode } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endpoints = [
    {
      name: 'Recherche IA',
      path: '/api/v1/search',
      method: 'POST',
      description: 'Effectue une recherche intelligente avec notre moteur IA'
    },
    {
      name: 'Suggestions',
      path: '/api/v1/suggest',
      method: 'GET',
      description: 'Obtenez des suggestions de recherche en temps réel'
    },
    {
      name: 'Analyse de Documents',
      path: '/api/v1/analyze',
      method: 'POST',
      description: 'Soumettez des documents pour analyse sémantique'
    }
  ];

  const handleApiRequest = async (endpoint) => {
    if (!apiKey) {
      setError('Veuillez entrer une clé API valide');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint.path, {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la requête API');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-12 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              API Moteur IA
            </h1>
            <AIBadge pulse />
          </div>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Accédez à la puissance de notre intelligence artificielle via notre API RESTful sécurisée.
          </p>
        </motion.div>

        {/* Auth Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 p-1.5 rounded-lg">
              🔑
            </span>
            Authentification
          </h2>
          
          <div className={`p-4 rounded-lg mb-4 font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-green-800'}`}>
            Authorization: Bearer YOUR_API_KEY
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Entrez votre clé API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={loading}
              className={`w-full p-3 pl-10 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-400' : 'bg-white border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-400/30 transition-all`}
            />
            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-6 6h-3v4h3a8 8 0 008-8V6a8 8 0 00-8-8H6a8 8 0 00-8 8v2a8 8 0 008 8h3v-4H6a6 6 0 01-6-6V6a6 6 0 016-6h6a6 6 0 016 6v2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </motion.section>

        {/* Endpoints Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 p-1.5 rounded-lg">
              ⚡
            </span>
            Endpoints Disponibles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden shadow-md transition-all ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{endpoint.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                      {endpoint.method}
                    </span>
                  </div>
                  
                  <code className={`block text-sm mb-3 p-2 rounded ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-gray-100 text-purple-600'}`}>
                    {endpoint.path}
                  </code>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{endpoint.description}</p>
                  
                  <button
                    onClick={() => handleApiRequest(endpoint)}
                    disabled={loading}
                    className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${loading ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md'}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        En cours...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Tester l'endpoint
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Response Section */}
        {response && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl p-5 shadow-md ${darkMode ? 'bg-gray-800 border border-green-700/50' : 'bg-green-50 border border-green-300'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">Réponse API</h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">
                {response.status || '200 OK'}
              </span>
            </div>
            <pre className={`text-sm p-4 rounded-lg overflow-x-auto ${darkMode ? 'bg-gray-900 text-green-300' : 'bg-white text-green-800'}`}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </motion.section>
        )}

        {/* Error Section */}
        {error && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl p-5 shadow-md ${darkMode ? 'bg-gray-800 border border-red-700/50' : 'bg-red-50 border border-red-300'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Erreur</h2>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-0.5 rounded-full text-xs">
                Échec
              </span>
            </div>
            <div className={`text-sm p-4 rounded-lg ${darkMode ? 'bg-gray-900 text-red-300' : 'bg-white text-red-800'}`}>
              {error}
            </div>
          </motion.section>
        )}

        {/* Rate Limits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 p-1.5 rounded-lg">
              🚦
            </span>
            Limites d'Appel
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Gratuit", desc: "100 req/jour", features: ["Accès basique", "Support communautaire"] },
              { title: "Pro", desc: "5 000 req/jour", features: ["Accès prioritaire", "Support par email"] },
              { title: "Entreprise", desc: "Illimité", features: ["Accès dédié", "Support 24/7"] }
            ].map((tier, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className={`rounded-xl p-5 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} ${i === 1 ? 'ring-2 ring-purple-500/30' : ''}`}
              >
                <h3 className={`text-lg font-bold mb-1 ${i === 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {tier.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{tier.desc}</p>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg className={`h-4 w-4 ${i === 1 ? 'text-purple-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-4 w-full py-2 rounded-lg font-medium ${i === 1 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:opacity-90 transition`}>
                  {i === 0 ? 'Commencer' : i === 1 ? 'Mise à niveau' : 'Nous contacter'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
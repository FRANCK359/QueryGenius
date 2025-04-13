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
      alert('Veuillez entrer une clé API valide.');
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
    <div className={`min-h-screen px-4 py-10 ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            API Moteur IA <AIBadge />
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Accédez à la puissance de notre intelligence artificielle via notre API RESTful.
          </p>
        </div>

        <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Authentification</h2>
          <pre className="bg-black/80 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mb-4">
{`// Header requis
Authorization: Bearer VOTRE_CLE_API
Content-Type: application/json`}
          </pre>
          <input
            type="text"
            placeholder="Entrez votre clé API"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={loading}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Endpoints Disponibles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{endpoint.name}</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {endpoint.method}
                  </span>
                </div>
                <code className="block text-sm text-purple-600 dark:text-purple-400 mb-2">{endpoint.path}</code>
                <p className="text-sm text-gray-600 dark:text-gray-300">{endpoint.description}</p>
                <button
                  onClick={() => handleApiRequest(endpoint)}
                  disabled={loading}
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'En cours...' : 'Essayer'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {response && (
          <section className="bg-green-50 dark:bg-green-900/30 border border-green-400/40 dark:border-green-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Réponse de l'API</h2>
            <pre className="overflow-x-auto text-sm text-green-800 dark:text-green-300 whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </section>
        )}

        {error && (
          <section className="bg-red-50 dark:bg-red-900/30 border border-red-400/40 dark:border-red-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">Erreur</h2>
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Limites d'Appel</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Gratuit", desc: "100 requêtes/jour" },
              { title: "Pro", desc: "5 000 requêtes/jour" },
              { title: "Entreprise", desc: "Limites personnalisées" }
            ].map((tier, i) => (
              <div key={i} className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 p-5 text-center shadow-md">
                <h4 className="text-lg font-bold text-blue-600 dark:text-blue-300">{tier.title}</h4>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

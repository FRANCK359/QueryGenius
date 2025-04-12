import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';

export default function Api() {
  const { darkMode } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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
    try {
      const response = await fetch(endpoint.path, {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Erreur lors de la requête API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`api-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="api-header">
        <h1>API Moteur IA <AIBadge /></h1>
        <p>
          Accédez à la puissance de notre intelligence artificielle via notre API RESTful.
          Documentation complète et exemples d'utilisation.
        </p>
      </div>

      <div className="api-content">
        <section className="authentication">
          <h2>Authentification</h2>
          <div className="code-block">
            <pre>
              <code>
                {`// Header requis
Authorization: Bearer VOTRE_CLE_API
Content-Type: application/json`}
              </code>
            </pre>
            <input
              type="text"
              placeholder="Entrez votre clé API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="api-key-input"
            />
          </div>
        </section>

        <section className="endpoints">
          <h2>Endpoints Disponibles</h2>
          <div className="endpoints-grid">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint-card">
                <div className="method-badge">{endpoint.method}</div>
                <h3>{endpoint.name}</h3>
                <code>{endpoint.path}</code>
                <p>{endpoint.description}</p>
                <button 
                  className="try-button"
                  onClick={() => handleApiRequest(endpoint)}
                  disabled={loading}
                >
                  {loading ? 'En cours...' : 'Essayer'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {response && (
          <section className="api-response">
            <h2>Réponse de l'API</h2>
            <pre>
              <code>{JSON.stringify(response, null, 2)}</code>
            </pre>
          </section>
        )}

        <section className="rate-limiting">
          <h2>Limites d'Appel</h2>
          <div className="limits">
            <div className="limit-tier">
              <h4>Gratuit</h4>
              <p>100 requêtes/jour</p>
            </div>
            <div className="limit-tier">
              <h4>Pro</h4>
              <p>5 000 requêtes/jour</p>
            </div>
            <div className="limit-tier">
              <h4>Entreprise</h4>
              <p>Limites personnalisées</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';
export default function PolitiqueCookies() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('necessaires');

  const cookieTypes = [
    {
      id: 'necessaires',
      name: 'Cookies Nécessaires',
      description: 'Essentiels au fonctionnement du moteur de recherche'
    },
    {
      id: 'performance',
      name: 'Cookies de Performance',
      description: 'Améliorent l\'expérience utilisateur'
    },
    {
      id: 'analytics',
      name: 'Cookies Analytiques',
      description: 'Nous aident à améliorer nos services IA'
    }
  ];

  return (
    <div className={`cookie-policy ${darkMode ? 'dark' : 'light'}`}>
      <div className="policy-header">
        <h1>Politique de Cookies <AIBadge small /></h1>
        <p>Gestion des traceurs utilisés sur notre plateforme IA</p>
      </div>

      <div className="cookie-tabs">
        {cookieTypes.map(type => (
          <button
            key={type.id}
            className={`tab-button ${activeTab === type.id ? 'active' : ''}`}
            onClick={() => setActiveTab(type.id)}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'necessaires' && (
          <div>
            <h3>Cookies Nécessaires</h3>
            <p>
              Ces cookies sont indispensables au fonctionnement de notre moteur de recherche IA.
              Ils gèrent l'authentification, la sécurité et les préférences de base.
            </p>
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <h3>Cookies de Performance</h3>
            <p>
              Ces cookies nous aident à optimiser les temps de réponse de notre IA
              et à mémoriser vos préférences d'affichage.
            </p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h3>Cookies Analytiques</h3>
            <p>
              Utilisés pour comprendre comment les utilisateurs interagissent avec notre IA,
              ces cookies nous aident à améliorer nos algorithmes.
            </p>
          </div>
        )}
      </div>

      <div className="cookie-controls">
        <h3>Préférences</h3>
        <div className="controls-group">
          <label>
            <input type="checkbox" checked readOnly />
            Cookies Nécessaires (toujours actifs)
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Cookies de Performance
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Cookies Analytiques
          </label>
        </div>
        <button className="save-button">
          Enregistrer mes préférences
        </button>
      </div>
    </div>
  );
}
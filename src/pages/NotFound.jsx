import React from 'react';
import { Link } from 'react-router-dom';
import AIBadge from '../components/AIBadge';
import '../index.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Animation 404 */}
        <div className="not-found-animation">
          <div className="error-code">
            <span>4</span>
            <div className="ai-orb">
              <AIBadge small={true} pulse={false} />
            </div>
            <span>4</span>
          </div>
          <div className="ai-particles">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  '--delay': `${i * 0.2}s`,
                  '--size': `${Math.random() * 20 + 10}px`,
                  '--distance': `${Math.random() * 100 + 50}px`,
                  '--angle': `${Math.random() * 360}deg`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Message principal */}
        <h1 className="not-found-title">
          Oups ! Page introuvable
          <AIBadge small={true} />
        </h1>
        
        <p className="not-found-message">
          Notre IA a cherché partout mais n'a pas trouvé ce que vous recherchez.
          <br />
          Peut-être que l'une de ces pages pourrait vous intéresser ?
        </p>

        {/* Suggestions automatiques */}
        <div className="suggestions-grid">
          <Link to="/" className="suggestion-card">
            <div className="suggestion-icon">🏠</div>
            <h3>Page d'Accueil</h3>
            <p>Retour à l'accueil du moteur de recherche</p>
          </Link>
          
          <Link to="/about" className="suggestion-card">
            <div className="suggestion-icon">🤖</div>
            <h3>Notre Technologie</h3>
            <p>Découvrez comment fonctionne notre IA</p>
          </Link>
          
          <Link to="/contact" className="suggestion-card">
            <div className="suggestion-icon">✉️</div>
            <h3>Contactez-nous</h3>
            <p>Signalez un problème ou posez une question</p>
          </Link>
        </div>

        {/* Recherche alternative */}
        <div className="search-fallback">
          <h3>Ou essayez une recherche :</h3>
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Que cherchez-vous ?" 
              className="search-input"
              aria-label="Recherche alternative"
            />
            <button className="ai-search-button">
              <span className="ai-icon">🔍</span> Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
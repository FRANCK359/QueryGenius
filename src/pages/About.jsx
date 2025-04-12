import React from 'react';
import AIBadge from "../components/AIBadge";
import "../index.css";

export default function About() {
  const techFeatures = [
    {
      title: "NLP Avancé",
      description: "Compréhension contextuelle des requêtes en langage naturel avec des modèles de pointe",
      icon: "💬"
    },
    {
      title: "Deep Learning",
      description: "Réseaux neuronaux profonds pour l'analyse des patterns et des intentions de recherche",
      icon: "🧠"
    },
    {
      title: "Big Data",
      description: "Traitement de milliards de points de données en temps réel avec Elasticsearch",
      icon: "📊"
    },
    {
      title: "Scraping Intelligent",
      description: "Collecte de données respectueuse et efficace avec analyse sémantique intégrée",
      icon: "🕷️"
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">
          À Propos de Notre Moteur IA
          <AIBadge small={true} />
        </h1>
        <p className="about-subtitle">
          Une révolution dans la façon dont vous interagissez avec l'information
        </p>
        <div className="ai-animation"></div>
      </div>

      <div className="about-content">
        <section className="about-section vision-section">
          <h2>Notre Vision</h2>
          <p>
            Nous croyons en un futur où la recherche d'information est intuitive, précise et adaptative.
            Notre moteur IA ne se contente pas de trouver des mots-clés, il comprend le contexte profond
            de vos requêtes pour fournir des réponses véritablement pertinentes.
          </p>
          <div className="vision-stats">
            <div className="stat-item">
              <span className="stat-number">99.7%</span>
              <span className="stat-label">Précision contextuelle</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50ms</span>
              <span className="stat-label">Temps moyen de réponse</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Sources indexées</span>
            </div>
          </div>
        </section>

        <section className="about-section tech-section">
          <h2>Technologies Clés</h2>
          <div className="tech-grid">
            {techFeatures.map((tech, index) => (
              <div className="tech-card" key={index}>
                <div className="tech-icon">{tech.icon}</div>
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section team-section">
          <h2>Notre Équipe IA</h2>
          <p>
            Une équipe pluridisciplinaire d'experts en intelligence artificielle, linguistique computationnelle
            et expérience utilisateur, dédiée à repousser les limites de la recherche intelligente.
          </p>
          <div className="team-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">🌐</div>
              <div className="highlight-content">
                <h4>Analyse Multilingue</h4>
                <p>Support pour 15 langues avec détection automatique</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔒</div>
              <div className="highlight-content">
                <h4>Respect de la Vie Privée</h4>
                <p>Données chiffrées et politiques strictes de confidentialité</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔄</div>
              <div className="highlight-content">
                <h4>Apprentissage Continu</h4>
                <p>Le système s'améliore avec chaque interaction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section ethics-section">
          <h2>Éthique & Transparence</h2>
          <p>
            Nous nous engageons à développer une IA responsable. Notre moteur suit des principes stricts
            d'équité, de transparence et de respect des droits d'auteur.
          </p>
          <div className="ethics-badges">
            <span className="ethics-badge">Éthique IA</span>
            <span className="ethics-badge">RGPD Compliant</span>
            <span className="ethics-badge">Open Algorithm</span>
          </div>
        </section>
      </div>
    </div>
  );
}
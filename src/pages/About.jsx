import React from 'react';
import AIBadge from "../components/AIBadge";
import "../index.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">
          À Propos de Notre Technologie
          <AIBadge />
        </h1>
        <div className="ai-animation"></div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Notre Vision</h2>
          <p>
            Créer un moteur de recherche qui comprend l'intention derrière chaque requête,
            pas seulement les mots-clés. Notre IA sémantique analyse le contexte pour
            fournir des résultats pertinents et personnalisés.
          </p>
        </section>

        <section className="about-section">
          <h2>Technologies Clés</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>NLP Avancé</h3>
              <p>Compréhension du langage naturel et traitement sémantique</p>
            </div>
            <div className="tech-card">
              <h3>Deep Learning</h3>
              <p>Réseaux neuronaux pour l'analyse des patterns de recherche</p>
            </div>
            <div className="tech-card">
              <h3>Big Data</h3>
              <p>Analyse de milliards de points de données en temps réel</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Notre Équipe IA</h2>
          <p>
            Composée d'experts en intelligence artificielle, data science et expérience
            utilisateur, notre équipe travaille à repousser les limites de la recherche
            intelligente.
          </p>
          <div className="team-ai">
            <div className="ai-feature">
              <span>🧠</span>
              <p>Algorithmes auto-apprenants</p>
            </div>
            <div className="ai-feature">
              <span>🔍</span>
              <p>Analyse contextuelle</p>
            </div>
            <div className="ai-feature">
              <span>⚡</span>
              <p>Temps de réponse ultra-rapide</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
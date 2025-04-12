import React from 'react';
import AIBadge from "../components/AIBadge";

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Politique de Confidentialité <AIBadge small={true} /></h1>
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>1. Collecte des Données</h2>
          <p>
            Notre moteur de recherche IA collecte les données suivantes :
          </p>
          <ul>
            <li>Requêtes de recherche pour améliorer nos algorithmes</li>
            <li>Métadonnées anonymes (type d'appareil, navigateur)</li>
            <li>Interactions avec les résultats (clics, temps de consultation)</li>
          </ul>
        </section>

        <section>
          <h2>2. Utilisation des Données</h2>
          <p>
            Les données collectées servent exclusivement à :
          </p>
          <ul>
            <li>Améliorer la pertinence des résultats de recherche</li>
            <li>Personnaliser l'expérience utilisateur</li>
            <li>Développer de nouvelles fonctionnalités IA</li>
          </ul>
          <div className="ai-note">
            <strong>Note IA :</strong> Vos requêtes sont analysées par notre système mais jamais associées à votre identité.
          </div>
        </section>

        <section>
          <h2>3. Protection des Données</h2>
          <p>
            Nous utilisons des mesures de sécurité avancées :
          </p>
          <ul>
            <li>Chiffrement AES-256 pour toutes les données</li>
            <li>Anonymisation systématique après 30 jours</li>
            <li>Serveurs sécurisés en Europe</li>
          </ul>
        </section>

        <section>
          <h2>4. Vos Droits</h2>
          <p>
            Conformément au RGPD, vous pouvez :
          </p>
          <ul>
            <li>Demander l'accès à vos données</li>
            <li>Exiger leur rectification</li>
            <li>Demander leur suppression</li>
          </ul>
          <p>
            Contactez notre DPO à : <a href="mailto:dpo@moteuria.com">dpo@moteuria.com</a>
          </p>
        </section>

        <div className="ai-assurance">
          <h3>Engagement Éthique de Notre IA</h3>
          <p>
            Notre système est conçu pour respecter la vie privée par conception. Les modèles d'IA sont entraînés sur des données agrégées et ne conservent pas de traces individuelles.
          </p>
        </div>
      </div>
    </div>
  );
}
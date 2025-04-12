import React from 'react';
import AIBadge from "../components/AIBadge";

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Conditions d'Utilisation <AIBadge small={true} /></h1>
        <p>Version effective au : {new Date().toLocaleDateString()}</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>1. Acceptation des Conditions</h2>
          <p>
            L'utilisation de notre moteur de recherche IA implique l'acceptation pleine et entière des présentes conditions.
          </p>
        </section>

        <section>
          <h2>2. Service Fourni</h2>
          <p>
            Nous offrons un service de recherche intelligent qui :
          </p>
          <ul>
            <li>Analyse sémantique des requêtes</li>
            <li>Fournit des résultats contextuels</li>
            <li>S'améliore continuellement grâce au machine learning</li>
          </ul>
        </section>

        <section>
          <h2>3. Restrictions</h2>
          <p>
            Il est interdit d'utiliser notre service pour :
          </p>
          <ul>
            <li>Collecte automatisée massive (scraping)</li>
            <li>Requêtes illégales ou contraires à l'éthique</li>
            <li>Toute activité nuisible à l'infrastructure</li>
          </ul>
          <div className="ai-detection">
            <h4>Détection Automatique par IA</h4>
            <p>
              Notre système identifie et bloque automatiquement les usages abusifs grâce à des algorithmes de détection d'anomalies.
            </p>
          </div>
        </section>

        <section>
          <h2>4. Propriété Intellectuelle</h2>
          <p>
            Les algorithmes d'IA, modèles de langage et interface sont notre propriété exclusive. L'accès à l'API est soumis à autorisation.
          </p>
        </section>

        <section>
          <h2>5. Limitations de Responsabilité</h2>
          <p>
            Notre IA fournit des résultats basés sur des probabilités. Nous ne garantissons pas :
          </p>
          <ul>
            <li>L'exactitude absolue des résultats</li>
            <li>L'exhaustivité de l'indexation</li>
            <li>La disponibilité continue du service</li>
          </ul>
        </section>

        <div className="ai-transparency">
          <h3>Transparence Algorithmique</h3>
          <p>
            Nous nous engageons à documenter les principaux mécanismes de notre IA. Consultez notre <a href="/ai-ethics">charte éthique</a> pour plus de détails.
          </p>
        </div>
      </div>
    </div>
  );
}
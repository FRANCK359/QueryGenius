import React from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';


export default function MentionsLegales() {
  const { darkMode } = useTheme();

  return (
    <div className={`legal-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="legal-header">
        <h1>Mentions Légales <AIBadge small /></h1>
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>Éditeur du Site</h2>
          <p>
            <strong>Moteur de Recherche IA</strong><br />
            Société par actions simplifiée au capital de 100 000 €<br />
            RCS Paris 123 456 789<br />
            Siège social : 123 Rue de l'Innovation, 75001 Paris<br />
            Directeur de la publication : Jean Dupont
          </p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            <strong>IA Hosting Solutions</strong><br />
            456 Avenue de la Technologie, 69002 Lyon<br />
            Téléphone : +33 1 23 45 67 89<br />
            Email : contact@ia-hosting.com
          </p>
        </section>

        <section>
          <h2>Propriété Intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, images, algorithmes) de ce site sont protégés par les lois sur la propriété intellectuelle.
            Notre moteur de recherche IA utilise des technologies brevetées.
          </p>
        </section>

        <section>
          <h2>Données Personnelles</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
            Contactez notre DPO à : dpo@moteuria.com
          </p>
        </section>

        <div className="ai-disclaimer">
          <h3>Transparence Algorithmique</h3>
          <p>
            Notre IA suit des principes éthiques stricts. Pour plus d'informations sur nos algorithmes, consultez notre <a href="/transparence">page dédiée</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
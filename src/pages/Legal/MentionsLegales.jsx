import React from 'react';
import AIBadge from '../../components/AIBadge';
import { useTheme } from '../../context/ThemeContext';

export default function MentionsLegales() {
  const { darkMode } = useTheme();

  return (
    <div className={`legal-container ${darkMode ? 'dark' : 'light'} backdrop-blur-md p-6 md:p-8`}>
      <div className="legal-header text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Mentions Légales <AIBadge small />
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="legal-content space-y-8">
        {/* Section Éditeur du Site */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-xl backdrop-blur-md shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Éditeur du Site</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            <strong>Moteur de Recherche IA</strong><br />
            Société par actions simplifiée au capital de 100 000 €<br />
            RCS Paris 123 456 789<br />
            Siège social : 123 Rue de l'Innovation, 75001 Paris<br />
            Directeur de la publication : Jean Dupont
          </p>
        </section>

        {/* Section Hébergement */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-xl backdrop-blur-md shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Hébergement</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            <strong>IA Hosting Solutions</strong><br />
            456 Avenue de la Technologie, 69002 Lyon<br />
            Téléphone : +33 1 23 45 67 89<br />
            Email : <a href="mailto:contact@ia-hosting.com" className="text-blue-500 hover:text-blue-700">contact@ia-hosting.com</a>
          </p>
        </section>

        {/* Section Propriété Intellectuelle */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-xl backdrop-blur-md shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Propriété Intellectuelle</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            L'ensemble des contenus (textes, images, algorithmes) de ce site sont protégés par les lois sur la propriété intellectuelle.
            Notre moteur de recherche IA utilise des technologies brevetées.
          </p>
        </section>

        {/* Section Données Personnelles */}
        <section className="bg-white dark:bg-gray-900 p-6 rounded-xl backdrop-blur-md shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Données Personnelles</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
            Contactez notre DPO à : <a href="mailto:dpo@moteuria.com" className="text-blue-500 hover:text-blue-700">dpo@moteuria.com</a>
          </p>
        </section>

        {/* Section Transparence Algorithmique */}
        <div className="ai-disclaimer bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Transparence Algorithmique</h3>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Notre IA suit des principes éthiques stricts. Pour plus d'informations sur nos algorithmes, consultez notre <a href="/transparence" className="text-blue-500 hover:text-blue-700">page dédiée</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import AIBadge from '../components/AIBadge';
import '../index.css';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-center p-6">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Animation 404 */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="text-8xl font-extrabold text-gray-800 dark:text-white flex items-center space-x-2">
            <span>4</span>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <AIBadge small={true} pulse={false} />
            </div>
            <span>4</span>
          </div>

          <div className="absolute inset-0 flex justify-center items-center">
            <div className="ai-particles flex flex-wrap justify-center space-x-2 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="particle w-3 h-3 bg-indigo-400 rounded-full opacity-70"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '4s',
                    animationName: 'particleAnimation',
                    '--size': `${Math.random() * 20 + 10}px`,
                    '--distance': `${Math.random() * 100 + 50}px`,
                    '--angle': `${Math.random() * 360}deg`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Message principal */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Oups ! Page introuvable <AIBadge small={true} />
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          Notre IA a cherché partout mais n'a pas trouvé ce que vous recherchez.
          <br />
          Peut-être que l'une de ces pages pourrait vous intéresser ?
        </p>

        {/* Suggestions automatiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            { to: '/', icon: '🏠', title: "Page d'Accueil", desc: "Retour à l'accueil du moteur de recherche" },
            { to: '/about', icon: '🤖', title: 'Notre Technologie', desc: "Découvrez comment fonctionne notre IA" },
            { to: '/contact', icon: '✉️', title: 'Contactez-nous', desc: "Signalez un problème ou posez une question" },
          ].map(({ to, icon, title, desc }, index) => (
            <Link
              key={index}
              to={to}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/40 backdrop-blur shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 text-white"
            >
              <div className="text-4xl">{icon}</div>
              <h3 className="font-semibold mt-4">{title}</h3>
              <p className="text-sm text-gray-200 dark:text-gray-300">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Recherche alternative */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ou essayez une recherche :</h3>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              className="p-3 w-72 rounded-xl border border-white/30 shadow-md bg-white/10 dark:bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Recherche alternative"
            />
            <button className="p-3 px-5 bg-indigo-500/80 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition duration-300 ease-in-out flex items-center space-x-2 backdrop-blur">
              <span className="text-lg">🔍</span>
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

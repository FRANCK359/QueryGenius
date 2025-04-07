import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaBrain } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4">
        {/* Contenu principal centré */}
        <div className="flex flex-col items-center justify-center gap-3">
          {/* Logo et copyright */}
          <div className="flex items-center">
            <FaBrain className="text-blue-600 text-xl mr-2" />
            <p className="text-sm font-semibold">
              &copy; {new Date().getFullYear()} Moteur de Recherche IA
            </p>
          </div>

          {/* Liens centrés */}
          <div className="flex space-x-4 justify-center">
            <a href="/privacy" className="text-xs hover:text-blue-600 transition-colors">
              Confidentialité
            </a>
            <a href="/terms" className="text-xs hover:text-blue-600 transition-colors">
              Conditions
            </a>
            <a href="/ai-ethics" className="text-xs hover:text-blue-600 transition-colors">
              Éthique de l'IA
            </a>
          </div>

          {/* Icônes sociales centrées */}
          <div className="flex space-x-3 justify-center">
            <a href="https://twitter.com" className="hover:text-blue-400 transition-colors text-lg">
              <FaTwitter />
            </a>
            <a href="https://github.com" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-lg">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-700 transition-colors text-lg">
              <FaLinkedin />
            </a>
          </div>

          {/* Texte info centré */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <p>Ce projet utilise une intelligence artificielle avancée pour traiter vos requêtes.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
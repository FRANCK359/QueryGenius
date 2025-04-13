import React from 'react';
import AIBadge from './AIBadge';
import { motion } from 'framer-motion';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
    // Intégration avec un service de reporting d'erreurs comme Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          className="error-fallback flex flex-col items-center justify-center min-h-screen text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="backdrop-blur-md bg-white/10 dark:bg-black/30 p-8 rounded-2xl border border-white/20 shadow-lg max-w-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Oups ! Une erreur s'est produite <AIBadge small />
            </h2>
            <p className="text-white/90 mb-6">
              Notre intelligence artificielle a rencontré un problème inattendu.
            </p>
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Rafraîchir la page
            </motion.button>
            <div className="error-details mt-6 text-left text-sm text-gray-300 max-h-60 overflow-auto">
              <details>
                <summary className="cursor-pointer underline">Voir les détails techniques</summary>
                <pre className="mt-2 whitespace-pre-wrap break-words">
                  {this.state.error?.toString()}
                </pre>
                <pre className="mt-2 text-gray-500">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

import React from 'react';
import { motion } from 'framer-motion';
import AIBadge from './AIBadge';
import SearchComponent from './SearchComponent';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };

    // Génération unique des éléments d'arrière-plan animés
    this.backgroundElements = Array.from({ length: 8 }, () => ({
      width: `${Math.random() * 200 + 100}px`,
      height: `${Math.random() * 200 + 100}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      x: `${Math.random() * 100 - 50}px`,
      y: `${Math.random() * 100 - 50}px`,
      rotate: Math.random() * 360,
      duration: Math.random() * 30 + 15,
    }));
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <motion.div
        className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {this.backgroundElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl"
              style={{
                width: element.width,
                height: element.height,
                top: element.top,
                left: element.left,
              }}
              animate={{
                x: element.x,
                y: element.y,
                rotate: element.rotate,
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Overlay Pattern SVG */}
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10"
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Contenu Principal */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            className="w-full max-w-md bg-gradient-to-br from-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative p-6 text-center border-b border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <AIBadge pulse glowColor="#EE44EE" size="lg" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
                    Erreur Système
                  </span>
                </h1>
                <p className="text-sm text-gray-300">
                  Un problème technique a été détecté
                </p>
              </div>
            </motion.div>

            <div className="p-6 space-y-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-300 mb-1">
                  Notre système a rencontré une erreur inattendue.
                </p>
                <p className="text-sm text-gray-400">
                  Toutes les informations ont été enregistrées pour analyse.
                </p>
              </motion.div>

              <SearchComponent />

              <motion.div
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden group bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-0.5"
                >
                  <div className="relative z-10 bg-gray-900 rounded-[7px] px-4 py-3 w-full flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      🔄
                    </motion.span>
                    <span className="font-medium text-white">Recharger</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden group bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-0.5"
                >
                  <div className="relative z-10 bg-gray-900 rounded-[7px] px-4 py-3 w-full flex items-center justify-center gap-2">
                    🏠
                    <span className="font-medium text-white">Accueil</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg cursor-pointer list-none">
                    <span className="text-sm font-medium text-gray-300">Détails techniques</span>
                    <motion.span className="text-xs text-gray-400">
                      <motion.span className="block group-open:hidden">▼</motion.span>
                      <motion.span className="hidden group-open:block">▲</motion.span>
                    </motion.span>
                  </summary>
                  <motion.div
                    className="mt-2 p-3 bg-gray-900/30 rounded-lg overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="font-mono text-xs text-red-300/80 overflow-auto max-h-40">
                      {this.state.error?.toString()}
                      {this.state.errorInfo && (
                        <pre>{this.state.errorInfo.componentStack}</pre>
                      )}
                    </div>
                  </motion.div>
                </details>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
}

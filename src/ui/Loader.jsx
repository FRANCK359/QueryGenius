import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600/30 shadow-lg"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container animé */}
      <motion.div
        className="relative w-16 h-16"
        animate={{
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {/* Cercle externe */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-400/30"></div>
        
        {/* Cercle animé */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"
          animate={{
            rotate: [0, 360],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Icône IA centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-blue-500 dark:text-purple-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Texte animé avec particules */}
      <motion.div className="relative">
        <motion.p
          className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
        >
          <span className="text-blue-500 dark:text-purple-400">✨</span>
          Analyse en cours par l'IA intelligente...
          <span className="text-blue-500 dark:text-purple-400">✨</span>
        </motion.p>
        
        {/* Effet de particules */}
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-blue-400 dark:text-purple-300 pointer-events-none"
            style={{
              fontSize: `${Math.random() * 6 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 20 - 10}px`
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            •
          </motion.span>
        ))}
      </motion.div>

      {/* Barre de progression subtile */}
      <motion.div 
        className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
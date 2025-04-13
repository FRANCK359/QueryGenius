import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 py-16 px-4 rounded-xl text-center backdrop-blur-md bg-white/10 border border-white/20 shadow-md"
      role="status"
      aria-live="polite"
    >
      {/* Loader Circulaire SVG */}
      <motion.svg
        className="w-12 h-12 animate-spin text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="126.92"
          strokeDashoffset="63.46"
        />
      </motion.svg>

      {/* Texte animé */}
      <motion.p
        className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🧠 Analyse en cours par l'IA intelligente...
      </motion.p>
    </div>
  );
}

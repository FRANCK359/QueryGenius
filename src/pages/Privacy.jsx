import React from 'react';
import { motion } from 'framer-motion';
import AIBadge from "../components/AIBadge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2, 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] // Courbe de bézier personnalisée
    }
  }),
};

export default function Privacy() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <motion.div
      className="min-h-screen py-16 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="w-full max-w-4xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/90 border-2 border-white/30 dark:border-gray-600/30 shadow-2xl rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden"
        variants={fadeIn}
        custom={0}
      >
        {/* Effet de particules en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-300/20 dark:bg-purple-400/20"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                width: Math.random() * 10 + 2,
                height: Math.random() * 10 + 2,
                opacity: 0
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div className="text-center space-y-4" variants={fadeIn} custom={1}>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Politique de Confidentialité <AIBadge small className="inline-block align-middle" />
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono tracking-wider">
            Dernière mise à jour : {currentDate}
          </p>
          
          {/* Séparateur animé */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent dark:via-purple-400/50 mx-auto w-3/4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          />
        </motion.div>

        <motion.div className="space-y-8 text-lg leading-relaxed" initial="hidden" animate="visible">
          <motion.section variants={fadeIn} custom={2} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></span>
              <span>1. Collecte des Données</span>
            </motion.h2>
            <p className="mb-3">Notre moteur de recherche IA collecte les données suivantes :</p>
            <ul className="space-y-2">
              {[
                "Requêtes de recherche pour améliorer nos algorithmes",
                "Métadonnées anonymes (type d'appareil, navigateur)",
                "Interactions avec les résultats (clics, temps de consultation)"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 pl-4 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:mt-2 before:flex-shrink-0"
                  custom={i + 2.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={3} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></span>
              <span>2. Utilisation des Données</span>
            </motion.h2>
            <p className="mb-3">Les données collectées servent exclusivement à :</p>
            <ul className="space-y-2">
              {[
                "Améliorer la pertinence des résultats de recherche",
                "Personnaliser l'expérience utilisateur",
                "Développer de nouvelles fonctionnalités IA"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 pl-4 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:mt-2 before:flex-shrink-0"
                  custom={i + 3.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4 p-4 rounded-xl bg-indigo-100/30 dark:bg-indigo-400/10 border border-indigo-300/30 dark:border-indigo-500/30 text-sm backdrop-blur-sm shadow-inner"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)'
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                bounce: 0.5
              }}
            >
              <div className="flex gap-2">
                <span className="text-indigo-600 dark:text-indigo-300">🤖</span>
                <div>
                  <strong className="text-indigo-700 dark:text-indigo-300">Note IA :</strong> 
                  <p className="mt-1">Vos requêtes sont analysées par notre système mais jamais associées à votre identité.</p>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section variants={fadeIn} custom={4} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></span>
              <span>3. Protection des Données</span>
            </motion.h2>
            <p className="mb-3">Nous utilisons des mesures de sécurité avancées :</p>
            <ul className="space-y-2">
              {[
                "Chiffrement AES-256 pour toutes les données",
                "Anonymisation systématique après 30 jours",
                "Serveurs sécurisés en Europe"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 pl-4 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:mt-2 before:flex-shrink-0"
                  custom={i + 4.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} custom={5} className="group">
            <motion.h2 
              className="text-2xl font-semibold mb-3 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 group-hover:bg-purple-500 transition-colors"></span>
              <span>4. Vos Droits</span>
            </motion.h2>
            <p className="mb-3">Conformément au RGPD, vous pouvez :</p>
            <ul className="space-y-2">
              {[
                "Demander l'accès à vos données",
                "Exiger leur rectification",
                "Demander leur suppression"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start gap-2 pl-4 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:mt-2 before:flex-shrink-0"
                  custom={i + 5.5}
                  variants={fadeIn}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <p className="mt-3">
              Contactez notre DPO à :{" "}
              <motion.a
                href="mailto:dpo@moteuria.com"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium"
                whileHover={{ 
                  color: "#7c3aed",
                  x: 3
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400 
                }}
              >
                <span>dpo@moteuria.com</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </motion.a>
            </p>
          </motion.section>

          <motion.div
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-400/10 via-purple-400/10 to-pink-400/10 dark:from-indigo-300/10 dark:via-purple-300/10 dark:to-pink-300/10 border-2 border-indigo-300/30 dark:border-purple-400/30 shadow-lg relative overflow-hidden"
            variants={fadeIn}
            custom={6}
            whileHover={{ 
              scale: 1.01,
              boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)'
            }}
          >
            {/* Effet de gradient animé */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    Engagement Éthique de Notre IA
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Notre système est conçu pour respecter la vie privée par conception. Les modèles d'IA sont entraînés sur des données agrégées et ne conservent pas de traces individuelles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
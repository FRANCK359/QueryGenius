import { useState, useCallback, useEffect } from 'react';
import AIBadge from '../components/AIBadge';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Hook pour gérer le consentement et l'analyse
export default function useAnalytics() {
  const [consentGiven, setConsentGiven] = useState(null);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Initialisation du consentement depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('analyticsConsent');
    setConsentGiven(stored === 'true' ? true : stored === 'false' ? false : null);
  }, []);

  // Mise à jour du consentement
  const updateConsent = useCallback((given) => {
    setConsentGiven(given);
    localStorage.setItem('analyticsConsent', given.toString());
  }, []);

  // Trackers des événements avec useCallback
  const trackPageView = useCallback(() => {
    if (consentGiven) console.log('📊 Page view tracked');
  }, [consentGiven]);

  const trackEvent = useCallback((eventName) => {
    if (consentGiven) console.log(`🎯 Event "${eventName}" tracked`);
  }, [consentGiven]);

  const trackSearch = useCallback((searchQuery) => {
    if (consentGiven) console.log(`🔍 Search tracked: ${searchQuery}`);
  }, [consentGiven]);

  const trackAIInteraction = useCallback((interactionDetails) => {
    if (consentGiven) console.log(`🤖 AI interaction: ${JSON.stringify(interactionDetails)}`);
  }, [consentGiven]);

  // Composants memoizés
  const AnalyticsConsentBanner = useCallback(({ darkMode = false, language = 'fr' }) => {
    const consentText = language === 'en'
      ? 'We use analytics to improve your user experience. You can accept or refuse.'
      : 'Nous utilisons des analytics pour améliorer votre expérience utilisateur. Vous pouvez accepter ou refuser.';

    return (
      <AnimatePresence>
        {consentGiven === null && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-labelledby="consent-banner-heading"
            className={`fixed bottom-0 inset-x-0 z-50 px-4 py-6 backdrop-blur-md ${darkMode ? 'bg-gray-900/90 border-t border-gray-700' : 'bg-white/90 border-t border-gray-200'}`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 id="consent-banner-heading" className="text-lg font-semibold flex items-center justify-center gap-2">
                <AIBadge small /> <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Confidentialité</span>
              </h3>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {consentText}
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => updateConsent(true)}
                  className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
                  aria-label="Accepter le suivi analytique"
                >
                  Accepter
                </button>
                <button
                  onClick={() => updateConsent(false)}
                  className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  aria-label="Refuser le suivi analytique"
                >
                  Refuser
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }, [consentGiven, updateConsent]);

  const AnalyticsDebugger = useCallback(() => (
    isDebugMode ? (
      <div className="p-4 m-4 rounded-lg bg-black/80 text-green-400 text-sm shadow-md">
        <pre>{JSON.stringify({ consentGiven, isDebugMode }, null, 2)}</pre>
      </div>
    ) : null
  ), [isDebugMode, consentGiven]);

  // Retour des valeurs et fonctions
  return {
    trackPageView,
    trackEvent,
    trackSearch,
    trackAIInteraction,
    setAnalyticsConsent: updateConsent,
    analyticsConsent: consentGiven,
    AnalyticsConsentBanner,
    AnalyticsDebugger,
    toggleDebugMode: () => setIsDebugMode((v) => !v)
  };
}

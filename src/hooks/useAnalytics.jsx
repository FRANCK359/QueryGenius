import { useState } from 'react';
import AIBadge from '../components/AIBadge';
import { motion, AnimatePresence } from 'framer-motion';

export default function useAnalytics() {
  const [consentGiven, setConsentGiven] = useState(() => {
    const stored = localStorage.getItem('analyticsConsent');
    return stored === 'true' ? true : stored === 'false' ? false : null;
  });

  const [isDebugMode, setIsDebugMode] = useState(false);

  const handleConsent = (given) => {
    setConsentGiven(given);
    localStorage.setItem('analyticsConsent', given.toString());
  };

  const AnalyticsConsentBanner = ({ darkMode = false }) => (
    <AnimatePresence>
      {consentGiven === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed bottom-0 inset-x-0 z-50 px-4 py-6 backdrop-blur-md ${darkMode ? 'bg-gray-900/90 border-t border-gray-700' : 'bg-white/90 border-t border-gray-200'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
              <AIBadge small /> <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Confidentialité</span>
            </h3>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Nous utilisons des analytics pour améliorer votre expérience utilisateur. Vous pouvez accepter ou refuser.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => handleConsent(true)}
                className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
              >
                Accepter
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Trackers
  const trackPageView = () => {
    if (consentGiven) console.log('📊 Page view tracked');
  };

  const trackEvent = (eventName) => {
    if (consentGiven) console.log(`🎯 Event "${eventName}" tracked`);
  };

  const trackSearch = (searchQuery) => {
    if (consentGiven) console.log(`🔍 Search tracked: ${searchQuery}`);
  };

  const trackAIInteraction = (interactionDetails) => {
    if (consentGiven) console.log(`🤖 AI interaction: ${JSON.stringify(interactionDetails)}`);
  };

  const AnalyticsDebugger = () => (
    isDebugMode ? (
      <div className="p-4 m-4 rounded-lg bg-black/80 text-green-400 text-sm shadow-md">
        <pre>{JSON.stringify({ consentGiven, isDebugMode }, null, 2)}</pre>
      </div>
    ) : null
  );

  return {
    trackPageView,
    trackEvent,
    trackSearch,
    trackAIInteraction,
    setAnalyticsConsent: handleConsent,
    analyticsConsent: consentGiven,
    AnalyticsConsentBanner,
    AnalyticsDebugger,
    toggleDebugMode: () => setIsDebugMode((v) => !v)
  };
}

import { useState } from 'react';
import AIBadge from '../components/AIBadge';

export default function useAnalytics() {
  const [consentGiven, setConsentGiven] = useState(() => {
    return localStorage.getItem('analyticsConsent') === 'true';
  });
  const [isDebugMode, setIsDebugMode] = useState(false);

  const handleConsent = (given) => {
    setConsentGiven(given);
    localStorage.setItem('analyticsConsent', given.toString());
  };

  const AnalyticsConsentBanner = ({ darkMode = false }) => (
    <div className="consent-banner" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '20px',
      backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
      borderTop: `1px solid ${darkMode ? '#2d3748' : '#e2e8f0'}`,
      zIndex: 1000,
      display: consentGiven === null ? 'block' : 'none'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ color: darkMode ? 'white' : '#2d3748' }}>
          <AIBadge small /> Confidentialité
        </h3>
        <p style={{ color: darkMode ? '#cbd5e0' : '#4a5568' }}>
          Nous utilisons des analytics pour améliorer votre expérience.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button onClick={() => handleConsent(true)} style={{
            padding: '8px 16px',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Accepter
          </button>
          <button onClick={() => handleConsent(false)} style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: darkMode ? '#cbd5e0' : '#4a5568',
            border: `1px solid ${darkMode ? '#4a5568' : '#cbd5e0'}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Refuser
          </button>
        </div>
      </div>
    </div>
  );

  return {
    trackPageView: () => {},
    trackEvent: () => {},
    trackSearch: () => {},
    trackAIInteraction: () => {},
    setAnalyticsConsent: handleConsent,
    analyticsConsent: consentGiven,
    AnalyticsConsentBanner,
    AnalyticsDebugger: () => null,
    toggleDebugMode: () => setIsDebugMode(!isDebugMode)
  };
}
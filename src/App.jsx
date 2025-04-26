import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import MentionsLegales from './pages/Legal/MentionsLegales';
import PolitiqueCookies from './pages/Legal/PolitiqueCookies';
import Api from './pages/Api/Api';
import Faq from './pages/Faq/Faq';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIBadge from './components/AIBadge';
import AdvancedSearch from './components/AdvancedSearch';
import ErrorBoundary from './components/ErrorBoundary';

// Hooks
import useAnalytics from './hooks/useAnalytics';

// Styles
import './index.css';

function AppWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);
  
  const {
    trackPageView,
    trackEvent,
    trackSearch,
    trackAIInteraction,
    AnalyticsConsentBanner,
    AnalyticsDebugger
  } = useAnalytics();

  useEffect(() => {
    if (!isLoading) {
      trackPageView(location.pathname);
      trackEvent(`Page View: ${location.pathname}`);
    }
  }, [location.pathname, isLoading, trackPageView, trackEvent]);

  useEffect(() => {
    const loadAssets = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsLoading(false);
      trackPageView(location.pathname);
      trackEvent('App Loaded');
    };

    loadAssets();
  }, [trackPageView, trackEvent, location.pathname]);

  const handleSearchToggle = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
    trackEvent(showAdvancedSearch ? 'Close Advanced Search' : 'Open Advanced Search');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-center">
        <div className="p-8 space-y-4 animate-pulse">
          <AIBadge pulse />
          <p className="text-lg font-medium text-gray-300">Initialisation des systèmes IA...</p>
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <GlobalEffects />
      <Navbar onSearchToggle={handleSearchToggle} />

      <main className="relative z-10 px-4 sm:px-8 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex justify-center mt-16 mb-8">
          <button 
            className="px-6 py-3 bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/20
                      text-gray-800 dark:text-white rounded-full transition-all hover:bg-white/30 dark:hover:bg-black/40
                      shadow-lg hover:shadow-xl font-medium"
            onClick={handleSearchToggle}
            aria-label="Toggle advanced search"
          >
            {showAdvancedSearch ? 'Masquer les options' : 'Recherche avancée'}
          </button>
        </div>

        {showAdvancedSearch && (
          <div className="mt-4 mb-12 bg-white/80 dark:bg-gray-800/90 p-6 rounded-xl shadow-xl backdrop-blur-sm">
            <AdvancedSearch onSearch={trackSearch} />
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home onSearch={trackSearch} onAIInteraction={trackAIInteraction} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-cookies" element={<PolitiqueCookies />} />
          <Route path="/api" element={<Api />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/search/:query" element={<Home onSearch={trackSearch} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />

      <Footer />
      <AnalyticsConsentBanner darkMode={isDarkMode} />
      <AnalyticsDebugger />
    </div>
  );
}

function GlobalEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(59,130,246,0.1)_0%,transparent_70%)] transition-all duration-300"
        style={{ '--x': `${mousePosition.x}%`, '--y': `${mousePosition.y}%` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20 dark:to-gray-900/50" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SearchProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <AppWrapper />
          </ErrorBoundary>
        </ThemeProvider>
      </SearchProvider>
    </Router>
  );
}
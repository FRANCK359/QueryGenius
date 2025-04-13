import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';

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
  const { trackPageView, AnalyticsConsentBanner, AnalyticsDebugger } = useAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      trackPageView(window.location.pathname);
    }, 1200);
    return () => clearTimeout(timer);
  }, [trackPageView]);

  if (isLoading) {
    return (
      <div className="app-loader">
        <div className="ai-loader-content">
          <AIBadge pulse />
          <p>Initialisation des systèmes IA...</p>
          <div className="loading-progress">
            <div className="progress-bar" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <SearchProvider>
        <Router>
          <div className="app-container">
            <GlobalEffects />
            <Navbar />

            <main className="main-content">
              <button 
                className="toggle-advanced-search"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                {showAdvancedSearch ? 'Masquer les options' : 'Recherche avancée'}
              </button>

              {showAdvancedSearch && (
                <div className="advanced-search-container">
                  <AdvancedSearch />
                </div>
              )}

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-cookies" element={<PolitiqueCookies />} />
                <Route path="/api" element={<Api />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/search/:query" element={<Home />} />
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
              theme="colored"
            />

            <Footer />
            <AnalyticsConsentBanner />
            <AnalyticsDebugger />
          </div>
        </Router>
      </SearchProvider>
    </ThemeProvider>
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
    <div className="ai-global-effects">
      <div 
        className="ai-particle-layer" 
        style={{ '--x': `${mousePosition.x}%`, '--y': `${mousePosition.y}%` }}
      />
      <div className="ai-gradient-overlay" />
      <div className="ai-connection-lines" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppWrapper />
    </ErrorBoundary>
  );
}

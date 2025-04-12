import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Pages juridiques */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-cookies" element={<PolitiqueCookies />} />
        
        {/* Fonctionnalités */}
        <Route path="/api" element={<Api />} />
        <Route path="/faq" element={<Faq />} />
        
        {/* Gestion des routes inconnues */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
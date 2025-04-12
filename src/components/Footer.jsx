import React from 'react';
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import { FaTwitter, FaGithub, FaLinkedin, FaBrain, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { title: "Confidentialité", url: "/privacy" },
    { title: "Conditions", url: "/terms" },
    { title: "Éthique IA", url: "/ai-ethics" },
    { title: "API", url: "/api" },
    { title: "FAQ", url: "/faq" }
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com", name: "Twitter" },
    { icon: <FaGithub />, url: "https://github.com", name: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <FaWhatsapp />, url: "https://wa.me", name: "WhatsApp" },
    { icon: <FaFacebook />, url: "https://facebook.com", name: "Facebook" },
    { icon: <FaInstagram />, url: "https://instagram.com", name: "Instagram" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section Principale */}
        <div className="footer-main">
          {/* Logo et Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <FaBrain className="logo-icon" />
              <span>Moteur IA</span>
            </div>
            <p className="footer-description">
              Une nouvelle ère de recherche intelligente, propulsée par l'intelligence artificielle.
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="footer-links">
            <h3 className="footer-links-title">Navigation</h3>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3 className="footer-links-title">Contact</h3>
            <ul>
              <li>contact@moteuria.com</li>
              <li>+33 1 23 45 67 89</li>
              <li>Paris, France</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3 className="footer-links-title">Restez informé</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Votre email" aria-label="Email pour newsletter" />
              <button type="submit">S'abonner</button>
            </form>
          </div>
        </div>

        {/* Section Secondaire */}
        <div className="footer-secondary">
          {/* Copyright */}
          <div className="footer-copyright">
            &copy; {currentYear} Moteur de Recherche IA. Tous droits réservés.
          </div>

          {/* Réseaux Sociaux */}
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={`Suivez-nous sur ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Mentions */}
          <div className="footer-legal">
            <Link to="/mentions-legales">Mentions légales</Link>
            <span>•</span>
            <Link to="/politique-cookies">Politique des cookies</Link>
          </div>
        </div>
      </div>

      {/* Badge IA */}
      <div className="footer-ai-badge">
        <span>Propulsé par une IA de pointe</span>
        <div className="ai-pulse"></div>
      </div>
    </footer>
  );
}

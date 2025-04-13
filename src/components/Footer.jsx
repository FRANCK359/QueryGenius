import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaBrain,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { title: 'Confidentialité', url: '/privacy' },
    { title: 'Conditions', url: '/terms' },
    { title: 'Éthique IA', url: '/ai-ethics' },
    { title: 'API', url: '/api' },
    { title: 'FAQ', url: '/faq' },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <FaGithub />, url: 'https://github.com', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <FaWhatsapp />, url: 'https://wa.me', name: 'WhatsApp' },
    { icon: <FaFacebook />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', name: 'Instagram' },
  ];

  return (
    <footer className="mt-12 px-6 py-10 backdrop-blur-lg bg-white/10 dark:bg-black/30 border-t border-white/20 shadow-inner text-white rounded-t-2xl transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Brand */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaBrain className="text-blue-400 animate-pulse" />
            <span>Moteur IA</span>
          </div>
          <p className="text-sm text-white/70">
            Une nouvelle ère de recherche intelligente, propulsée par l'intelligence artificielle.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="text-white/80 hover:text-blue-400 transition"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="text-white/70 space-y-1 text-sm">
            <li>contact@moteuria.com</li>
            <li>+33 1 23 45 67 89</li>
            <li>Paris, France</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre email"
              aria-label="Email pour newsletter"
              className="px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Secondary section */}
      <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
        {/* Copyright */}
        <div>&copy; {currentYear} Moteur de Recherche IA. Tous droits réservés.</div>

        {/* Socials */}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400 transition"
              aria-label={`Suivez-nous sur ${social.name}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Legal */}
        <div className="flex gap-2 items-center">
          <Link to="/mentions-legales" className="hover:text-blue-400">
            Mentions légales
          </Link>
          <span>•</span>
          <Link to="/politique-cookies" className="hover:text-blue-400">
            Politique des cookies
          </Link>
        </div>
      </div>

      {/* IA Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-400 font-medium">
        <span>Propulsé par une IA de pointe</span>
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  );
}

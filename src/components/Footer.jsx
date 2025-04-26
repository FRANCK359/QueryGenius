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
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-800 dark:text-gray-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-400/10 dark:bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-40 h-40 rounded-full bg-purple-400/10 dark:bg-purple-500/20 blur-3xl animate-pulse delay-300"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 group"
            >
              <FaBrain className="text-2xl text-blue-600 dark:text-blue-400 animate-pulse transition-colors" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-500 transition-all">
                Moteur IA
              </span>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Une nouvelle ère de recherche intelligente, propulsée par l'intelligence artificielle.
            </p>
            
            {/* Social icons mobile */}
            <div className="flex gap-4 md:hidden">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-xl transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Navigation</h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.url}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 transition-colors"></span>
                contact@moteuria.com
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                +33 1 23 45 67 89
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                Paris, France
              </motion.li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Recevez les dernières actualités sur l'IA</p>
            
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="Votre email"
                aria-label="Email pour newsletter"
                className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 outline-none transition-all placeholder-gray-500 backdrop-blur-sm shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-500/40 transition-all"
              >
                S'abonner
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-10"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Moteur IA. Tous droits réservés.
          </div>

          {/* Legal links */}
          <div className="flex gap-4">
            <Link to="/mentions-legales" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-cookies" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors">
              Politique des cookies
            </Link>
          </div>

          {/* Social icons desktop */}
          <div className="hidden md:flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#2563EB' }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-xl transition-all"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* AI Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
        >
          <span>Propulsé par une IA de pointe</span>
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
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
        </motion.div>
      </div>
    </footer>
  );
}
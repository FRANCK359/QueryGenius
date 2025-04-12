import React, { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility

  const socialLinks = [
    { 
      icon: <FaWhatsapp />, 
      url: 'https://wa.me/yournumber', 
      className: 'whatsapp',
      label: 'Contact WhatsApp' 
    },
    { 
      icon: <FaFacebook />, 
      url: 'https://facebook.com/yourpage', 
      className: 'facebook',
      label: 'Page Facebook' 
    },
    { 
      icon: <FaInstagram />, 
      url: 'https://instagram.com/yourprofile', 
      className: 'instagram',
      label: 'Profil Instagram' 
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/yourhandle', 
      className: 'twitter',
      label: 'Compte Twitter' 
    },
    { 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/in/yourprofile', 
      className: 'linkedin',
      label: 'Profil LinkedIn' 
    },
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/yourrepo', 
      className: 'github',
      label: 'Dépôt GitHub' 
    },
    { 
      icon: <FaYoutube />, 
      url: 'https://youtube.com/yourchannel', 
      className: 'youtube',
      label: 'Chaîne YouTube' 
    }
  ];

  return (
    <aside className={`social-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Toggle button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)} 
        aria-label={isOpen ? 'Fermer la barre latérale' : 'Ouvrir la barre latérale'}
      >
        {isOpen ? '❌' : '☰'}
      </button>

      {/* Social links */}
      <nav className="social-links-container" aria-label="Réseaux sociaux">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link ${link.className}`}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </nav>
    </aside>
  );
}

import React, { useState, useEffect } from 'react';
import AIBadge from "../components/AIBadge";
import "../index.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [theme, setTheme] = useState('light');

  // Gérer le thème dynamique
  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(userPrefersDark ? 'dark' : 'light');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'appel API avec IA
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Analyse conditionnelle du message
      if (formData.message.toLowerCase().includes('urgence')) {
        setSubmitStatus('priority');
      } else {
        setSubmitStatus('success');
      }

      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', message: '', inquiryType: 'general' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-container ${theme}`}>
      {/* En-tête */}
      <div className="contact-header">
        <h1 className="contact-title">
          Contactez Notre Équipe
          <AIBadge />
        </h1>
        <p>Notre IA analysera votre demande pour une réponse optimale.</p>
        <div className="contact-animation"></div>
      </div>

      {/* États de réponse */}
      {submitStatus && (
        <div className={`ai-response ${submitStatus}`}>
          {submitStatus === 'success' && (
            <>
              <h3>✔ Succès</h3>
              <p>Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24 heures.</p>
            </>
          )}
          {submitStatus === 'priority' && (
            <>
              <h3>⚠ Priorité</h3>
              <p>Urgence détectée ! Un membre de l'équipe vous contactera sous peu.</p>
            </>
          )}
          {submitStatus === 'error' && (
            <>
              <h3>❌ Erreur</h3>
              <p>Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</p>
            </>
          )}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="ai-contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
            className="ai-form-input"
            aria-label="Nom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre email"
            required
            className="ai-form-input"
            aria-label="Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="inquiryType">Type de demande</label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="ai-form-select"
            aria-label="Type de demande"
          >
            <option value="general">Question générale</option>
            <option value="technical">Support technique</option>
            <option value="business">Demande professionnelle</option>
            <option value="api">Accès API/IA</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message <span className="ai-hint">(Soyez précis pour une meilleure assistance)</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre demande en détail..."
            rows="6"
            required
            className="ai-form-textarea"
            aria-label="Message"
          />
          <div className="ai-tip">
            💡 Conseil : Plus votre message est clair, plus l'IA pourra vous aider efficacement.
          </div>
        </div>

        <button
          type="submit"
          className="ai-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="ai-processing">
              <span className="ai-spinner"></span> Envoi...
            </span>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>

      {/* Section de support */}
      <div className="ai-support">
        <h3>Support IA en Temps Réel</h3>
        <p>Notre assistant virtuel est à votre disposition 24/7.</p>
        <button className="ai-chat-button">
          💬 Discuter avec le Chatbot
        </button>
      </div>
    </div>
  );
}

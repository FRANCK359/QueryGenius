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

  // Dynamically manage theme
  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(userPrefersDark ? 'dark' : 'light');

    const themeListener = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    themeListener.addEventListener('change', handleThemeChange);

    return () => themeListener.removeEventListener('change', handleThemeChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      const status = formData.message.toLowerCase().includes('urgence') ? 'priority' : 'success';
      setSubmitStatus(status);

      setFormData({ name: '', email: '', message: '', inquiryType: 'general' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSubmitStatus = () => {
    switch (submitStatus) {
      case 'success':
        return (
          <>
            <h3>✔ Succès</h3>
            <p>Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24 heures.</p>
          </>
        );
      case 'priority':
        return (
          <>
            <h3>⚠ Priorité</h3>
            <p>Urgence détectée ! Un membre de l'équipe vous contactera sous peu.</p>
          </>
        );
      case 'error':
        return (
          <>
            <h3>❌ Erreur</h3>
            <p>Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`contact-container ${theme} p-6 space-y-6`}>
      <div className="contact-header text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Contactez Notre Équipe
          <AIBadge />
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Notre IA analysera votre demande pour une réponse optimale.</p>
        <div className="contact-animation"></div>
      </div>

      {submitStatus && (
        <div className={`ai-response ${submitStatus} p-4 bg-green-200 dark:bg-red-200 rounded-lg`} role="alert" aria-live="assertive">
          {renderSubmitStatus()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="ai-contact-form space-y-4">
        <FormInput
          label="Nom"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre email"
          required
        />
        <FormSelect
          label="Type de demande"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          options={[
            { value: 'general', label: 'Question générale' },
            { value: 'technical', label: 'Support technique' },
            { value: 'business', label: 'Demande professionnelle' },
            { value: 'api', label: 'Accès API/IA' },
          ]}
        />
        <FormTextarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre demande en détail..."
          required
          rows={6}
        />

        <button
          type="submit"
          className="ai-submit-button w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="ai-processing flex items-center justify-center">
              <span className="ai-spinner animate-spin mr-2"></span> Envoi...
            </span>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>

      <div className="ai-support text-center mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Support IA en Temps Réel</h3>
        <p className="text-gray-600 dark:text-gray-300">Notre assistant virtuel est à votre disposition 24/7.</p>
        <button className="ai-chat-button mt-4 py-2 px-6 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          💬 Discuter avec le Chatbot
        </button>
      </div>
    </div>
  );
}

const FormInput = ({ label, type, name, value, onChange, placeholder, required }) => (
  <div className="form-group space-y-2">
    <label htmlFor={name} className="text-lg text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="ai-form-input w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      aria-label={label}
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="form-group space-y-2">
    <label htmlFor={name} className="text-lg text-gray-700 dark:text-gray-300">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="ai-form-select w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      aria-label={label}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, required, rows }) => (
  <div className="form-group space-y-2">
    <label htmlFor={name} className="text-lg text-gray-700 dark:text-gray-300">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="ai-form-textarea w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      aria-label={label}
    />
    <div className="ai-tip text-sm text-gray-500 dark:text-gray-400">
      💡 Conseil : Plus votre message est clair, plus l'IA pourra vous aider efficacement.
    </div>
  </div>
);

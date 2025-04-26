import React, { useState, useEffect } from 'react';
import AIBadge from "../components/AIBadge";
import { Loader2, Sparkles, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      const initialMode = savedMode 
        ? savedMode === "enabled"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", initialMode);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    const statusConfig = {
      success: {
        icon: '✔',
        title: 'Succès',
        message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24 heures.',
        bg: 'bg-emerald-100 dark:bg-emerald-900/70',
        border: 'border-emerald-400',
        iconColor: 'text-emerald-500'
      },
      priority: {
        icon: '⚠',
        title: 'Priorité',
        message: 'Urgence détectée ! Un membre de l\'équipe vous contactera sous peu.',
        bg: 'bg-amber-100 dark:bg-amber-900/70',
        border: 'border-amber-400',
        iconColor: 'text-amber-500'
      },
      error: {
        icon: '❌',
        title: 'Erreur',
        message: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
        bg: 'bg-rose-100 dark:bg-rose-900/70',
        border: 'border-rose-400',
        iconColor: 'text-rose-500'
      }
    };

    if (!submitStatus) return null;
    const config = statusConfig[submitStatus];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${config.bg} ${config.border} p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm`}
      >
        <div className="flex items-start gap-3">
          <span className={`text-2xl ${config.iconColor}`}>{config.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{config.title}</h3>
            <p>{config.message}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Contactez Notre Équipe
            <AIBadge className="ml-3 inline-block" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Notre IA analysera votre demande pour une réponse optimale.
          </p>
          <motion.div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {renderSubmitStatus()}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
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

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-medium ${isSubmitting 
              ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed' 
              : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-700/30'} 
              text-white flex justify-center items-center transition-all`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mr-2"
                >
                  <Loader2 className="h-5 w-5" />
                </motion.div>
                Envoi en cours...
              </>
            ) : (
              'Envoyer le message'
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="text-center pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-3">Support IA en Temps Réel</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Notre assistant virtuel est à votre disposition 24/7.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 hover:from-green-600 hover:to-teal-700 dark:hover:from-green-700 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Discuter avec le Chatbot
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const FormInput = ({ label, type, name, value, onChange, placeholder, required }) => (
  <motion.div 
    className="space-y-2"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
    />
  </motion.div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <motion.div 
    className="space-y-2"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800/50 dark:text-white appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] backdrop-blur-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </motion.div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, required, rows }) => (
  <motion.div 
    className="space-y-2"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800/50 dark:text-white transition-all duration-200 backdrop-blur-sm"
    />
    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
      <Sparkles className="h-4 w-4" />
      Conseil : Plus votre message est clair, plus l'IA pourra vous aider efficacement.
    </p>
  </motion.div>
);
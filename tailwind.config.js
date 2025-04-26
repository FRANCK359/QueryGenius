/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ou 'media' si tu préfères
  theme: {
    extend: {
      colors: {
        'ia-purple': '#6C63FF',
        'ia-blue': '#3A8DFF',
        'ia-dark': '#0f0c29',
      },
      animation: {
        'gradient-flow': 'gradient-flow 15s ease infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [],
}

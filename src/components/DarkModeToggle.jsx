import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import "../index.css";

export default function DarkModeToggle() {
  // Récupérer le mode sombre au chargement
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  // Appliquer le mode sombre dès le montage du composant
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Gérer le changement de mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
      }
      return newMode;
    });
  };

  return (
    <div className="transition-all duration-700 ease-in-out">
      {/* Bouton */}
      <Button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className={`relative z-10 dark-mode-toggle rounded-full p-3 flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg border-2 ${
          darkMode
            ? "bg-gray-900 text-yellow-400 border-yellow-400 hover:bg-gray-800"
            : "bg-yellow-400 text-gray-900 border-gray-900 hover:bg-yellow-300"
        }`}
      >
        <div className="toggle-icon transition-transform duration-500 ease-in-out">
          {darkMode ? (
            <Sun size={24} className="rotate-[360deg] transition-all duration-500" />
          ) : (
            <Moon size={24} className="rotate-[360deg] transition-all duration-500" />
          )}
        </div>
      </Button>
    </div>
  );
}

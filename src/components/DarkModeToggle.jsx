import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? savedMode === "enabled"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.body.style.transition = "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out";
    document.body.style.opacity = "0";

    setTimeout(() => {
      document.body.style.backgroundImage = darkMode
        ? "url('https://img.static-rmg.be/a/view/q75/w1600/h836/5643169/gettyimages-1426131553-jpg.jpg')"
        : "url('https://www.afrik.com/wp-content/uploads/2024/11/intelligence-artificielle-696x392.jpg')";

      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.opacity = "1";
      setLoading(false);
    }, 400);

    document.documentElement.className = darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="dark-mode-container fixed top-16 right-4 z-50">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        aria-pressed={darkMode}
        className="dark-mode-btn backdrop-blur-xl border border-white/20 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 text-white rounded-full p-2 transition"
        variant="ghost"
      >
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sun className="text-yellow-300" size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Moon className="text-blue-300" size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Sun, Moon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // import the ThemeContext

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme(); // use the context

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const applyTheme = () => {
      setIsLoading(true);
      document.documentElement.classList.toggle("dark", darkMode);
      localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    applyTheme();
  }, [darkMode]);

  const handleToggle = () => {
    toggleTheme(); // use the toggle function from context
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="text-white"
            >
              <Loader2 className="h-8 w-8" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        className={`
          relative flex items-center justify-center
          h-14 w-14 rounded-full
          bg-gradient-to-br from-gray-100 to-gray-300
          dark:from-gray-800 dark:to-gray-900
          shadow-lg hover:shadow-xl
          border border-gray-200 dark:border-gray-700
          overflow-hidden
          transition-all duration-300
          group
        `}
      >
        {/* Background Effect */}
        <motion.div
          className={`
            absolute inset-0
            bg-gradient-to-br from-yellow-200 to-orange-400
            dark:from-blue-900 dark:to-purple-900
            opacity-0 group-hover:opacity-20
          `}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.2 : 0
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Celestial Body */}
        <motion.div
          className={`
            absolute rounded-full
            bg-yellow-300 shadow-[0_0_20px_2px_rgba(250,204,21,0.5)]
            dark:bg-gray-300 dark:shadow-[0_0_20px_2px_rgba(209,213,219,0.3)]
          `}
          animate={{
            width: darkMode ? 6 : 24,
            height: darkMode ? 6 : 24,
            y: darkMode ? -12 : 0,
            x: darkMode ? 12 : 0,
            opacity: darkMode ? 0.8 : 1
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Stars in Dark Mode */}
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            className={`
              absolute rounded-full bg-white
              ${darkMode ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 30 - 15}px`,
              left: `${Math.random() * 30 - 15}px`,
            }}
            animate={{
              opacity: darkMode ? [0.8, 1, 0.8] : 0,
              scale: darkMode ? [1, 1.2, 1] : 0.5
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 2 + 1,
              delay: star * 0.1
            }}
          />
        ))}

        {/* Icons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={darkMode ? "sun" : "moon"}
            className="absolute"
            initial={{ 
              y: darkMode ? 20 : -20,
              opacity: 0,
              rotate: darkMode ? 90 : -90
            }}
            animate={{ 
              y: 0,
              opacity: 1,
              rotate: 0
            }}
            exit={{ 
              y: darkMode ? -20 : 20,
              opacity: 0,
              rotate: darkMode ? -90 : 90
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Glow Effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-full
            shadow-[0_0_15px_5px_rgba(250,204,21,0.3)]
            dark:shadow-[0_0_15px_5px_rgba(147,197,253,0.3)]
          `}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

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
    document.documentElement.className = darkMode ? "dark" : "light";
    document.body.style.transition = "background 1s ease, opacity 1s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      document.body.style.backgroundImage = darkMode
      ? "url('https://img.static-rmg.be/a/view/q75/w1600/h836/5643169/gettyimages-1426131553-jpg.jpg')"
      : "url('https://www.afrik.com/wp-content/uploads/2024/11/intelligence-artificielle-696x392.jpg')";


      document.body.style.opacity = "1";
      setLoading(false);
    }, 500); // Durée pour la transition fade

    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`dark-mode-container ${darkMode ? "dark" : "light"}`}>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <Button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Mode clair" : "Mode sombre"}
        className="dark-mode-btn"
        variant="ghost"
      >
        <div className="icon-wrapper">
          {darkMode ? (
            <Sun className="mode-icon spin-once" size={22} />
          ) : (
            <Moon className="mode-icon spin-once" size={22} />
          )}
        </div>
      </Button>
    </div>
  );
}

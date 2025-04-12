import React, { useEffect, useState } from 'react';
import '../index.css';

export default function AIBadge({ small = false, pulse = true }) {
  const [glow, setGlow] = useState(false);
  const [sparkles, setSparkles] = useState(4);
  const [isAnimating, setIsAnimating] = useState(true); // Ajout d'un état pour gérer les animations

  useEffect(() => {
    if (!pulse) return;

    const interval = setInterval(() => {
      setGlow(prev => !prev);
      setSparkles(Math.floor(Math.random() * 4) + 2);
    }, 3000); // Animations toutes les 3 secondes

    return () => clearInterval(interval);
  }, [pulse]);

  const handleClick = () => {
    // Désactive les animations temporairement lors du clic
    setIsAnimating(false);

    // Réactive les animations après un petit délai
    setTimeout(() => {
      setIsAnimating(true);
    }, 200); // Réactive après 200ms
  };

  return (
    <span
      className={`ai-badge ${small ? 'small' : ''} ${glow && isAnimating ? 'glow' : ''}`}
      onClick={handleClick}
    >
      {pulse && <span className="ai-pulse" />}
      <span className="ai-text">AI Powered</span>
      <span className="ai-sparkles">
        {[...Array(sparkles)].map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              '--delay': `${i * 0.2}s`,
              '--offset': `${(Math.random() * 20) - 10}px`,
              '--size': `${Math.random() * 6 + 4}px`
            }}
          />
        ))}
      </span>
    </span>
  );
}

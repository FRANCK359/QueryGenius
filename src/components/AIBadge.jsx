import React, { useEffect, useState, useMemo, useCallback } from 'react';

export default function AIBadge({ small = false, pulse = true }) {
  const [glow, setGlow] = useState(false);
  const [sparkles, setSparkles] = useState(4);
  const [isAnimating, setIsAnimating] = useState(true);

  // Mise à jour périodique du glow et du nombre de sparkles lorsque le pulsing est activé
  useEffect(() => {
    if (!pulse) return;

    const interval = setInterval(() => {
      setGlow(prev => !prev);
      setSparkles(Math.floor(Math.random() * 4) + 3);
    }, 3500);

    return () => clearInterval(interval);
  }, [pulse]);

  // Gestion du clic : interrompt brièvement l'animation puis la relance
  const handleClick = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 200);
  }, []);

  // Mémorisation des styles de chaque sparkle afin de limiter les recalculs lors du rendu
  const sparkleStyles = useMemo(() => {
    return Array.from({ length: sparkles }, (_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 6}px`,
      height: `${Math.random() * 6 + 6}px`,
      animationDelay: `${i * 0.2}s`
    }));
  }, [sparkles]);

  return (
    <span
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center
        ${small ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
        rounded-full font-medium cursor-pointer select-none
        bg-gradient-to-br from-purple-500 to-blue-600
        text-white shadow-md
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${glow && isAnimating ? 'shadow-lg shadow-blue-500/50' : ''}
        hover:scale-105 active:scale-95
        group
      `}
    >
      {/* Effet de pulsing */}
      {pulse && (
        <span className={`
          absolute inset-0 rounded-full
          bg-white opacity-0
          ${glow && isAnimating ? 'animate-ping-slow opacity-40' : ''}
        `} />
      )}

      {/* Contenu textuel */}
      <span className="relative z-10 flex items-center">
        <span className="mr-1">⚡</span>
        <span>AI Powered</span>
      </span>

      {/* Sparkles animés */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkleStyles.map((style, i) => (
          <span
            key={i}
            className={`
              absolute rounded-full bg-white/90
              animate-sparkle
              ${glow ? 'opacity-100' : 'opacity-0'}
              transition-opacity duration-500
            `}
            style={style}
          />
        ))}
      </span>

      {/* Effet de hover */}
      <span className={`
        absolute inset-0 bg-white/10
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      `} />
    </span>
  );
}

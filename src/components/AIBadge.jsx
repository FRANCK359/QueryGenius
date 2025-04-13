import React, { useEffect, useState } from 'react';
import '../index.css';

export default function AIBadge({ small = false, pulse = true }) {
  const [glow, setGlow] = useState(false);
  const [sparkles, setSparkles] = useState(4);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!pulse) return;

    const interval = setInterval(() => {
      setGlow(prev => !prev);
      setSparkles(Math.floor(Math.random() * 4) + 3);
    }, 3500);

    return () => clearInterval(interval);
  }, [pulse]);

  const handleClick = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 200);
  };

  return (
    <span
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold tracking-widest uppercase 
      transition-all duration-300 cursor-pointer rounded-full border border-indigo-500 
      text-indigo-300 shadow-lg backdrop-blur-md 
      ${small ? 'text-xs px-3 py-1' : 'text-sm'} 
      ${glow && isAnimating ? 'animate-glow' : ''}`}
      onClick={handleClick}
    >
      {pulse && <span className="absolute -inset-px rounded-full animate-ping-glow z-0" />}
      <span className="relative z-10">AI Powered</span>
      <span className="absolute inset-0 pointer-events-none z-0">
        {[...Array(sparkles)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-70 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 6}px`,
              height: `${Math.random() * 6 + 6}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </span>
    </span>
  );
}

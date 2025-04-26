import React, { useEffect, useState } from 'react';

// Phrases définies hors du composant pour éviter les dépendances inutiles
const phrases = [
  "Bienvenue sur QueryGenius, votre moteur de recherche IA.",
  "L'intelligence artificielle au service de votre curiosité.",
  "Explorez le futur de la recherche avec QueryGenius.",
  "Posez votre question, l'IA trouve la réponse.",
  "Un moteur de recherche repensé, boosté par l'IA.",
  "Obtenez des réponses plus pertinentes, plus rapides, plus intelligentes.",
];

const TypingEffect = ({ speed = 70 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + phrase[i]);
      i++;
      if (i === phrase.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <h2 className="text-xl md:text-2xl font-mono text-blue-500 dark:text-blue-400 mb-4 animate-fadeIn">
      {displayedText}
      <span className="animate-blink ml-1">|</span>
    </h2>
  );
};

export default TypingEffect;

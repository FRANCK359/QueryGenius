import React from 'react';

export default function Loader() {
  return (
    <div className="loader">
      <div className="ai-loader">
        <div className="ai-particle"></div>
        <div className="ai-particle"></div>
        <div className="ai-particle"></div>
      </div>
      <div className="loader-text">Analyse en cours par l'IA...</div>
    </div>
  );
}
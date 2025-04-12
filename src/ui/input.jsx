import React, { useState, useEffect } from "react";
import { Search, Cpu, Mic, X } from "lucide-react";

export function Input({ value, onChange, placeholder, className = "", onSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleClear = () => {
    setInputValue('');
    onChange({ target: { value: '' } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Simulation de la reconnaissance vocale
    setTimeout(() => {
      setIsListening(false);
      const voiceText = "Exemple de reconnaissance vocale";
      setInputValue(voiceText);
      onChange({ target: { value: voiceText } });
    }, 2000);
  };

  return (
    <div className={`search-container ${className}`}>
      <div className="search-wrapper">
        <div className="input-with-icons">
          <Cpu className="icon-left" />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="search-input"
            aria-label="Recherche"
          />
          {inputValue && (
            <button onClick={handleClear} className="clear-button" aria-label="Effacer">
              <X size={18} />
            </button>
          )}
          <button 
            onClick={startVoiceRecognition} 
            className={`voice-button ${isListening ? 'listening' : ''}`}
            aria-label="Recherche vocale"
          >
            <Mic size={18} />
          </button>
          <button 
            onClick={() => onSearch && onSearch(inputValue)} 
            className="search-button"
            aria-label="Lancer la recherche"
          >
            <Search className="icon-right" />
          </button>
        </div>
        
        <div className="ai-hints">
          <span>Essayez : "Applications IA dans la santé"</span>
          <span>"Dernières tendances tech 2025"</span>
        </div>
      </div>
    </div>
  );
}
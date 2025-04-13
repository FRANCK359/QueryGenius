import React, { useState, useEffect, useCallback } from "react";
import { Search, Cpu, Mic, X, Camera } from "lucide-react";
import QrReader from "react-qr-scanner";

export function Input({ value, onChange, placeholder, className = "", onSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue.length > 2) {
      setSuggestions([
        `Essayez : "${inputValue} dans la santé"`,
        `"Dernières tendances ${inputValue} 2025"`,
        `"Applications ${inputValue} dans la tech"`,
      ]);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
    onChange(e);
    setSelectedSuggestion(null); // Reset selected suggestion when typing
  }, [onChange]);

  const handleClear = () => {
    setInputValue('');
    onChange({ target: { value: '' } });
    setSelectedSuggestion(null); // Reset suggestion when clearing input
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceText = "Exemple de reconnaissance vocale";
      setInputValue(voiceText);
      onChange({ target: { value: voiceText } });
    }, 2000);
  };

  const handleScan = (data) => {
    if (data) {
      setInputValue(data);
      onChange({ target: { value: data } });
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Error:", err);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange({ target: { value: suggestion } });
    setSuggestions([]); // Clear suggestions after selecting one
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
            autoFocus
          />
          
          {inputValue && (
            <button
              onClick={handleClear}
              className="clear-button"
              aria-label="Effacer"
            >
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

          <button
            onClick={() => setIsScanning(true)}
            className="scan-button"
            aria-label="Scanner un QR code"
          >
            <Camera size={18} />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="ai-hints">
            {suggestions.map((suggestion, index) => (
              <span
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`suggestion ${selectedSuggestion === suggestion ? 'selected' : ''}`}
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}

        {isScanning && (
          <div className="qr-scanner-container">
            <QrReader
              delay={300}
              style={{ width: '100%', height: 'auto' }}
              onError={handleError}
              onScan={handleScan}
            />
            <button
              onClick={() => setIsScanning(false)}
              className="close-scanner-button"
            >
              Fermer le scanner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

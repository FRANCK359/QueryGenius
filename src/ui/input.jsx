import React, { useState, useEffect, useCallback } from "react";
import { Search, Cpu, Mic, X, Camera } from "lucide-react"; // X correctement importé
import QrReader from "react-qr-scanner";

export function Input({ value, onChange, placeholder, className = "", onSearch }) {
  const [inputValue, setInputValue] = useState(value);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length > 2) {
        setSuggestions([
          `"${inputValue} dans la santé"`,
          `Tendances ${inputValue} 2025`,
          `Tech ${inputValue}`,
        ]);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
    onChange(e);
  }, [onChange]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange({ target: { value: '' } });
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
    setErrorMessage("Erreur de scan QR. Réessayez.");
    console.error("QR Error:", err);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange({ target: { value: suggestion } });
    setSuggestions([]);
  };

  return (
    <div className={`relative z-10 w-full px-2 ${className}`}>
      {/* Input Principal */}
      <div className="relative flex items-center w-full bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        {/* Icône CPU */}
        <div className="absolute left-3 text-gray-500 dark:text-gray-400">
          <Cpu className="w-5 h-5" />
        </div>

        {/* Champ de saisie */}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full py-3 pl-10 pr-12 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
          aria-label="Recherche"
        />

        {/* Bouton Effacer (conditionnel) */}
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-10 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Effacer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Bouton Recherche (toujours visible) */}
        <button
          onClick={() => onSearch && onSearch(inputValue)}
          className="absolute right-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
          aria-label="Rechercher"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Boutons supplémentaires (apparaissent seulement quand l'input est focus) */}
      {(isFocused || inputValue.length > 0) && (
        <div className="flex justify-center space-x-4 mt-2 px-2">
          <button
            onClick={startVoiceRecognition}
            className={`p-2 rounded-full ${isListening 
              ? 'bg-red-100 text-red-500 dark:bg-red-900/30' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} 
              flex items-center justify-center`}
            aria-label="Recherche vocale"
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 text-xs sm:text-sm">Voix</span>
          </button>

          <button
            onClick={() => setIsScanning(true)}
            className="p-2 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex items-center justify-center"
            aria-label="Scanner QR"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 text-xs sm:text-sm">QR</span>
          </button>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && isFocused && (
        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Message d'erreur */}
      {errorMessage && (
        <div className="mt-1 text-xs text-red-500 dark:text-red-400 px-2">
          {errorMessage}
        </div>
      )}

      {/* Overlay Scanner QR */}
      {isScanning && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
          <div className="w-full max-w-xs sm:max-w-md bg-black rounded-lg overflow-hidden">
            <QrReader
              delay={300}
              style={{ width: '100%' }}
              onError={handleError}
              onScan={handleScan}
            />
            <div className="p-3 bg-black flex justify-center">
              <button
                onClick={() => setIsScanning(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 text-sm sm:text-base"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
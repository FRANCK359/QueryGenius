import React from "react";
import { Search, Cpu } from "lucide-react"; // Icônes modernes

export function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <div className={`search-container ${className}`}>
      <div className="search-wrapper">
        <div className="input-with-icons">
          <Cpu className="icon-left" />
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="search-input"
          />
          <Search className="icon-right" />
        </div>
        <button className="ai-search-button">
          <span className="ai-icon">🔍</span> Rechercher
        </button>
      </div>
    </div>
  );
}

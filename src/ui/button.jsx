import React from "react";

export function Button({ onClick, children, className = "", disabled }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined} // Empêche l'exécution si désactivé
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
      } ${className}`}
    >
      {children}
    </button>
  );
}

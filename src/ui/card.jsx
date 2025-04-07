import React from 'react';

// Composant Card
export function Card({ children, className }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

// Composant CardContent
export function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

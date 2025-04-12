import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className, hoverEffect = true }) {
  return (
    <motion.div
      className={`card ${className}`}
      whileHover={hoverEffect ? { 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, badge, date }) {
  return (
    <div className="card-header">
      <div className="card-title-wrapper">
        <h3 className="card-title">{title}</h3>
        {badge && <span className="card-badge">{badge}</span>}
      </div>
      {date && <span className="card-date">{date}</span>}
    </div>
  );
}

export function CardFooter({ tags, action }) {
  return (
    <div className="card-footer">
      <div className="card-tags">
        {tags.map((tag, index) => (
          <span key={index} className="card-tag">{tag}</span>
        ))}
      </div>
      {action && <button className="card-action">{action}</button>}
    </div>
  );
}
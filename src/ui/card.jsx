import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { BrainCircuit } from 'lucide-react'; // Icône IA stylée

export function Card({ children, className, hoverEffect = true }) {
  return (
    <motion.div
      className={classNames(
        'rounded-2xl p-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-lg',
        'transition-all duration-300 text-white',
        className
      )}
      whileHover={
        hoverEffect
          ? {
              y: -6,
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              scale: 1.02,
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
};

Card.defaultProps = {
  className: '',
  hoverEffect: true,
};

export function CardContent({ children, className }) {
  return (
    <div className={classNames('text-sm md:text-base space-y-3', className)}>
      {children}
    </div>
  );
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.defaultProps = {
  className: '',
};

export function CardHeader({ title, badge, date, showIcon = true }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {showIcon && <BrainCircuit size={20} className="text-blue-400 animate-pulse" />}
        <h3 className="text-lg font-semibold">{title}</h3>
        {badge && (
          <span className="ml-2 text-xs px-2 py-0.5 bg-purple-600 rounded-full text-white font-medium">
            {badge}
          </span>
        )}
      </div>
      {date && <span className="text-xs text-gray-300">{date}</span>}
    </div>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.node,
  date: PropTypes.string,
  showIcon: PropTypes.bool,
};

CardHeader.defaultProps = {
  badge: null,
  date: null,
  showIcon: true,
};

export function CardFooter({ tags, action }) {
  return (
    <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-white/10 text-blue-200 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            {tag}
          </span>
        ))}
      </div>
      {action && (
        <motion.div whileTap={{ scale: 0.95 }} className="ml-2">
          {action}
        </motion.div>
      )}
    </div>
  );
}

CardFooter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.node,
};

CardFooter.defaultProps = {
  action: null,
};

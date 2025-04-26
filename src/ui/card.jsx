import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export const Card = React.forwardRef(
  ({ children, className, variant = 'primary', hoverEffect = true, ...props }, ref) => {
    const baseClasses = `
      rounded-2xl p-6 backdrop-blur-md shadow-lg transition-all duration-300
      ${variant === 'primary' 
        ? 'bg-white/10 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/50' 
        : variant === 'secondary' 
        ? 'bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50' 
        : 'bg-white dark:bg-gray-800 shadow-xl border border-transparent'
      }
      ${hoverEffect ? 'hover:shadow-xl' : ''}
    `;

    return (
      <motion.div
        ref={ref}
        className={`${baseClasses} ${className}`}
        whileHover={
          hoverEffect
            ? {
                y: -4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                scale: 1.02,
              }
            : {}
        }
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'elevated']),
  hoverEffect: PropTypes.bool,
};

export const CardContent = ({ children, className, padding = 'md' }) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`text-sm md:text-base space-y-4 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export const CardHeader = ({ title, badge, date, showIcon = true, glow = false }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {showIcon && (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <BrainCircuit 
              size={22} 
              className={`text-blue-500 dark:text-purple-400 ${glow ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : ''}`} 
            />
          </motion.div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-2 text-xs px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium inline-block"
            >
              {badge}
            </motion.span>
          )}
        </div>
      </div>
      {date && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {date}
        </span>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.node,
  date: PropTypes.string,
  showIcon: PropTypes.bool,
  glow: PropTypes.bool,
};

export const CardFooter = ({ tags = [], action = null, align = 'between' }) => {
  const alignmentClasses = {
    between: 'justify-between',
    start: 'justify-start',
    end: 'justify-end'
  };

  return (
    <div className={`flex mt-6 pt-4 border-t border-white/10 dark:border-gray-700/50 ${alignmentClasses[align]}`}>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 text-xs bg-white/20 dark:bg-gray-700/50 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-default"
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      )}
      {action && (
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`${align === 'between' && tags.length > 0 ? 'ml-auto' : ''} ${align === 'start' ? 'ml-4' : ''}`}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
};

CardFooter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.node,
  align: PropTypes.oneOf(['between', 'start', 'end']),
};

export const CardHighlight = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 dark:border-purple-400/20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-400/10 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-400/10 rounded-tr-full" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

CardHighlight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
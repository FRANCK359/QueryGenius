import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Button = React.forwardRef(
  ({ 
    onClick, 
    children, 
    className = "", 
    disabled = false, 
    type = "button", 
    icon = true,
    variant = "primary"
  }, ref) => {
    
    // Configuration des variants de style
    const variantsConfig = {
      primary: {
        base: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600",
        hover: "hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500",
        active: "active:from-blue-700 active:via-purple-700 active:to-indigo-700",
        shadow: "shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40",
        iconColor: "text-purple-200"
      },
      secondary: {
        base: "bg-gradient-to-br from-gray-800 to-gray-900",
        hover: "hover:from-gray-700 hover:to-gray-800",
        active: "active:from-gray-900 active:to-gray-950",
        shadow: "shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30",
        iconColor: "text-gray-300"
      },
      danger: {
        base: "bg-gradient-to-br from-red-500 to-pink-600",
        hover: "hover:from-red-400 hover:to-pink-500",
        active: "active:from-red-600 active:to-pink-700",
        shadow: "shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
        iconColor: "text-pink-200"
      }
    };

    const currentVariant = variantsConfig[variant] || variantsConfig.primary;

    const baseClasses = `
      inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl font-medium
      transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]
      border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
      text-white tracking-wide whitespace-nowrap
      ${currentVariant.base} ${currentVariant.hover} ${currentVariant.active} ${currentVariant.shadow}
      ${disabled ? 'opacity-70 cursor-not-allowed grayscale-[50%]' : ''}
      backdrop-blur-md bg-opacity-90
      relative overflow-hidden
    `;

    // Animation variants
    const motionVariants = {
      hover: { 
        scale: 1.05,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
      },
      tap: { 
        scale: 0.97,
        boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        whileHover={!disabled ? "hover" : {}}
        whileTap={!disabled ? "tap" : {}}
        variants={motionVariants}
        className={`${baseClasses} ${className}`}
      >
        {/* Effet de lumière au survol */}
        {!disabled && (
          <motion.span
            className="absolute inset-0 bg-white/10 opacity-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
          />
        )}

        {/* Contenu du bouton */}
        <span className="relative z-10 flex items-center gap-2">
          {icon && (
            <motion.span 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Sparkles 
                size={18} 
                className={`${currentVariant.iconColor} ${disabled ? 'opacity-60' : ''}`} 
              />
            </motion.span>
          )}
          {children}
        </span>

        {/* Effet de bordure animée */}
        {!disabled && (
          <motion.span
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              backgroundSize: '200% 100%'
            }}
            initial={{ backgroundPosition: '-100% 0' }}
            whileHover={{ 
              backgroundPosition: '100% 0',
              transition: { duration: 1.5, repeat: Infinity }
            }}
          />
        )}
      </motion.button>
    );
  }
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"])
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  disabled: false,
  type: "button",
  icon: true,
  variant: "primary"
};

export default Button;
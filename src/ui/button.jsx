import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Icône IA-style

const variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const Button = React.forwardRef(
  ({ onClick, children, className = "", disabled = false, type = "button", icon = true }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-semibold " +
      "transition-all duration-300 shadow-lg backdrop-blur-sm bg-opacity-80 text-white " +
      "border border-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400";

    const enabledStyle =
      "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-purple-500";
    const disabledStyle =
      "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none";

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        whileHover={!disabled ? "hover" : false}
        whileTap={!disabled ? "tap" : false}
        variants={variants}
        className={`${baseStyle} ${disabled ? disabledStyle : enabledStyle} ${className}`}
      >
        {icon && <Sparkles size={18} className="animate-pulse" />}
        {children}
      </motion.button>
    );
  }
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.bool, // Affiche ou non l’icône
};

Button.defaultProps = {
  className: "",
  disabled: false,
  type: "button",
  icon: true,
};

import React from "react";  
import PropTypes from "prop-types";  

export function Button({ onClick, children, className = "", disabled = false }) {  
  return (  
    <button  
      onClick={!disabled ? onClick : undefined} // Prevents execution if disabled  
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

Button.propTypes = {  
  onClick: PropTypes.func.isRequired,  
  children: PropTypes.node.isRequired,  
  className: PropTypes.string,  
  disabled: PropTypes.bool,  
};  

Button.defaultProps = {  
  className: "",  
  disabled: false,  
};  
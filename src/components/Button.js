import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className, icon }) => {
  const hasText = text && typeof text === 'string' && text.trim() !== '';

  return (
    <button
      className={`btn ${className} rounded-pill fs-8`}
      onClick={onClick}
    >
      {icon && hasText && <i className={`bi bi-${icon} me-2`}></i>}
      {icon && !hasText && <i className={`bi bi-${icon}`}></i>}
      {text && text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default Button;
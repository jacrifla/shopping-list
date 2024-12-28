import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className, icon }) => {
  return (
    <button
      className={`btn ${className} rounded-pill`}
      onClick={onClick}
    >
      {icon && <i className={`bi bi-${icon} me-2`}></i>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default Button;

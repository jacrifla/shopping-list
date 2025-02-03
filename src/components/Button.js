import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className, icon, showText = false, style = {} }) => {
  return (
    <button
      className={`btn ${className} rounded-pill fs-6 fs-lg-3`}
      onClick={onClick}
      style={style}
    >
      {icon && <i className={`bi bi-${icon}`}></i>}
      {text && showText && (
        <span>
          &nbsp;{text}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
  showText: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;
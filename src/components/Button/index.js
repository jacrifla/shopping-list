import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className, icon }) => {
  return (
    <button
      className={`btn ${className} rounded-pill`} // 'rounded-pill' deixa o botão bem arredondado
      onClick={onClick}
    >
      {icon && <span className={`icon-${icon}`} />} {children}
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

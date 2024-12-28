import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children, icon = null, className = '' }) => {
  return (
    <h1 className={className}>
      {icon && <span className={`bi bi-${icon}`} />} {children}
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Title;

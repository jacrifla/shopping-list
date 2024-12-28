import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ children, icon = null, className = '' }) => {
  return (
    <h5 className={className}>
      {icon && <span className={`bi bi-${icon}`} />} {children}
    </h5>
  );
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
};

export default Subtitle;

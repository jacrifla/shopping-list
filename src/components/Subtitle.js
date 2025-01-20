import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ text, icon = null, className = '' }) => {
  return (
    <h5 className={className}>
      {icon && <span className={`bi bi-${icon}`} />} {text}
    </h5>
  );
};

Subtitle.propTypes = {
  text: PropTypes.node.isRequired,
  icon: PropTypes.string,
};

export default Subtitle;

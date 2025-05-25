import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text, icon = null, className = '' }) => {
  return (
    <h1 className={className}>
      {icon && <span className={`bi bi-${icon}`} />} {text}
    </h1>
  );
};

Title.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Title;

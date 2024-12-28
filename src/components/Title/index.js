import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children, icon, className }) => {
  return (
    <h1 className={className}>
      {icon && <span className={`icon-${icon}`} />} {children}
    </h1>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
};

Title.defaultProps = {
  icon: null,
  className: '',
};

export default Title;

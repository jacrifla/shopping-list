import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ text, icon = null, iconClassName = '', className = '' }) => {
  return (
    <div className={`d-flex align-items-center ${className} mb-2`}>
      {icon && (
        <span className={`bi bi-${icon} ${iconClassName} me-2`} />
      )}
      <h5 className="mb-0">{text}</h5>
    </div>
  );
};

Subtitle.propTypes = {
  text: PropTypes.node.isRequired,
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  className: PropTypes.string,
};

export default Subtitle;
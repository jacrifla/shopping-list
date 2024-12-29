import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type = 'text', placeholder = '', value, onChange, icon = null, readOnly = false }) => {
  if (!onChange) {
    console.error('onChange is required for the Input component');
  }

  return (
    <div className="input-group rounded">
      {icon && (
        <span className="input-group-text">
          <i className={`bi bi-${icon} text-primary`}></i>
        </span>
      )}
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;

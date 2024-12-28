import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, placeholder, value, onChange, icon }) => {
  return (
    <div className="input-group rounded">
      {icon && (
        <span className="input-group-text">
          <i className={`bi bi-${icon}`}></i>
        </span>
      )}
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  icon: null,
};

export default Input;

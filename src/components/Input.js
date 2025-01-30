import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type = 'text', placeholder = '', value, onChange, onKeyDown, icon = null, readOnly = false, name = '', maxLength }) => {

  if (!onChange) {
    console.error('Precisa passar o onChange');
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
        name={name}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  maxLength: PropTypes.number,
};

export default Input;

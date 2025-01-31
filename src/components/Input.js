import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  label = '',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  icon = null,
  readOnly = false,
  name = '',
  maxLength,
  autoComplete = '',
}) => {
  if (!onChange) {
    console.error('Precisa passar o onChange');
  }

  return (
    <div className="mb-3">
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <div className="input-group rounded">
        {icon && (
          <span className="input-group-text">
            <i className={`bi bi-${icon} text-primary`}></i>
          </span>
        )}
        <input
          type={type}
          className="form-control"
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          name={name}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
};

export default Input;

import React from 'react';

const Select = ({ label, value, onChange, options, icon, placeholder, ...props }) => {
  return (
    <div className="mb-3">
      {label && <label htmlFor={label} className="form-label">{label}</label>}
      <div className="input-group rounded border-0">
        {icon && (
          <span className="input-group-text">
            <i className={`bi bi-${icon} text-primary`} />
          </span>
        )}
        <select
          id={label}
          className="form-select border-0"
          value={value}
          onChange={onChange}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
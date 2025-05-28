import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
  className = '',
  error
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm text-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
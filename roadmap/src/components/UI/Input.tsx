import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  required?: boolean;
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  min,
  max,
  step,
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
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm text-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
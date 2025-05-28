import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
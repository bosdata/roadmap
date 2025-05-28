import React from 'react';
import { DollarSign } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Daily Saving Monitor' }) => {
  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="h-7 w-7 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden md:block">Track your savings, achieve your goals</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { SparklesIcon, LogoutIcon } from './icons';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center">
        <SparklesIcon className="w-8 h-8 text-blue-400 mr-2" />
        <h1 className="text-xl font-bold text-white">AutoDesign AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white">Automotive Engineer</p>
          <p className="text-xs text-gray-400">user@google.com</p>
        </div>
        <img src="https://picsum.photos/40/40" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-blue-400" />
        <button onClick={onLogout} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
            <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Don't render header at all on login page
  if (currentPath === '/login') {
    return null;
  }

  // Define page titles
  const pageTitles = {
    '/': 'Home',
    '/markets': 'Markets',
    '/journal': 'Trading Journal',
    '/compound': 'Compound Calculator',
    '/settings': 'Settings'
  };

  return (
    <header className="
      w-full px-4 py-3
      bg-black/80 backdrop-blur-lg
      border-b border-white/10
    ">
      <div className="container-fluid">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-lg font-semibold text-white">
            {pageTitles[currentPath] || 'PMGTV'}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

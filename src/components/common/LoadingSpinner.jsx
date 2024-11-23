import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Authenticating...' }) => {
  const spinnerSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity duration-300 flex flex-col items-center justify-center z-50">
      <div className="transform transition-all duration-300 ease-out">
        <div className={`${spinnerSizes[size]} animate-spin`}>
          <div className="h-full w-full rounded-full border-4 border-gray-700 border-t-emerald-500"></div>
        </div>
        {message && (
          <p className="mt-4 text-emerald-500 text-sm font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

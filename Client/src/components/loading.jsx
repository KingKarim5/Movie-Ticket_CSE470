import React from 'react';

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xl text-gray-300">Loading...</p>
    </div>
  );
};

export default loading;

import React from 'react';

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Movie Not Found</h1>
      <p className="text-xl text-gray-600">Sorry, we couldn't find the movie you're looking for.</p>
    </div>
  );
};

export default loading;

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8">
          {/* Netflix-style loading animation */}
          <div className="absolute w-full h-full border-t-4 border-red-600 rounded-full animate-spin"></div>
          <div className="absolute w-full h-full border-r-4 border-transparent rounded-full animate-pulse"></div>
        </div>
        <div className="text-red-600 text-xl font-bold">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;

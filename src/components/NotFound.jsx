import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const user = useSelector(store => store.user);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600">404</h1>
          <div className="text-2xl sm:text-3xl font-bold mt-4 mb-2">Page Not Found</div>
          <p className="text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="bg-transparent hover:bg-gray-800 text-white font-semibold py-3 px-6 border border-gray-600 rounded-md transition-colors duration-300"
          >
            Go to Home
          </Link>
          
          {user && (
            <Link 
              to="/browse"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Go to Browse
            </Link>
          )}
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Lost? Don't worry, we've all been there.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

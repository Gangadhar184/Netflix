import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Error = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-5 sm:p-8">
          <div className="flex justify-center mb-6">
            <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Oops! Something went wrong</h1>

          <p className="text-gray-400 text-center mb-8">
            We're sorry, but we encountered an unexpected error.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-transparent hover:bg-gray-800 text-white font-semibold py-3 px-4 border border-gray-600 rounded-md transition-colors duration-300"
            >
              Go Back
            </button>

            <Link
              to={user ? "/browse" : "/"}
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors duration-300"
            >
              {user ? "Return to Browse" : "Return to Home"}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500 text-center">
            <p>If this problem persists, please try again later or contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

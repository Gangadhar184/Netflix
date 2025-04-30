import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <div className="p-5 sm:p-8">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Something went wrong</h1>

              <p className="text-gray-400 text-center mb-8">
                We're sorry, but there was an error in the application.
              </p>

              <div className="space-y-4">
                <Link
                  to="/"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors duration-300"
                >
                  Return to Home
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500">
                <p className="mb-2">Error details:</p>
                <div className="bg-gray-800 p-3 rounded-md overflow-auto text-xs">
                  <p>{this.state.error && this.state.error.toString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

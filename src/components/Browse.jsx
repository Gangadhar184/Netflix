import React from 'react';
import Header from './Header';

const Browse = () => {

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="relative">
                <Header />
            </div>

            <div className="container mx-auto px-4 pt-24 sm:pt-28 md:pt-32">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Browse Content</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {/* Content placeholders */}
                    {Array(10).fill().map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-md aspect-video animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;

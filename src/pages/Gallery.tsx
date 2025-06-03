import React from 'react';
import { AnimatedImageBackground } from '../components/AnimatedImageBackground';

const galleryImages = Array.from({ length: 30 }, (_, i) => `/images/${i + 1}.jpg`);

const GalleryPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32 relative overflow-hidden">
      <AnimatedImageBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 bg-clip-text text-transparent pb-2">
            AI Room Design Gallery
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore a collection of stunning AI-generated interior designs. Click any image to view larger.
          </p>
        </header>
        {/* Gallery Masonry Layout */}
        {/* Masonry */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 sm:gap-6 bg-black/70 p-4 rounded-xl shadow-2xl [column-fill:_balance]">
          {galleryImages.map((src, index) => (
            <div key={index} className="mb-4 break-inside-avoid rounded-lg shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300 overflow-hidden group cursor-pointer bg-gray-800">
              <img 
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ height: `${180 + (index % 5) * 40}px`, minHeight: '120px', maxHeight: '320px' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-12 md:mt-16">
          More amazing designs coming soon...
        </p>
      </div>
    </div>
  );
};

export default GalleryPage; 
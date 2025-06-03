import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let direction = 1;
    let position = 0;
    
    const animate = () => {
      if (!backgroundRef.current) return;
      
      // Change direction when reaching boundaries
      if (position >= 5) direction = -1;
      if (position <= 0) direction = 1;
      
      position += 0.01 * direction;
      backgroundRef.current.style.transform = `translateX(-${position}%)`;
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Moving background with overlay */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-[105%] h-full bg-cover bg-center transition-transform duration-100 ease-linear"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Discover Our Vision
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8">
          Explore our collection of inspirational designs and innovative creations
        </p>
        <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors duration-300">
          Explore Gallery
        </button>
      </div>
    </section>
  );
};

export default Hero;
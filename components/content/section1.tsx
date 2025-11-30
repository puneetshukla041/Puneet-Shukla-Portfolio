'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Section1 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations immediately after mount
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* BACKGROUND LAYER 
         - duration-[6000ms]: Ultra slow, 6-second cinematic zoom out.
         - object-center: Keeps the focal point centered on all screens.
      */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        {/* Pure image - No dark overlays */}
        <img
          src="/images/psm.png"
          alt="Cinematic Background"
          className={`
            w-full h-full object-cover object-center
            transition-transform duration-[6000ms] ease-out will-change-transform
            ${loaded ? 'scale-100' : 'scale-110'}
          `}
        />
        
        {/* Subtle gradient only at the absolute bottom for the scroll icon */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
      </div>

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
        
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-8">
          
          {/* 1. Top Label - Slow Reveal */}
          <div 
            className={`
              overflow-hidden transition-all duration-[2500ms] delay-700 ease-out
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <span className="inline-block text-xs sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.6em] text-gray-100 uppercase border-b border-white/30 pb-3 font-light shadow-sm drop-shadow-md">
              Welcome To
            </span>
          </div>

          {/* 2. Main Brand - The "Heavy" Element */}
          <div className="relative overflow-hidden py-2">
            <h1 
              className={`
                text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-sans font-black tracking-tighter text-white
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                transition-all duration-[3000ms] delay-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${loaded ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-[110%] opacity-0 blur-lg'}
              `}
            >
              PUNEET SHUKLA
            </h1>
          </div>

          {/* 3. Sub-Brand (FILMS) - The "Elegant" Element */}
          <div 
            className={`
              flex items-center justify-center gap-4 sm:gap-8
              transition-all duration-[3000ms] delay-[1500ms] ease-out
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Left Decorative Line */}
            <div className={`h-[1px] bg-white/70 shadow-lg transition-all duration-[3000ms] delay-[1800ms] ease-out ${loaded ? 'w-12 sm:w-24 md:w-32' : 'w-0'}`} />
            
            <span className="text-xl sm:text-3xl md:text-4xl font-light tracking-[0.4em] sm:tracking-[0.8em] text-gray-100 drop-shadow-lg">
              FILMS
            </span>
            
            {/* Right Decorative Line */}
            <div className={`h-[1px] bg-white/70 shadow-lg transition-all duration-[3000ms] delay-[1800ms] ease-out ${loaded ? 'w-12 sm:w-24 md:w-32' : 'w-0'}`} />
          </div>

        </div>
      </div>

      {/* 4. Scroll Indicator - Subtle Fade In */}
      <div 
        className={`
          absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-30
          transition-all duration-[3000ms] delay-[3000ms]
          ${loaded ? 'opacity-80 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-light text-gray-200 drop-shadow-md">
          Scroll
        </span>
        <div className="animate-bounce p-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg">
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
      </div>

    </section>
  );
};

export default Section1;
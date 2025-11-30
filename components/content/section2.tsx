'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

// 1. FIX: Define the shape of your portfolio item so TypeScript knows what to expect
interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category?: string; // Optional because 'goldenSeries' items don't have this
  subtitle?: string; // Optional because 'portfolioItems' don't have this
  width: number;
  height: number;
}

const defaultCardWidth = 1600;
const defaultCardHeight = 900;
const defaultGoldenWidth = 1600;
const defaultGoldenHeight = 900;

// 2. FIX: Explicitly type the arrays so they match the interface
const portfolioItems: PortfolioItem[] = [
  { id: 1, src: '/images/card1.jpg', title: 'Urban Shadows', category: 'Street', width: defaultCardWidth, height: defaultCardHeight },
  { id: 2, src: '/images/card2.jpg', title: 'Silent Noise', category: 'Portrait', width: defaultCardWidth, height: defaultCardHeight },
  { id: 3, src: '/images/card3.jpg', title: 'Neon Dreams', category: 'Editorial', width: defaultCardWidth, height: defaultCardHeight },
  { id: 4, src: '/images/card4.jpg', title: 'Abstract Reality', category: 'Fine Art', width: defaultCardWidth, height: defaultCardHeight },
  { id: 5, src: '/images/card5.jpg', title: 'Motion & Blur', category: 'Experimental', width: defaultCardWidth, height: defaultCardHeight },
  { id: 6, src: '/images/card6.jpg', title: 'Monochrome Soul', category: 'B&W', width: defaultCardWidth, height: defaultCardHeight },
];

const goldenSeries: PortfolioItem[] = [
  { id: 1, src: '/images/golden1.jpg', title: 'The Golden Hour', subtitle: 'Warmth & Light', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 2, src: '/images/golden2.jpg', title: 'Sun Kissed', subtitle: 'Natural Glow', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 3, src: '/images/golden3.jpg', title: 'Evening Haze', subtitle: 'Atmosphere', width: defaultGoldenWidth, height: defaultGoldenHeight },
  { id: 4, src: '/images/golden4.jpg', title: 'Final Light', subtitle: 'Dusk', width: defaultGoldenWidth, height: defaultGoldenHeight },
];

const Section2 = () => {
  // 3. FIX: Tell useState that the state can be a PortfolioItem OR null
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  return (
    <section id="section-2" className="relative w-full min-h-screen bg-black text-white py-20 sm:py-32">

      {/* ---------------------------------------------------------------------------
          LIGHTBOX MODAL (Cinematic Pop-up)
          --------------------------------------------------------------------------- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-modal-enter"
          onClick={() => setSelectedImage(null)} // Close on background click
        >
          {/* Backdrop with Blur */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" />

          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Content Container */}
          <div 
            className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            <div className="relative w-full h-auto max-h-[80vh] aspect-video shadow-2xl ring-1 ring-white/10 overflow-hidden rounded-sm">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1920}
                height={1080}
                className="w-full h-full object-contain bg-black/50"
              />
            </div>
            
            <div className="mt-6 text-center animate-fade-in-up">
              <p className="text-xs font-bold tracking-[0.3em] text-yellow-500 uppercase mb-2">
                {selectedImage.category || selectedImage.subtitle || 'Selected Work'}
              </p>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}


      {/* ---------------- HEADER ---------------- */}
      <div className="container mx-auto px-6 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-sm font-light tracking-[0.4em] text-gray-400 mb-4 uppercase">
              Selected Works
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-sans">
              Visual Narratives
            </h3>
          </div>
          <p className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed text-right md:text-left">
            A curated collection of moments frozen in time. Exploring the intersection of light, shadow, and human emotion through the lens.
          </p>
        </div>
      </div>

      {/* ---------------- PART 1: THE EDITORIAL GRID (16:9) ---------------- */}
      <div className="container mx-auto px-4 sm:px-6 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              className="group relative cursor-pointer overflow-hidden flex flex-col gap-3"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden bg-gray-900 aspect-video ring-1 ring-white/10"> 
                <Image
                  src={item.src}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] opacity-100" 
                />
              </div>

              {/* Content BELOW Image */}
              <div className="w-full pb-4 border-b border-white/10 group-hover:border-yellow-500 transition-colors duration-500">
                <p className="text-xs font-medium tracking-widest text-yellow-500 uppercase mb-2">
                  {item.category}
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h4>
                  <ArrowUpRight className="w-6 h-6 text-white/50 group-hover:text-yellow-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- DIVIDER / QUOTE ---------------- */}
      <div className="w-full bg-white/5 py-24 sm:py-32 my-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-xl sm:text-3xl md:text-4xl font-light italic text-gray-300 leading-relaxed font-serif">
            &quot;Photography is the story I fail to put into words.&quot;
          </p>
          <div className="w-24 h-[1px] bg-yellow-500 mx-auto mt-8" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ---------------- PART 2: THE GOLDEN SERIES ---------------- */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 border-l-2 border-yellow-500 pl-6">
          <h2 className="text-sm font-light tracking-[0.4em] text-yellow-500 mb-2 uppercase">
            Featured Series
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Golden Hour
          </h3>
        </div>

        <div className="space-y-24">

          {/* Feature 1 */}
          <div 
            className="group relative w-full overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => setSelectedImage(goldenSeries[0])}
          >
             <div className="relative w-full aspect-video overflow-hidden ring-1 ring-white/10">
              <Image
                src={goldenSeries[0].src}
                alt={goldenSeries[0].title}
                width={goldenSeries[0].width}
                height={goldenSeries[0].height}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] opacity-100"
              />
            </div>
            <div className="pt-6 border-b border-white/10 pb-4 group-hover:border-yellow-500/50 transition-colors duration-500">
                <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-black bg-yellow-500 uppercase">
                  Featured Shot
                </span>
              <h4 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                {goldenSeries[0].title}
              </h4>
              <p className="text-md tracking-wider font-light text-gray-400">
                {goldenSeries[0].subtitle}
              </p>
            </div>
          </div>

          {/* Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Card 2 */}
            <div 
              className="group cursor-pointer flex flex-col gap-4"
              onClick={() => setSelectedImage(goldenSeries[1])}
            >
              <div className="overflow-hidden aspect-video relative ring-1 ring-white/10 shadow-lg">
                <Image
                  src={goldenSeries[1].src}
                  alt={goldenSeries[1].title}
                  width={goldenSeries[1].width}
                  height={goldenSeries[1].height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] opacity-100"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-yellow-500/50 transition-colors duration-500">
                <div>
                  <h5 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">{goldenSeries[1].title}</h5>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{goldenSeries[1].subtitle}</p>
                </div>
                <span className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-500">02</span>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className="group cursor-pointer flex flex-col gap-4 md:mt-24"
              onClick={() => setSelectedImage(goldenSeries[2])}
            >
              <div className="overflow-hidden aspect-video relative ring-1 ring-white/10 shadow-lg">
                <Image
                  src={goldenSeries[2].src}
                  alt={goldenSeries[2].title}
                  width={goldenSeries[2].width}
                  height={goldenSeries[2].height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] opacity-100"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-yellow-500/50 transition-colors duration-500">
                <div>
                  <h5 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">{goldenSeries[2].title}</h5>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{goldenSeries[2].subtitle}</p>
                </div>
                <span className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-500">03</span>
              </div>
            </div>
          </div>

          {/* Wide Layout */}
          <div className="py-12 border-t border-neutral-900">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div 
                className="w-full lg:w-3/4 overflow-hidden aspect-video bg-neutral-900 group relative ring-1 ring-white/5 cursor-pointer"
                onClick={() => setSelectedImage(goldenSeries[3])}
              >
                <Image
                  src={goldenSeries[3].src}
                  alt={goldenSeries[3].title}
                  width={goldenSeries[3].width}
                  height={goldenSeries[3].height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] opacity-100"
                />
              </div>
              <div className="w-full lg:w-1/4 space-y-8 relative">
                <div className="hidden lg:block absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent" />
                <div>
                  <span className="block text-xs font-bold text-yellow-600 mb-3 tracking-[0.2em]">FINAL CHAPTER</span>
                  <h4 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-none">{goldenSeries[3].title}</h4>
                  <p className="text-sm text-gray-500 mt-2">{goldenSeries[3].subtitle}</p>
                </div>
                <p className="text-neutral-400 leading-relaxed font-light text-lg">
                  A study of the fleeting moments before darkness. Capturing the raw emotion of the final light.
                </p>
                <button className="text-xs font-bold tracking-[0.2em] text-white border-b border-white pb-1 hover:text-yellow-500 hover:border-yellow-500 transition-colors uppercase pt-4">
                  View Full Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Footer / Connect ---------------- */}
      <div className="w-full border-t border-white/10 pt-20 pb-10 text-center overflow-hidden">
        <h2 
          className="
            text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] 
            font-black text-white 
            tracking-[-0.08em] 
            uppercase 
            drop-shadow-[0_20px_20px_rgba(255,255,255,0.05)] 
            cursor-default select-none
            animate-cinematic-reveal
          "
        >
          PUNEET SHUKLA
        </h2>
        <button className="text-xs font-bold tracking-[0.2em] text-white/50 border-b border-white/50 pb-1 hover:text-yellow-500 hover:border-yellow-500 transition-colors uppercase pt-6">
          Connect for Projects
        </button>
      </div>

      {/* ---------------- CSS ANIMATIONS ---------------- */}
      <style>{`
        @keyframes modal-enter {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out 0.2s forwards;
          opacity: 0;
        }

        @keyframes cinematic-reveal {
          0% { opacity: 0; letter-spacing: 0.5em; filter: blur(10px); transform: scale(0.95); }
          50% { opacity: 0.5; letter-spacing: 0.1em; filter: blur(5px); }
          100% { opacity: 1; letter-spacing: -0.08em; filter: blur(0); transform: scale(1); }
        }
        .animate-cinematic-reveal {
          animation: cinematic-reveal 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0; 
        }
      `}</style>
    </section>
  );
};

export default Section2;
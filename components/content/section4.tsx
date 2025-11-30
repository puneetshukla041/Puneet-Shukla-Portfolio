'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Clapperboard, Award, Camera } from 'lucide-react';

const Section4 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
   
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ---------------------------------------------------------------------------
  // 1. LOADING & SETUP
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const startTimer = setTimeout(() => setShowIntro(true), 500);
      return () => clearTimeout(startTimer);
    }
  }, [isLoading]);

  const handleVideoLoad = () => {
    if (videoRef.current) videoRef.current.defaultMuted = false;
    setProgress(100);
    setTimeout(() => setIsLoading(false), 500);
  };

  // ---------------------------------------------------------------------------
  // 2. PLAYBACK LOGIC
  // ---------------------------------------------------------------------------
  const attemptPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        videoRef.current.volume = 1.0;
        videoRef.current.muted = false; 
        await videoRef.current.play();
        setIsMuted(false); 
      } catch { 
        if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
            setIsMuted(true); 
        }
      }
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) videoRef.current.pause();
  }, []);

  useEffect(() => {
    if (isLoading) return; 
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) attemptPlay();
            else pauseVideo();
        },
        { threshold: 0.5 } 
    );
    if (currentSectionRef) observer.observe(currentSectionRef);
    return () => { if (currentSectionRef) observer.unobserve(currentSectionRef); };
  }, [isLoading, attemptPlay, pauseVideo]); 

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[100dvh] md:h-screen bg-black flex flex-col md:block overflow-hidden"
    >
      
      {/* ---------------------------------------------------------------------------
          VIDEO LAYER (Top 60% Mobile / Full Screen Desktop)
          --------------------------------------------------------------------------- */}
      <div className="relative w-full h-[60%] md:h-full md:absolute md:inset-0 md:z-0 bg-neutral-900 border-b md:border-none border-white/10">
          
         {/* LOADER */}
         <div 
            className={`
                absolute inset-0 z-50 flex flex-col items-center justify-center bg-black
                transition-opacity duration-1000 ease-out
                ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            <Clapperboard className="w-8 h-8 text-neutral-600 animate-pulse mb-4" />
            <div className="h-[1px] w-24 bg-neutral-800">
                <div className="h-full bg-white transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
        </div>

        {/* VIDEO */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoLoad}
        >
          <source src="/videos/herotwo.mp4" type="video/mp4" />
        </video>
        
        {/* OVERLAYS */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none md:hidden" />
        <div className="hidden md:block absolute inset-0 bg-black/30 pointer-events-none" />

        {/* SOUND BUTTON */}
        {!isLoading && (
             <div className="absolute top-4 right-4 md:bottom-12 md:top-auto md:right-12 z-40">
                <button 
                    onClick={toggleSound}
                    className="p-3 md:p-4 rounded-full bg-black/30 md:bg-white/10 backdrop-blur-md border border-white/10 md:border-white/20 text-white/80 md:text-white md:hover:bg-white/20 transition-all"
                >
                    {isMuted ? <VolumeX className="w-4 h-4 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 md:w-6 md:h-6 text-yellow-500 md:text-yellow-400" />}
                </button>
            </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------------
          CONTENT CARD (Bottom 40% Mobile / Full Overlay Desktop)
          --------------------------------------------------------------------------- */}
      <div className="relative w-full h-[40%] md:h-full md:absolute md:inset-0 md:pointer-events-none md:z-10 bg-black md:bg-transparent flex flex-col items-center justify-center px-6 text-center">
            
            {/* Texture (Mobile Only) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none md:hidden" />

            {!isLoading && (
                <div className={`flex flex-col items-center gap-4 md:gap-8 transition-all duration-1000 transform ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Header Line */}
                    <div className="flex items-center gap-3 opacity-60">
                         <div className="h-[1px] w-8 md:w-16 bg-yellow-600/50" />
                         <span className="text-[10px] md:text-sm font-serif italic text-yellow-500 tracking-widest">
                            Official Portfolio Selection
                         </span>
                         <div className="h-[1px] w-8 md:w-16 bg-yellow-600/50" />
                    </div>

                    {/* Title */}
                    <div className="space-y-1 md:space-y-4">
                        <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-neutral-500 md:text-neutral-300 font-sans">
                            Directed & Edited By
                        </p>
                        <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9] md:drop-shadow-2xl">
                            PUNEET<br className="md:hidden"/> <span className="hidden md:inline"> </span>SHUKLA
                        </h1>
                    </div>

                    {/* -----------------------------------------------------------
                      THE PARAGRAPH SECTION (UPDATED)
                      ----------------------------------------------------------- 
                    */}
                    <p className="text-xs md:text-lg text-neutral-400 md:text-neutral-200 font-serif italic leading-relaxed max-w-[85%] md:max-w-2xl mx-auto opacity-80 md:opacity-90">
                        {/* Mobile Text (Delhi) */}
                        <span className="md:hidden">
                            "Echoes of the capital. A raw, unscripted narrative captured in the veins of Delhi."
                        </span>
                        {/* Desktop Text (Original) */}
                        <span className="hidden md:block">
                            "Visualizing the unseen. A showcase of motion, emotion, and technical precision."
                        </span>
                    </p>

                    {/* Footer Icons */}
                    <div className="mt-2 md:mt-8 pt-4 md:pt-0 border-t md:border-none border-white/10 w-full flex justify-center gap-6 md:gap-12">
                        <div className="flex flex-col items-center gap-1">
                            <Camera className="w-3 h-3 md:w-5 md:h-5 text-neutral-500 md:text-neutral-300" />
                            <span className="text-[8px] md:text-[10px] text-neutral-600 md:text-neutral-400 uppercase tracking-wider">Sony Alpha</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Award className="w-3 h-3 md:w-5 md:h-5 text-neutral-500 md:text-neutral-300" />
                            <span className="text-[8px] md:text-[10px] text-neutral-600 md:text-neutral-400 uppercase tracking-wider">Dolby 5.1</span>
                        </div>
                    </div>

                </div>
            )}
      </div>
    </section>
  );
};

export default Section4;
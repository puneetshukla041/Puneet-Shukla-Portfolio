'use client';

import React, { useState, useEffect } from 'react';

// --- Type Definitions ---
type IconProps = React.ComponentProps<'svg'>;

// --- Inline Icon Components ---
const Smartphone = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
const ChevronRight = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);
const Loader2 = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
const Cube = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.12 6.4-9.6-5.52a2 2 0 0 0-2 0l-9.6 5.52A2 2 0 0 0 0 8.12v7.76a2 2 0 0 0 .96 1.72l9.6 5.52a2 2 0 0 0 2 0l9.6-5.52a2 2 0 0 0 .96-1.72V8.12a2 2 0 0 0-.96-1.72zM12 2.7l7.6 4.38-3.32 1.9-7.6-4.38zm-8 4.7L11.6 11.8v8.8L4 16.2zm8.4 13.2v-8.8l7.6-4.38v8.82z"/></svg>
);
const QrCode = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
);

export default function SelectedWorks() {
  const [modelLoaded, setModelLoaded] = useState(false);
  // Ensure this path is correct for your public folder
  const localModelPath = "/models/Machine 1.glb"; 

  const handleARLaunch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const encodedPath = encodeURI(localModelPath);
      const fullModelUrl = `${origin}${encodedPath}`;
      // Android Intent link for Scene Viewer
      const intentLink = `intent://arvr.google.com/scene-viewer/1.0?file=${fullModelUrl}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
      window.location.href = intentLink;
    }
  };

  useEffect(() => {
    // Dynamically load Model Viewer script
    const scriptUrl = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = scriptUrl;
      document.body.appendChild(script);
    }
  }, []);

  // Bypass TypeScript check for custom element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ModelViewer = 'model-viewer' as any;

  return (
    <section className="relative min-h-screen bg-neutral-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white overflow-hidden py-20 lg:py-32 z-10">
      
      {/* Background Ambience - Consistent with Section 2 feel (Darker, neutral) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[0%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-zinc-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-20 lg:mb-32 border-l-2 border-white/10 pl-6">
          <h2 className="text-sm md:text-base font-mono text-zinc-500 mb-2 tracking-widest uppercase">
            Professional Experience
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Selected Works.
          </h3>
        </div>

        {/* --- PROJECT SHOWCASE: SSI MANTRA --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left: Content & Narrative */}
          <div className="lg:w-5/12 space-y-8 order-2 lg:order-1">
            
            {/* Project Metadata */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-400">Web AR</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-400">3D Interactive</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-400">Medical Tech</span>
            </div>

            {/* Logo & Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-90">
                {/* CHANGE 1: Removed grayscale class for full color logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/ssilogo.png" alt="SS Innovations" className="h-10 w-auto" />
                <span className="text-sm font-medium tracking-tight text-zinc-300">SS Innovations</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Mantra 3 <br/>
                <span className="text-zinc-500">Immersive Experience</span>
              </h1>
            </div>

            {/* Narrative Description */}
            <div className="space-y-4 text-zinc-400 leading-relaxed font-light">
              <p>
                Bridging the gap between physical networking and digital exploration. We developed a seamless <strong>WebAR ecosystem</strong> accessed via QR codes embedded on executive visiting cards.
              </p>
              <p>
                Surgeons can scan a card to instantly project the <span className="text-white font-normal">SSI Mantra 3 Surgical Robot</span> into their own operating theaters using Augmented Reality (Mobile), or inspect the high-fidelity engineering in 360° detail on their workstations (Desktop).
              </p>
            </div>

            {/* User Flow / How it works */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-white/10">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <QrCode className="w-4 h-4 text-zinc-500"/> 1. Scan
                  </div>
                  <p className="text-xs text-zinc-500">User scans the unique QR code on the visiting card.</p>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Cube className="w-4 h-4 text-zinc-500"/> 2. Visualize
                  </div>
                  <p className="text-xs text-zinc-500">Instant 3D model loads without app installation.</p>
               </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#"
                onClick={handleARLaunch}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <Smartphone className="w-5 h-5" />
                <span>Launch AR Experience</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <p className="text-[10px] text-zinc-600 mt-3 ml-1">
                *AR features require a compatible mobile device (Android/iOS). Desktop users will see the 3D interactive view.
              </p>
            </div>
          </div>

          {/* Right: The Interactive 3D Model */}
          <div className="lg:w-7/12 w-full order-1 lg:order-2">
            <div className="relative h-[400px] md:h-[500px] lg:h-[650px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-white/5 to-black border border-white/10 shadow-2xl">
              
              {/* Decorative UI Elements (Mac Traffic Lights) */}
              <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Loader */}
              <div 
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950 transition-opacity duration-700 ${modelLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Loading Assets...</p>
              </div>

              {/* The Model Viewer */}
              <ModelViewer
                src={encodeURI(localModelPath)}
                ios-src="" // Add USDZ file path here for better iOS support if available
                poster="" // Add a JPG poster image here for faster initial load aesthetic
                alt="SS Innovations Surgical Robot"
                shadow-intensity="2"
                camera-controls
                auto-rotate
                // CHANGE 2: Increased rotation speed (default is usually around 30deg/s)
                rotation-per-second="60deg/s"
                ar
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                ref={(ref: HTMLElement | null) => {
                  if (ref) ref.addEventListener('load', () => setModelLoaded(true));
                }}
              >
                 <div slot="progress-bar"></div> 
              </ModelViewer>

              {/* Overlay Badge */}
              <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full pointer-events-none">
                 <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest flex items-center gap-2">
                    <Cube className="w-3 h-3"/> Interactive Preview
                 </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
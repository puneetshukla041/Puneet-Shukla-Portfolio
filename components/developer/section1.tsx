'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Section1 = () => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  
  // The content is short, simple, and coded.
  const codeLines = [
    'const developer = {',
    '  name: "Puneet Shukla",',
    '  role: "Software Developer"',
    '};'
  ];

  // Progressive typing effect for a "live code" feel
  useEffect(() => {
    let delay = 0;
    
    // Line 1
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setLine1(codeLines[0].substring(0, i + 1));
        i++;
        if (i > codeLines[0].length) clearInterval(interval);
      }, 50);
    }, delay);

    // Line 2
    delay += codeLines[0].length * 50 + 300;
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setLine2(codeLines[1].substring(0, i + 1));
        i++;
        if (i > codeLines[1].length) clearInterval(interval);
      }, 30);
    }, delay);

    // Line 3
    delay += codeLines[1].length * 30 + 300;
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setLine3(codeLines[2].substring(0, i + 1));
        i++;
        if (i > codeLines[2].length) clearInterval(interval);
      }, 30);
    }, delay);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#050505] text-gray-300 font-mono flex flex-col items-center justify-center overflow-hidden selection:bg-white selection:text-black">
      
      {/* Subtle Background Grid - barely visible for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="z-10 w-full max-w-3xl px-6 md:px-0">
        
        {/* 1. Top Bar (Minimal File Tab) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-12 text-xs text-gray-500 tracking-widest uppercase"
        >
          <Terminal size={14} />
          <span>/ developer / intro.ts</span>
        </motion.div>

        {/* 2. The Code Block (Main Content) */}
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          
          {/* Line 1: Definition */}
          <div className="flex items-center">
            <span className="text-gray-500 mr-4 text-lg md:text-2xl select-none">1</span>
            <span className="text-purple-300/80">{line1}</span>
          </div>

          {/* Line 2: Name */}
          <div className="flex items-center mt-2">
            <span className="text-gray-500 mr-4 text-lg md:text-2xl select-none">2</span>
            <span className="ml-8 md:ml-12 text-white">
              {line2}
            </span>
          </div>

          {/* Line 3: Role */}
          <div className="flex items-center mt-2">
            <span className="text-gray-500 mr-4 text-lg md:text-2xl select-none">3</span>
            <span className="ml-8 md:ml-12 text-white">
              {line3}
            </span>
            {/* Blinking Cursor */}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-10 md:h-14 bg-gray-400 ml-2 inline-block align-middle"
            />
          </div>

          {/* Closing Bracket (Static) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="flex items-center mt-2"
          >
            <span className="text-gray-500 mr-4 text-lg md:text-2xl select-none">4</span>
            <span className="text-purple-300/80">{`};`}</span>
          </motion.div>

        </div>

        {/* 3. Minimal Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="mt-20 flex items-center gap-8"
        >
          <button className="text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            Read Documentation
          </button>
          <button className="text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            Run Code
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Section1;
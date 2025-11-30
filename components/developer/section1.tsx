'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, FileText, CheckCircle2, Loader2 } from 'lucide-react';

const Section1 = () => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  
  // State for "Run Code" functionality
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [codeStatus, setCodeStatus] = useState<'idle' | 'running' | 'success'>('idle');

  const codeLines = [
    'const developer = {',
    '  name: "Puneet Shukla",',
    '  role: "Software Developer"',
    '};'
  ];

  // Initial Typing Effect
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

  // --- Button Handlers ---

  const handleReadDocs = () => {
    // Looks for a section with id "section2" and scrolls to it
    const section2 = document.getElementById('section2');
    if (section2) {
      section2.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Section 2 not found. Make sure the next component has id='section2'");
      // Fallback scroll if ID is missing
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleRunCode = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setIsTerminalOpen(true);
    setCodeStatus('running');
    setTerminalLogs([]); // Clear previous logs

    const logs = [
      { text: "> initializing build environment...", delay: 400 },
      { text: "> resolving dependencies...", delay: 1200 },
      { text: "> compiling developer profile...", delay: 2000 },
      { text: "> build successful. [200ms]", delay: 2800 },
      { text: "> starting interface...", delay: 3500 },
    ];

    logs.forEach(({ text, delay }) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, text]);
      }, delay);
    });

    // Finish animation
    setTimeout(() => {
      setIsRunning(false);
      setCodeStatus('success');
    }, 4000);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-gray-300 font-mono flex flex-col items-center justify-center overflow-hidden selection:bg-white selection:text-black p-4">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="z-10 w-full max-w-3xl">
        
        {/* Top Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-12 text-xs text-gray-500 tracking-widest uppercase"
        >
          <Terminal size={14} />
          <span>/ developer / intro.ts</span>
          
          {/* Status Indicator */}
          <div className="ml-auto flex items-center gap-2">
            {codeStatus === 'running' && <span className="flex items-center gap-1 text-yellow-500"><Loader2 size={10} className="animate-spin"/> Compiling</span>}
            {codeStatus === 'success' && <span className="flex items-center gap-1 text-green-500"><CheckCircle2 size={10}/> Live</span>}
          </div>
        </motion.div>

        {/* Code Block */}
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-16">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4 text-lg md:text-2xl select-none">1</span>
            <span className="text-purple-300/80">{line1}</span>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-gray-600 mr-4 text-lg md:text-2xl select-none">2</span>
            <span className={`ml-8 md:ml-12 transition-colors duration-500 ${codeStatus === 'success' ? 'text-green-400' : 'text-white'}`}>
              {line2}
            </span>
          </div>

          <div className="flex items-center mt-2">
            <span className="text-gray-600 mr-4 text-lg md:text-2xl select-none">3</span>
            <span className={`ml-8 md:ml-12 transition-colors duration-500 ${codeStatus === 'success' ? 'text-green-400' : 'text-white'}`}>
              {line3}
            </span>
            {codeStatus === 'idle' && (
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-10 md:h-14 bg-gray-400 ml-2 inline-block align-middle"
              />
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="flex items-center mt-2"
          >
            <span className="text-gray-600 mr-4 text-lg md:text-2xl select-none">4</span>
            <span className="text-purple-300/80">{`};`}</span>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="flex items-center gap-8 mb-8"
        >
          <button 
            onClick={handleReadDocs}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            <FileText size={14} className="group-hover:scale-110 transition-transform" />
            Read Documentation
          </button>
          
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className={`group flex items-center gap-2 text-sm border-b pb-1 transition-all
              ${isRunning ? 'text-gray-600 border-transparent cursor-wait' : 'text-gray-400 hover:text-green-400 border-transparent hover:border-green-400 cursor-pointer'}
            `}
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} className="group-hover:fill-green-400 transition-colors" />}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </motion.div>

        {/* Terminal Output Window */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="flex items-center px-4 py-2 bg-[#0f0f0f] border-b border-gray-800 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                <span className="ml-2 text-xs text-gray-500 font-sans">Output</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-1 text-gray-400 h-40 overflow-y-auto">
                {terminalLogs.map((log, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={log.includes("success") ? "text-green-400" : ""}
                  >
                    {log}
                  </motion.div>
                ))}
                {codeStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-cyan-400 mt-2"
                  >
                    {`>`} Welcome, User. Scroll down to explore.
                    <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 align-middle animate-pulse"/>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Section1;
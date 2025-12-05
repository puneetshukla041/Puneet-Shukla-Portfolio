'use client';

import React from 'react';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[#030303]"></div>

      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Glow Orbs - Fixed position so they don't scroll away immediately */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
    </div>
  );
};

export default GlobalBackground;
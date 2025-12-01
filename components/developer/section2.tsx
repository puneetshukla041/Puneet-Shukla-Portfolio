'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Types ---
interface ThemeColors {
  name: string;
  primary: string;     // Main text color
  secondary: string;   // Sub text / Border
  gradient: string;    // CSS Gradient string
  shadow: string;      // Glow color for shadows
  spotlight: string;   // The hover spotlight color (hex/rgb)
}

interface TimelineData {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  type: 'Full-time' | 'Internship' | 'Education';
  description: string;
  points: string[];
  tech: string[];
  current?: boolean;
  theme: ThemeColors;
}

// --- Data ---
const rawTimelineData: TimelineData[] = [
  {
    id: 'ssi',
    role: "Software Engineer",
    company: "SS Innovations",
    period: "Apr 2025 - Present",
    location: "Gurugram, India",
    logo: "/logos/ssi.jpeg",
    type: "Full-time",
    description: "Architecting the next generation of surgical robotics software and ecosystem platforms.",
    points: [
      "Spearheaded 'SSI Studios', an enterprise-grade creative platform.",
      "Engineered high-performance UI engines reducing render time by 40%.",
      "Standardized the frontend architecture across the SSI ecosystem."
    ],
    tech: ["Next.js", "React Native", "System Design"],
    current: true,
    theme: {
      name: "cyan",
      primary: "text-cyan-400",
      secondary: "border-cyan-500/20",
      gradient: "from-cyan-400 to-teal-400",
      shadow: "rgba(34, 211, 238, 0.15)",
      spotlight: "rgba(34, 211, 238, 0.15)"
    }
  },
  {
    id: 'disney',
    role: "SDE Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    location: "Remote",
    logo: "/logos/disney.webp",
    type: "Internship",
    description: "Backend scalability for one of the world's largest streaming platforms during ICC World Cup.",
    points: [
      "Optimized high-throughput APIs serving 50M+ concurrent users.",
      "Enhanced the Messenger Service architecture for real-time delivery.",
      "Reduced database latency by optimizing Redis caching strategies."
    ],
    tech: ["Go", "Kafka", "Redis"],
    theme: {
      name: "indigo",
      primary: "text-indigo-400",
      secondary: "border-indigo-500/20",
      gradient: "from-indigo-400 to-violet-400",
      shadow: "rgba(129, 140, 248, 0.15)",
      spotlight: "rgba(129, 140, 248, 0.15)"
    }
  },
  {
    id: 'medanta',
    role: "Tech Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    location: "Gurugram",
    logo: "/logos/medanta.png",
    type: "Internship",
    description: "Security compliance and automation for critical healthcare infrastructure.",
    points: [
      "Automated regression testing suites using Python & Selenium.",
      "Audited API endpoints for HIPAA/GDPR security compliance.",
      "Implemented CI/CD pipelines for QA environments."
    ],
    tech: ["Python", "Automation", "Security"],
    theme: {
      name: "rose",
      primary: "text-rose-400",
      secondary: "border-rose-500/20",
      gradient: "from-rose-400 to-red-400",
      shadow: "rgba(251, 113, 133, 0.15)",
      spotlight: "rgba(251, 113, 133, 0.15)"
    }
  },
  {
    id: 'education',
    role: "B.Tech CS",
    company: "GLA University",
    period: "2021 - 2025",
    location: "Mathura",
    logo: "/logos/gla.jpeg",
    type: "Education",
    description: "Specialized in Artificial Intelligence & Machine Learning with focus on Algorithms.",
    points: [
      "Major in AI/ML with Minor in Cloud Computing.",
      "Head of Technical Society; Organized 3 national hackathons.",
      "Published research paper on Neural Networks optimization."
    ],
    tech: ["AI/ML", "DSA", "Research"],
    theme: {
      name: "amber",
      primary: "text-amber-400",
      secondary: "border-amber-500/20",
      gradient: "from-amber-400 to-orange-400",
      shadow: "rgba(251, 191, 36, 0.15)",
      spotlight: "rgba(251, 191, 36, 0.15)"
    }
  }
];

const timelineData = [...rawTimelineData].reverse();

const Section2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"]
  });

  const height = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden font-sans selection:bg-cyan-900 selection:text-white">
      
      {/* --- Advanced Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/5 rounded-full blur-[150px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
             </span>
             <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Career Trajectory</span>
           </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">Future.</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            A timeline of technical evolution, from foundational algorithms to enterprise-scale system architecture.
          </p>
        </motion.div>

        {/* --- The Journey Map --- */}
        <div ref={containerRef} className="relative">
          
          {/* Central Backbone */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 md:translate-x-0 z-0">
             {/* Track */}
             <div className="absolute inset-0 w-full h-full bg-neutral-900"></div>
             {/* Progress Beam */}
             <motion.div 
                style={{ height: useTransform(height, [0, 1], ["0%", "100%"]) }}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-rose-500 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
             />
          </div>

          {/* Cards Stack */}
          <div className="space-y-24 md:space-y-40">
            {timelineData.map((item, index) => (
              <TimelineCard 
                key={item.id} 
                data={item} 
                index={index} 
                isLeft={index % 2 === 0} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Spotlight Card Component ---
const TimelineCard = ({ data, index, isLeft }: { data: TimelineData, index: number, isLeft: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // --- FIX APPLIED HERE: Added ': Variants' type annotation ---
  const cardVariants: Variants = {
    hidden: { opacity: 0, x: isLeft ? -20 : 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''} group perspective-1000`}>
      
      {/* 1. Center Node (The Pivot) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-20 bg-[#050505] rounded-full border border-neutral-800 shadow-xl">
        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${data.current ? 'bg-white shadow-[0_0_10px_white]' : 'bg-neutral-600 group-hover:bg-white'}`} />
        {data.current && <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />}
      </div>

      <div className="hidden md:block w-1/2" />

      {/* 2. The Interactive Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-24' : 'md:pl-24'} relative z-10`}
      >
        
        {/* Animated Drawing Path (The Connector) */}
        <AnimatedConnector isLeft={isLeft} color={data.theme.primary} />

        {/* --- SPOTLIGHT CARD WRAPPER --- */}
        <div 
            className="group/card relative rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Gradient Layer */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/card:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        ${data.theme.spotlight},
                        transparent 80%
                        )
                    `,
                }}
            />
            
            {/* Inner Card Content */}
            <div className="relative h-full p-6 md:p-8 rounded-2xl bg-neutral-900/80 backdrop-blur-xl">
                
                {/* Top Shine */}
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${data.theme.name}-500/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />

                <div className="flex flex-col gap-6">
                    {/* Header: Logo & Titles */}
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                             <div className="relative w-14 h-14 rounded-xl bg-black/40 border border-white/5 p-2 flex items-center justify-center overflow-hidden shadow-inner">
                                <Image src={data.logo} alt={data.company} width={48} height={48} className="object-contain" />
                             </div>
                             <div>
                                <h3 className="text-xl font-bold text-white group-hover/card:text-cyan-50 transition-colors">
                                    {data.role}
                                </h3>
                                <div className={`text-sm font-medium tracking-wide ${data.theme.primary}`}>
                                    {data.company}
                                </div>
                             </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 text-xs font-mono text-neutral-400 bg-white/5 rounded-full border border-white/5">
                            {data.period}
                        </span>
                    </div>

                    {/* Mobile Period */}
                    <span className="sm:hidden text-xs font-mono text-neutral-500">
                        {data.period} • {data.type}
                    </span>

                    {/* Description */}
                    <div className="relative pl-4 border-l-2 border-white/5 group-hover/card:border-white/20 transition-colors">
                        <p className="text-neutral-300 text-sm leading-relaxed font-light">
                            {data.description}
                        </p>
                    </div>

                    {/* Points */}
                    <ul className="space-y-3">
                        {data.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/card:bg-${data.theme.name}-400 transition-colors shadow-[0_0_5px_currentColor]`} />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {data.tech.map((tech, i) => (
                            <span 
                                key={i} 
                                className="px-2.5 py-1 text-[11px] font-medium text-neutral-400 bg-black/40 border border-white/5 rounded hover:text-white hover:border-white/20 transition-all cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

// --- Advanced Drawing Connector ---
const AnimatedConnector = ({ isLeft, color }: { isLeft: boolean, color: string }) => {
    return (
        <div 
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none w-[100px] h-[100px]
            ${isLeft ? '-right-[100px]' : '-left-[100px]'}`}
        >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <motion.path 
                    d={isLeft ? "M 100 50 C 70 50, 30 50, 0 50" : "M 0 50 C 30 50, 70 50, 100 50"}
                    stroke="url(#gradient-connector)" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                />
                
                <motion.circle 
                    cx={isLeft ? "2" : "98"} 
                    cy="50" 
                    r="3" 
                    fill="white"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.2 }}
                />
                
                <defs>
                    <linearGradient id="gradient-connector" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default Section2;
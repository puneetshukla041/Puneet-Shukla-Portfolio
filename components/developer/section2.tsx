'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, Variants, useInView } from 'framer-motion';
// The import for 'next/image' has been removed as it caused a build error.
// We will use standard <img> tags instead.

// --- Types ---
interface ThemeColors {
  name: string;
  primary: string;     // Main text color
  secondary: string;   // Sub text / Border
  gradient: string;    // CSS Gradient string
  shadow: string;      // Glow color for shadows
  spotlight: string;   // The hover spotlight color (hex/rgb)
  dataPacket: string;  // Color of the moving dot
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

// --- Data (Stored: Newest -> Oldest) ---
const rawTimelineData: TimelineData[] = [
  {
    id: 'ssi',
    role: "Software Engineer",
    company: "SS Innovations International, Inc.",
    period: "Apr 2025 - Present",
    location: "Gurugram, India",
    logo: "https://placehold.co/48x48/0f172a/ffffff?text=SSI", // Placeholder for /logos/ssi.jpeg
    type: "Full-time",
    description: "Leading development of advanced web/mobile applications solving real-world problems. My key initiative, 'SSI Studios', is an all-in-one ecosystem designed to empower the organization.",
    points: [
      "Built 'SSI Studios', a creative platform consolidating logo/poster editing and certificate generation.",
      "Designed utilities like ID card makers and image enhancers to empower non-technical staff.",
      "Reduced dependence on external apps, ensuring consistent, branded outputs across the company."
    ],
    tech: ["Next.js", "React Native", "System Design", "CI/CD"],
    current: true,
    theme: {
      name: "cyan",
      primary: "text-cyan-400",
      secondary: "border-cyan-500/20",
      gradient: "from-cyan-400 to-teal-400",
      shadow: "rgba(34, 211, 238, 0.6)", // Stronger shadow
      spotlight: "rgba(34, 211, 238, 0.4)",
      dataPacket: "#22d3ee"
    }
  },
  {
    id: 'disney',
    role: "Software Engineer Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    location: "Bengaluru (Remote)",
    logo: "https://placehold.co/48x48/0f172a/ffffff?text=D+", // Placeholder for /logos/disney.webp
    type: "Internship",
    description: "Backend API development and scalability projects for high-traffic services, ensuring seamless user experiences during peak loads.",
    points: [
      "Supported backend APIs for Messenger Service: audit logging & retry handling.",
      "Enhanced Offer Service scalability via cache loader improvements & partition validations.",
      "Integrated Entitlement SDK with dynamic frontend logic for user entitlements.",
      "Optimized database queries to improve Payments Service scalability."
    ],
    tech: ["Go", "Kafka", "Redis", "Backend API"],
    theme: {
      name: "indigo",
      primary: "text-indigo-400",
      secondary: "border-indigo-500/20",
      gradient: "from-indigo-400 to-violet-400",
      shadow: "rgba(129, 140, 248, 0.6)",
      spotlight: "rgba(129, 140, 248, 0.4)",
      dataPacket: "#818cf8"
    }
  },
  {
    id: 'medanta',
    role: "Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    location: "Gurugram, India",
    logo: "https://placehold.co/48x48/0f172a/ffffff?text=Med", // Placeholder for /logos/medanta.png
    type: "Internship",
    description: "Quality assurance and security compliance for critical healthcare infrastructure.",
    points: [
      "Performed extensive API testing using Postman to validate data integrity.",
      "Managed version control through Git/GitHub for smooth team collaboration.",
      "Designed automated test cases ensuring quality of healthcare applications.",
      "Conducted vulnerability assessments for secure patient data handling."
    ],
    tech: ["Postman", "Python", "QA Automation", "Security"],
    theme: {
      name: "rose",
      primary: "text-rose-400",
      secondary: "border-rose-500/20",
      gradient: "from-rose-400 to-red-400",
      shadow: "rgba(251, 113, 133, 0.6)",
      spotlight: "rgba(251, 113, 133, 0.4)",
      dataPacket: "#fb7185"
    }
  },
  {
    id: 'education',
    role: "B.Tech CS",
    company: "GLA University",
    period: "2021 - 2025",
    location: "Mathura",
    logo: "https://placehold.co/48x48/0f172a/ffffff?text=GLA", // Placeholder for /logos/gla.jpeg
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
      shadow: "rgba(251, 191, 36, 0.6)",
      spotlight: "rgba(251, 191, 36, 0.4)",
      dataPacket: "#fbbf24"
    }
  }
];

// --- ORDER CHANGE: Reverse array to show Education (Oldest) First ---
const timelineData = [...rawTimelineData].reverse();

// --- Tailwind Fix: Ensure dynamic color classes are present for JIT compiler ---
const TailwindFix = () => (
    <div className="hidden
        text-cyan-400 text-indigo-400 text-rose-400 text-amber-400 
        border-cyan-500/20 border-indigo-500/20 border-rose-500/20 border-amber-500/20
        bg-cyan-500 bg-indigo-500 bg-rose-500 bg-amber-500
        group-hover/card:bg-cyan-400 group-hover/card:bg-indigo-400 group-hover/card:bg-rose-400 group-hover/card:bg-amber-400
        text-cyan-200 text-indigo-200 text-rose-200 text-amber-200
        hover:border-cyan-500/50 hover:border-indigo-500/50 hover:border-rose-500/50 hover:border-amber-500/50
    " />
);

// --- SCRAMBLE TEXT COMPONENT (Title Effect) ---
const ScrambleText = ({ text, className, trigger }: { text: string, className?: string, trigger: boolean }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    if (trigger) {
      let iterations = 0;
      const totalDuration = 1000; 
      const intervalTime = 30;
      const totalSteps = totalDuration / intervalTime;

      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iterations >= text.length) clearInterval(interval);
        iterations += (text.length / totalSteps);
      }, intervalTime);

      return () => clearInterval(interval);
    } else {
      setDisplay(text);
    }
  }, [trigger, text]);

  return (
    <span className={`cursor-default ${className}`}>
      {display}
    </span>
  );
};

// --- TYPING EFFECT COMPONENT (AI Generation Effect) ---
const TypingEffect = ({ text, delay, trigger }: { text: string; delay: number; trigger: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (trigger) {
      setDisplayedText(''); 
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, delay);
      return () => clearInterval(interval);
    } else {
        // Optional: Show full text if not triggered but rendered (e.g., initial state)
        setDisplayedText(text);
    }
  }, [text, delay, trigger]);

  // Add a blinking cursor effect at the end
  const cursor = trigger && displayedText.length < text.length ? (
      <span className="animate-pulse opacity-75 inline-block w-1 h-3 bg-white/70 ml-0.5" />
  ) : null;

  return (
    <>
      <span>{displayedText}</span>
      {cursor}
    </>
  );
};

// --- SEQUENTIAL TYPING LIST (For Bullet Points) ---
const TypingList = ({ points, delay, trigger, themeName }: { points: string[]; delay: number; trigger: boolean; themeName: string }) => {
    const [visiblePoints, setVisiblePoints] = useState<boolean[]>(points.map(() => false));

    useEffect(() => {
        if (trigger) {
            let timeout = 0;
            points.forEach((_, index) => {
                // Stagger the reveal of each list item
                setTimeout(() => {
                    setVisiblePoints(prev => {
                        const newPoints = [...prev];
                        newPoints[index] = true;
                        return newPoints;
                    });
                }, timeout);
                // Adjust delay for next item based on point length
                timeout += 500 + points[index].length * 15; 
            });
        } else {
            // Reset state if trigger is false
            setVisiblePoints(points.map(() => false));
        }
    }, [trigger, points]);

    return (
        <ul className="space-y-3">
            {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 group/point">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/card:bg-${themeName}-400 transition-colors shadow-[0_0_5px_currentColor] flex-shrink-0`} />
                    <span className="group-hover/card:text-neutral-300 transition-colors min-h-[1.2rem]">
                        {visiblePoints[i] ? (
                            <TypingEffect text={point} delay={15} trigger={true} />
                        ) : (
                            <span className="opacity-0">{point}</span> // Maintain layout space
                        )}
                    </span>
                </li>
            ))}
        </ul>
    );
}


// --- MAIN SECTION COMPONENT ---
const Section2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start 90%", "end 10%"] 
  });
  
  // Smoothly interpolate the scroll progress for the active line height
  const height = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Parallax for the main header
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="relative w-full min-h-screen py-32 bg-[#000000] overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <TailwindFix />
      
      {/* --- Cyberpunk Grid & Nebula Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle Grid - Sharper lines for professionalism */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]"></div>
        
        {/* Deep Space Glows (Enhanced) */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/15 rounded-full blur-[200px] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/15 rounded-full blur-[200px] opacity-80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Header - Parallax Effect --- */}
        <motion.div 
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 sticky top-16"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.2)]">
             <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
             </span>
             <span className="text-xs font-medium text-cyan-100/70 uppercase tracking-widest">Digital Log Processing</span>
           </div>
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Future</span>
          </h2>
          <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Executing high-level engineering sequences. From foundational algorithms to enterprise-scale system architecture, mapped digitally for analysis.
          </p>
        </motion.div>

        {/* --- The Journey Map --- */}
        <div ref={containerRef} className="relative mt-40">
          
          {/* Central Backbone - Masked for smooth fade out */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 md:translate-x-0 z-0">
             {/* Dim background line */}
             <div className="absolute inset-0 w-full h-full bg-neutral-800/30 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"></div>
             
             {/* Active Scroll Line (Vibrant) */}
             <motion.div 
               style={{ height: useTransform(height, [0, 1], ["0%", "100%"]) }}
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-500 via-rose-500 to-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.9)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_100%)]"
             />
          </div>

          <div className="space-y-32 md:space-y-48">
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

// --- 3D TILT CARD COMPONENT ---
const TimelineCard = ({ data, index, isLeft }: { 
    data: TimelineData, 
    index: number, 
    isLeft: boolean, 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" }); // Trigger when 85% visible

  // Scroll visibility to control scale and opacity (for framer motion entrance)
  const { scrollYProgress: cardScrollY } = useScroll({
    target: cardRef,
    offset: ["start 80%", "center center"] 
  });

  // Scale and opacity effects for entry
  const scale = useTransform(cardScrollY, [0, 1], [0.9, 1]);
  const opacity = useTransform(cardScrollY, [0, 0.5], [0, 1]);
  
  // Text Typing Trigger state (Runs once when in view)
  const [hasViewed, setHasViewed] = useState(false); 
  useEffect(() => {
    if (isInView && !hasViewed) {
      setHasViewed(true);
    }
  }, [isInView, hasViewed]);


  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced 3D rotation, applying stronger tilt
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''} group perspective-1000`}
    >
      
      {/* Center Node / Energy Conduit */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center z-20 bg-[#000000] rounded-full border border-neutral-800 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
      >
        <div className={`w-4 h-4 rounded-full transition-all duration-500 ${data.current ? 'bg-white shadow-[0_0_20px_white]' : `bg-${data.theme.name}-500 group-hover:bg-white`}`} />
        {data.current && <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow" />}
        
        <style jsx>{`
            @keyframes pulse-slow {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.4); opacity: 0.5; }
            }
            .animate-pulse-slow {
                animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        `}</style>
      </motion.div>

      <div className="hidden md:block w-1/2" />

      {/* The 3D Interactive Card Wrapper */}
      <motion.div
        style={{ scale, opacity }}
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-24' : 'md:pl-24'} relative z-10`}
      >
        
        {/* Active Data Connector */}
        <ActiveConnector isLeft={isLeft} color={data.theme.dataPacket} />

        {/* 3D Tilt Container */}
        <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group/card"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* HOLOGRAPHIC BORDER GLOW (Spotlight Effect) */}
            <motion.div 
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" 
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${data.theme.spotlight}, transparent 60%)`,
                    zIndex: 20 
                }}
            />

            {/* HOVER SCANNING LINE (New Sexy Visual) */}
            {isHovered && (
                <motion.div 
                    initial={{ y: '0%', opacity: 0 }}
                    animate={{ y: '100%', opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className={`absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-${data.theme.name}-400 to-transparent z-10`}
                />
            )}

            {/* MAIN GLASS CARD */}
            <div className={`
                relative h-full p-6 md:p-8 rounded-2xl 
                bg-neutral-900/70 backdrop-blur-xl 
                border border-white/10 
                overflow-hidden
                shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
                group-hover/card:shadow-[0_0_40px_-5px_${data.theme.shadow}]
                transition-shadow duration-500
                transform-style: preserve-3d
            `}>
                
                {/* Top Lighting Effect (Visible on Hover) */}
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${data.theme.name}-400/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />

                <div className="flex flex-col gap-6 relative z-10">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="relative w-14 h-14 rounded-xl bg-black/40 border border-white/10 p-2 flex items-center justify-center overflow-hidden shadow-inner group-hover/card:scale-105 transition-transform duration-500">
                                <img 
                                    src={data.logo} 
                                    alt={data.company} 
                                    width={48} 
                                    height={48} 
                                    className="object-contain" 
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = `https://placehold.co/48x48/0f172a/ffffff?text=${data.company.substring(0,2)}`;
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold text-white group-hover/card:${data.theme.primary} transition-colors`}>
                                    <ScrambleText text={data.role} trigger={isHovered} />
                                </h3>
                                <div className={`text-sm font-medium tracking-wide ${data.theme.primary} flex items-center gap-2`}>
                                    {data.company}
                                    {data.current && <span className="inline-block w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"/>}
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block text-right">
                            <div className="text-xs font-mono text-neutral-500 mb-1">{data.type}</div>
                            <div className="px-2 py-1 text-xs font-mono text-neutral-300 bg-white/5 rounded border border-white/5 shadow-inner">
                                {data.period}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Period */}
                    <span className="sm:hidden text-xs font-mono text-neutral-500">
                        {data.period} • {data.type}
                    </span>

                    {/* Description - AI Typing Effect */}
                    <div className="relative pl-4 border-l-2 border-white/5 group-hover/card:border-white/30 transition-colors duration-300 min-h-[50px]">
                        <p className="text-neutral-300 text-sm leading-relaxed font-light">
                            <TypingEffect text={data.description} delay={30} trigger={hasViewed} />
                        </p>
                    </div>

                    {/* Points - Sequential AI Typing Effect */}
                    {/* The min-h is calculated based on 3 points for layout stability */}
                    <div className="min-h-[100px]">
                        <TypingList points={data.points} delay={15} trigger={hasViewed} themeName={data.theme.name} />
                    </div>

                    {/* Tech Stack (Glow on Hover) */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {data.tech.map((tech, i) => (
                            <span 
                                key={i} 
                                className={`
                                    px-3 py-1 text-xs font-medium text-neutral-300
                                    bg-black/40 border border-white/5 rounded-full
                                    hover:text-white hover:border-${data.theme.name}-500/50 hover:shadow-[0_0_15px_-2px_${data.theme.shadow}]
                                    transition-all cursor-default duration-300
                                `}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

// --- Active Data Connector (Particle Flow) ---
const ActiveConnector = ({ isLeft, color }: { isLeft: boolean, color: string }) => {
    return (
        <div 
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none w-[100px] h-[40px] z-0
            ${isLeft ? '-right-[100px]' : '-left-[100px]'}`}
        >
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
                {/* Static Path */}
                <path 
                    d={isLeft ? "M 100 20 L 0 20" : "M 0 20 L 100 20"}
                    stroke={color} 
                    strokeWidth="1"
                    strokeOpacity="0.2"
                />
                
                {/* Moving Particle 1 */}
                <circle r="3" fill={color}>
                    <animateMotion 
                        dur="2s" 
                        repeatCount="indefinite"
                        path={isLeft ? "M 100 20 L 0 20" : "M 0 20 L 100 20"}
                    />
                </circle>

                {/* Moving Particle 2 (Delayed) */}
                <circle r="2" fill={color} opacity="0.6">
                    <animateMotion 
                        dur="2s" 
                        begin="1s"
                        repeatCount="indefinite"
                        path={isLeft ? "M 100 20 L 0 20" : "M 0 20 L 100 20"}
                    />
                </circle>
            </svg>
        </div>
    );
};

export default Section2;
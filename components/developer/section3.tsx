'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Database, Cpu, Layers, Wand2, Lock, CreditCard, FileCheck, Server, 
  ExternalLink, ChevronRight, Copy, CheckCircle2, Layout, Image as ImageIcon, 
  ShieldCheck, PieChart, Move, Smartphone, Globe, Code2, Terminal, 
  Workflow, FileSpreadsheet, AlertTriangle, User, Mail, Bug, 
  BarChart3, Activity, Fingerprint
} from 'lucide-react';

// --- Animation Variants for Smooth Entry ---
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Section3 = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={targetRef} className="relative w-full bg-[#030303] text-neutral-200 py-32 font-sans border-t border-white/5">
      
      {/* --- Cinematic Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[1200px] h-[800px] bg-indigo-900/10 rounded-[100%] blur-[150px] opacity-30 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[800px] bg-cyan-900/10 rounded-[100%] blur-[150px] opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ========================================================
            CHAPTER 1: EXECUTIVE SUMMARY & ACCESS
           ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-20 items-center mb-52">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex-1 space-y-10"
          >
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-4">
               <div className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  Enterprise Architecture
               </div>
               <span className="text-neutral-500 text-sm font-mono tracking-wide flex items-center gap-2">
                  <Terminal size={14} /> v1.08.25 (Beta)
               </span>
               <span className="text-neutral-500 text-sm font-mono tracking-wide flex items-center gap-2">
                   <User size={14} /> Lead: Puneet Shukla
               </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.95]">
              SSI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-gradient">Studios</span>
            </h2>

            <div className="space-y-8 text-lg text-neutral-400 leading-relaxed max-w-3xl border-l-2 border-white/10 pl-8">
              <p>
                 <strong>The Problem:</strong> SS Innovations faced a critical bottleneck. Every ID card, certificate, or marketing asset required manual intervention from the design team. This created a dependency loop that slowed down HR onboarding and Event Operations by days.
              </p>
              <p>
                 <strong>The Solution:</strong> A centralized <strong>Creative Operating System</strong>. I architected a full-stack Next.js application that empowers non-technical staff to generate print-ready assets programmatically. It combines a secure RBAC authentication system with client-side rendering engines to deliver speed, security, and brand consistency at scale.
              </p>
              <p className="text-sm font-mono text-indigo-400">
                 // Mentor: Naveen Ajay Kumar <br/>
                 // Timeline: 60 Days Solo Sprint <br/>
                 // Stack: Next.js 15, MongoDB, AWS S3, Framer Motion
              </p>
            </div>

            {/* --- PREMIUM ACCESS PASS --- */}
            <DemoAccessCard />

          </motion.div>

          {/* Hero Visual */}
          <motion.div style={{ y: yParallax }} className="flex-1 w-full relative group perspective-1000">
             <div className="relative aspect-[16/10] bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/80 group-hover:border-indigo-500/20 transition-all duration-700 transform rotate-y-12 group-hover:rotate-0">
                {/* UI Header */}
                <div className="absolute top-0 w-full h-14 bg-white/5 border-b border-white/5 flex items-center px-6 gap-4 backdrop-blur-md z-20">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <div className="h-8 w-96 bg-white/5 rounded-lg flex items-center px-3 text-xs text-neutral-600 font-mono">
                      https://ssistudios.vercel.app/dashboard
                   </div>
                </div>
                
                {/* Dashboard Wireframe Content */}
                <div className="absolute inset-0 top-14 p-8 grid grid-cols-12 grid-rows-6 gap-6 bg-[url('/grid.svg')] bg-repeat opacity-20">
                   {/* Sidebar */}
                   <div className="col-span-3 row-span-6 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-4 p-4">
                      <div className="h-10 bg-white/10 rounded-lg w-3/4" />
                      <div className="h-6 bg-white/5 rounded-lg w-full" />
                      <div className="h-6 bg-white/5 rounded-lg w-full" />
                      <div className="h-6 bg-white/5 rounded-lg w-5/6" />
                      <div className="mt-auto h-12 bg-red-500/10 rounded-lg w-full border border-red-500/20" />
                   </div>
                   {/* Top Stats */}
                   <div className="col-span-3 row-span-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-indigo-500/20 blur-xl" />
                   </div>
                   <div className="col-span-3 row-span-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-emerald-500/20 blur-xl" />
                   </div>
                   <div className="col-span-3 row-span-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-cyan-500/20 blur-xl" />
                   </div>
                   {/* Main Chart Area */}
                   <div className="col-span-9 row-span-4 bg-white/5 rounded-xl border border-white/5 flex items-end p-6 gap-4">
                      {[40, 70, 50, 90, 60, 80, 50, 70, 90, 100, 60, 40].map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-t-sm hover:bg-indigo-500/50 transition-colors" />
                      ))}
                   </div>
                </div>
                
                {/* Live Badge */}
                <div className="absolute bottom-8 right-8 px-4 py-2 bg-emerald-950/80 backdrop-blur-xl border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl z-30">
                   <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                   </span>
                   System Online
                </div>
             </div>
          </motion.div>
        </div>


        {/* ========================================================
            CHAPTER 2: SECURITY & AUTHENTICATION
           ======================================================== */}
        <ChapterHeader 
            number="01" 
            title="Security & Access Control" 
            subtitle="RBAC Implementation & Protection"
        />
        
        <div className="grid md:grid-cols-2 gap-12 mb-32">
            <CodeBlock 
                filename="app/api/admin-login/route.ts"
                code={`
// Secure Admin Login Implementation
const user = await Member.findOne({ username });

// Direct Password Comparison (Dev Mode)
// In production: await bcrypt.compare(password, user.password)
const isMatch = password === user.password;

// 🔑 CRITICAL: Returning the Permission Matrix
// This 'access' object drives the entire UI logic
return NextResponse.json({
  user: {
    id: user._id,
    username: user.username,
    access: user.access, // e.g. { certificateEditor: true }
  },
});`}
            />
            <div className="space-y-8 flex flex-col justify-center">
                <FeatureCard 
                    icon={<ShieldCheck className="text-emerald-400" />}
                    title="Role-Based Access Control (RBAC)"
                    description="Security isn't just about login; it's about what you can see. I architected a granular permission system. The backend returns an `access` object during login, which the frontend `Sidebar.tsx` uses to dynamically render or hide menu items like 'Certificates' or 'Bug Reports'."
                />
                <FeatureCard 
                    icon={<Lock className="text-indigo-400" />}
                    title="Session Persistence"
                    description="Implemented a custom Context Provider (`AuthContext`) that manages the user session state across the application, ensuring seamless navigation while protecting secure routes like `/dashboard` from unauthorized access."
                />
            </div>
        </div>


        {/* ========================================================
            CHAPTER 3: THE CERTIFICATE ENGINE
           ======================================================== */}
        <ChapterHeader 
            number="02" 
            title="The Certificate Engine" 
            subtitle="High-Volume Data Processing & Export"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-32">
            <div className="lg:col-span-1 space-y-6">
                <h4 className="text-2xl font-bold text-white">The Challenge</h4>
                <p className="text-neutral-400 leading-relaxed">
                    Generating 500+ certificates for a medical conference manually is impossible. Server-side generation often times out with large batches.
                </p>
                <h4 className="text-2xl font-bold text-white mt-8">My Solution</h4>
                <p className="text-neutral-400 leading-relaxed">
                    I built a <strong>Client-Side Bulk Generator</strong>. Instead of asking the server to create 500 PDFs, the browser iterates through the data array, generating each PDF locally using `pdf-lib`. This distributes the compute load and prevents server crashes.
                </p>
                <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                        <Activity size={16} /> Performance Metric
                    </div>
                    <div className="text-3xl font-mono text-white">0.4s</div>
                    <div className="text-xs text-indigo-300/60">Per Certificate Generation Time</div>
                </div>
            </div>
            
            <div className="lg:col-span-2">
                <CodeBlock 
                    filename="hooks/useCertificateActions.ts"
                    code={`
// BULK GENERATION LOGIC
const handleBulkGeneratePDF_V2 = async () => {
  setIsBulkGeneratingV2(true);
  
  // 1. Fetch clean data for selected IDs
  let selectedCertificates = await fetchCertificatesForExport(true, selectedIds);

  // 2. Client-Side Promise Loop
  const pdfPromises = selectedCertificates.map(cert =>
    generateCertificatePDFTyped(
       cert, 
       onAlert, 
       'certificate2.pdf', // Template selection
       setIsBulkGeneratingV2, 
       true // isBulk flag
    )
  );

  // 3. Parallel Execution & Download
  const results = await Promise.all(pdfPromises);
  
  results.forEach(result => {
     if (result?.blob) {
        triggerFileDownload(result.blob, \`\${cert.name}.pdf\`);
     }
  });
};`}
                />
            </div>
        </div>


        {/* ========================================================
            CHAPTER 4: IDENTITY & CANVAS LOGIC
           ======================================================== */}
        <ChapterHeader 
            number="03" 
            title="Identity Management System" 
            subtitle="Canvas Manipulation & Asset Logic"
        />

        <div className="bg-neutral-900/30 border border-white/10 rounded-3xl p-8 md:p-12 mb-32">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 text-cyan-400 mb-4">
                        <Layout size={24} />
                        <h3 className="text-2xl font-bold text-white">The "Crop" Problem</h3>
                    </div>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        Employees upload raw photos that never fit the official ID card aspect ratio. Standard CSS `object-fit` isn't enough because the output needs to be a <strong>Print-Ready PDF</strong>.
                    </p>
                    <div className="space-y-4 pt-4">
                        <TechnicalPoint 
                            title="Coordinate Mapping"
                            desc="I implemented a drag interface that captures `imageXOffset` and `imageYOffset` values. These coordinates are passed to the PDF generator to draw the image at the exact user-defined position."
                        />
                        <TechnicalPoint 
                            title="Dynamic Asset Loading"
                            desc="The system automatically maps blood groups (A+, O-) to specific static assets (e.g., `/bloodgroup/aplus.png`), ensuring critical medical info is visually distinct."
                        />
                    </div>
                </div>
                <div className="flex-1">
                     <CodeBlock 
                        filename="components/IdCardsPage.tsx"
                        code={`
// Drag Logic for Profile Photo
const onDrag = (e: React.MouseEvent) => {
  if (!isDragging) return;
  
  // Calculate delta from start position
  const newX = e.clientX - dragStart.current.x;
  const newY = e.clientY - dragStart.current.y;
  
  // Constrain movement to prevent empty spaces
  const constrainedX = Math.max(-15, Math.min(15, newX));
  const constrainedY = Math.max(-20, Math.min(20, newY));

  // Update State for Live Preview
  setFormData(prev => ({ 
      ...prev, 
      imageXOffset: constrainedX, 
      imageYOffset: constrainedY 
  }));
};`}
                    />
                </div>
            </div>
        </div>


        {/* ========================================================
            CHAPTER 5: AI & AUTOMATION PIPELINE
           ======================================================== */}
        <ChapterHeader 
            number="04" 
            title="AI Tools & Automation" 
            subtitle="Smart Background Removal & Mailer"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-32">
             <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all">
                 <Wand2 className="text-purple-400 mb-6" size={32} />
                 <h4 className="text-xl font-bold text-white mb-4">AI Background Remover</h4>
                 <p className="text-neutral-400 mb-6">
                    Integrated an external AI API to process employee headshots. I used `axios` with `responseType: 'blob'` to handle the binary image data directly in memory without saving to disk first, keeping the operation stateless and fast.
                 </p>
                 <div className="text-xs font-mono text-purple-300 bg-purple-900/20 p-3 rounded border border-purple-500/20">
                    const res = await axios.post("/api/remove-bg", form, &#123; responseType: "blob" &#125;);
                 </div>
             </div>

             <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all">
                 <Mail className="text-blue-400 mb-6" size={32} />
                 <h4 className="text-xl font-bold text-white mb-4">Smart Mail Composer</h4>
                 <p className="text-neutral-400 mb-6">
                    Built a `MailComposer` modal that takes the generated PDF blob and attaches it to a Nodemailer transport. It supports CC/BCC to HR, ensuring that when a certificate is issued, a record is kept automatically.
                 </p>
                 <div className="text-xs font-mono text-blue-300 bg-blue-900/20 p-3 rounded border border-blue-500/20">
                    formData.append('pdfFile', pdfFile, 'certificate.pdf');
                 </div>
             </div>
        </div>


        {/* ========================================================
            CHAPTER 6: ANALYTICS & UTILITIES
           ======================================================== */}
        <ChapterHeader 
            number="05" 
            title="Data Intelligence" 
            subtitle="Aggregation Pipelines & Reporting"
        />
        
        <div className="mb-40">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <CodeBlock 
                    filename="app/api/analysis/route.ts"
                    code={`
// MongoDB Aggregation Pipeline
const certificatesByHospital = await Certificate.aggregate([
  {
    $group: {
      _id: '$hospital',
      count: { $sum: 1 }, // Count certificates per hospital
    },
  },
  { $sort: { count: -1 } }, // Sort by highest volume
  { $limit: 10 }, // Top 10 only
  {
    $project: {
      hospital: '$_id',
      count: 1,
      _id: 0,
    }
  }
]);`}
                />
                <div className="space-y-8">
                    <FeatureCard 
                        icon={<PieChart className="text-orange-400" />}
                        title="Real-Time Analytics"
                        description="The dashboard isn't static. It runs complex aggregation pipelines on the MongoDB cluster to calculate metrics like 'Doctors vs Staff' (using RegEx matching on name prefixes like 'Dr.') and 'Monthly Issuance Trends' for the Recharts visualization."
                    />
                    <FeatureCard 
                        icon={<Bug className="text-red-400" />}
                        title="Bug Reporting System"
                        description="I included a `BugReportApp.tsx` module that allows users to submit issues directly. It captures the user ID, session data, and allows for screenshot attachments, creating a direct feedback loop for maintenance."
                    />
                    <FeatureCard 
                        icon={<Fingerprint className="text-emerald-400" />}
                        title="Profile & Preferences"
                        description="A dedicated settings page allows users to toggle email notifications, enable 2FA (UI logic), and manage their session security, adding a layer of personalization to the enterprise tool."
                    />
                </div>
            </div>
        </div>


        {/* ========================================================
            7. FINAL STACK & FOOTER
           ======================================================== */}
        <div className="border-t border-white/10 pt-20">
           <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest">The Technology Stack</h3>
              <p className="text-neutral-500 mt-2 text-sm">Built for scale, speed, and security.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <TechBadge icon={<Layout />} label="Next.js 15" />
              <TechBadge icon={<Database />} label="MongoDB" />
              <TechBadge icon={<Server />} label="AWS S3" />
              <TechBadge icon={<ShieldCheck />} label="NextAuth" />
              <TechBadge icon={<FileSpreadsheet />} label="XLSX / PDF-Lib" />
              <TechBadge icon={<Move />} label="Framer Motion" />
           </div>
        </div>

      </div>
    </section>
  );
};

// --- SUPPORTING COMPONENTS ---

const ChapterHeader = ({ number, title, subtitle }: any) => (
    <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-end gap-6 border-b border-white/10 pb-6 mb-12"
    >
        <span className="text-6xl font-black text-white/5 font-mono leading-none">{number}</span>
        <div>
            <h3 className="text-3xl font-bold text-white">{title}</h3>
            <p className="text-indigo-400 font-medium">{subtitle}</p>
        </div>
    </motion.div>
);

const FeatureCard = ({ icon, title, description }: any) => (
    <div className="flex gap-5">
        <div className="mt-1 p-3 bg-white/5 rounded-xl h-fit border border-white/5">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-neutral-400 leading-relaxed text-sm">{description}</p>
        </div>
    </div>
);

const TechnicalPoint = ({ title, desc }: any) => (
    <div className="pl-4 border-l-2 border-indigo-500/30">
        <h5 className="text-indigo-300 font-bold text-sm uppercase tracking-wide mb-1">{title}</h5>
        <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
);

const CodeBlock = ({ filename, code }: any) => (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-2">
                <Code2 size={12} /> {filename}
            </span>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
        </div>
        <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-indigo-100 leading-relaxed">
            <code>{code}</code>
        </pre>
    </div>
);

const DemoAccessCard = () => {
   const [copied, setCopied] = useState("");
   const copyToClipboard = (text: string, type: string) => {
      navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
   };

   return (
      <div className="relative group overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 p-1 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] w-full max-w-md">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
         <div className="relative bg-[#0A0A0A] rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-2 text-indigo-400">
                  <Lock size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Premium Access Pass</span>
               </div>
               <a href="https://ssistudios.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-white transition-colors">
                  Launch Demo <ExternalLink size={12} />
               </a>
            </div>
            <div className="space-y-4">
               <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                  <div><div className="text-[10px] text-neutral-500 uppercase font-bold">Username</div><div className="text-white font-mono text-sm tracking-wide">ssidemo</div></div>
                  <button onClick={() => copyToClipboard('ssidemo', 'user')} className="text-neutral-600 hover:text-white transition-colors">{copied === 'user' ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}</button>
               </div>
               <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                  <div><div className="text-[10px] text-neutral-500 uppercase font-bold">Password</div><div className="text-white font-mono text-sm tracking-wide">ssistudio</div></div>
                  <button onClick={() => copyToClipboard('ssistudio', 'pass')} className="text-neutral-600 hover:text-white transition-colors">{copied === 'pass' ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}</button>
               </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
               <a href="https://ssistudios.vercel.app" target="_blank" rel="noreferrer" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 active:scale-95">
                  Access System <ChevronRight size={16} />
               </a>
            </div>
         </div>
      </div>
   );
};

const TechBadge = ({ icon, label }: any) => (
   <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
      <div className="text-neutral-400 group-hover:text-indigo-400 transition-colors">{React.cloneElement(icon, { size: 18 })}</div>
      <span className="text-sm font-medium text-neutral-300">{label}</span>
   </div>
);

export default Section3;
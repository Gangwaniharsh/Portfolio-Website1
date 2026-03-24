import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import Lottie from 'lottie-react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Terminal, 
  Cpu, 
  Award, 
  BookOpen, 
  Send,
  Menu,
  X,
  ChevronRight,
  Trophy,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  title: string;
  duration: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  link?: string;
  github?: string;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

// --- Data ---
const getTechIcon = (name: string) => {
  const icons: Record<string, string> = {
    "React": "react/react-original.svg",
    "React.js": "react/react-original.svg",
    "Node.js": "nodejs/nodejs-original.svg",
    "Express": "express/express-original.svg",
    "Express.js": "express/express-original.svg",
    "MongoDB": "mongodb/mongodb-original.svg",
    "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
    "HTML5": "html5/html5-original.svg",
    "CSS3": "css3/css3-original.svg",
    "HTML5/CSS3": "html5/html5-original.svg",
    "JavaScript": "javascript/javascript-original.svg",
    "C++": "cplusplus/cplusplus-original.svg",
    "C": "c/c-original.svg",
    "MySQL": "mysql/mysql-original.svg",
    "Git/GitHub": "github/github-original.svg",
    "Postman": "postman/postman-original.svg",
    "VS Code": "vscode/vscode-original.svg",
  };
  
  const path = icons[name] || "javascript/javascript-original.svg";
  return (
    <img 
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`} 
      alt={name}
      className="w-full h-full object-contain"
      referrerPolicy="no-referrer"
    />
  );
};

const PROJECTS: Project[] = [
  {
    title: "Quick Bites",
    duration: "Jan 2026 - Feb 2026",
    description: "Full-stack food delivery platform with real-time order tracking.",
    longDescription: "Architected a comprehensive food delivery platform where users can browse restaurants, view menus, and place orders. Implemented JWT authentication and structured MongoDB schemas for efficient data retrieval.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: ["JWT Authentication", "Restaurant Browsing", "Order Management", "Responsive UI"],
    link: "#",
    github: "https://github.com/Gangwaniharsh"
  },
  {
    title: "MindCare India",
    duration: "Jul 2025",
    description: "Mental health simulator with a C++ backend for sentiment analysis.",
    longDescription: "Developed a mental health simulation platform that processes user inputs to generate supportive responses. Integrated a C++ backend for logic handling with a modern web frontend.",
    tech: ["HTML5", "CSS3", "JavaScript", "C++"],
    features: ["Sentiment Analysis", "Interactive Frontend", "Supportive Responses"],
    link: "#",
    github: "https://github.com/Gangwaniharsh"
  }
];

const SKILLS = {
  languages: [
    { name: "C++", level: 90, icon: getTechIcon("C++") },
    { name: "C", level: 85, icon: getTechIcon("C") },
    { name: "JavaScript", level: 88, icon: getTechIcon("JavaScript") },
  ],
  frontend: [
    { name: "React.js", level: 92, icon: getTechIcon("React.js") },
    { name: "Tailwind CSS", level: 95, icon: getTechIcon("Tailwind CSS") },
    { name: "HTML5/CSS3", level: 90, icon: getTechIcon("HTML5/CSS3") },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: getTechIcon("Node.js") },
    { name: "Express.js", level: 82, icon: getTechIcon("Express.js") },
  ],
  database: [
    { name: "MongoDB", level: 80, icon: getTechIcon("MongoDB") },
    { name: "MySQL", level: 75, icon: getTechIcon("MySQL") },
  ],
  tools: [
    { name: "Git/GitHub", level: 88, icon: getTechIcon("Git/GitHub") },
    { name: "Postman", level: 85, icon: getTechIcon("Postman") },
    { name: "VS Code", level: 95, icon: getTechIcon("VS Code") },
  ]
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "300+ DSA Problems Solved",
    issuer: "LeetCode, HackerRank, Coding Ninjas",
    date: "Ongoing",
    description: "Consistently solving complex algorithmic challenges to sharpen problem-solving skills."
  },
  {
    title: "Cloud Computing Certification",
    issuer: "NPTEL",
    date: "Aug 2025 - Nov 2025",
    description: "In-depth understanding of cloud infrastructure and service models."
  },
  {
    title: "200+ DSA Problems in Training",
    issuer: "Cipher Schools",
    date: "Jun 2025 - Jul 2025",
    description: "Completed intensive training focused on data structures and algorithms."
  }
];

// --- Components ---

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    x.set(xPos * 0.3);
    y.set(yPos * 0.3);
  };

  const mouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Reveal = ({ children, width = "fit-content" }: { children: React.ReactNode; width?: "fit-content" | "100%" }) => {
  const ref = useRef(null);
  const isInView = useMotionValue(0); // Placeholder for useInView logic if needed, but we'll use whileInView
  
  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--neon-pink, #3b82f6)",
          zIndex: 20,
        }}
      />
    </div>
  );
};

const AnimatedText = ({ text }: { text: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.div
      className="flex justify-center flex-wrap"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block mr-3">
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span variants={child} key={letterIndex} className="inline-block gradient-text">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <div className="text-4xl md:text-5xl font-bold mb-4">
      <AnimatedText text={title} />
    </div>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const itemVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12, mass: 1.2 }
  }
};

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group cursor-pointer transition-colors duration-500 hover:bg-white/10 hover:premium-glow"
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-16 h-16 p-3 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <div className="w-10 h-10">
          {skill.icon}
        </div>
      </div>
      
      <span style={{ transform: "translateZ(20px)" }} className="font-bold text-base text-zinc-300 group-hover:text-white transition-colors z-10 text-center tracking-tight">{skill.name}</span>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-primary rounded-full animate-ping" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1 
      }}
      whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.4, ease: "easeOut" } }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row group transition-all duration-500 relative bg-surface/80 hover:bg-surface border border-white/5 hover:border-white/20 hover:shadow-[0_0_80px_rgba(59,130,246,0.15)]"
    >
      <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative background glow on hover */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6 relative z-10 flex-col md:flex-row gap-4 md:gap-0">
          <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-accent transition-all duration-300">{project.title}</h3>
          <span className="text-sm text-brand-secondary font-mono tracking-wider md:ml-4 rounded-full px-4 py-1.5 bg-brand-secondary/10 border border-brand-secondary/20">{project.duration}</span>
        </div>
        
        <p className="text-zinc-400 text-lg leading-relaxed mb-8 relative z-10">{project.longDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          {project.tech.map(t => (
            <div key={t} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium transition-colors hover:bg-brand-primary/20 hover:border-brand-primary/50">
              <div className="w-5 h-5">
                {getTechIcon(t)}
              </div>
              {t}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-8 md:p-10 bg-black/40 md:w-1/3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 relative z-10">
        <div>
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-primary" /> Key Features
          </h4>
          <ul className="space-y-4 mb-8">
            {project.features.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                <ChevronRight className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Magnetic>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.github} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-base font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn"
          >
            <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" /> View Source
          </motion.a>
        </Magnetic>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroAnimation, setHeroAnimation] = useState<any>(null);
  const [contactAnimation, setContactAnimation] = useState<any>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Load Lottie Animations
    fetch('https://lottie.host/6271c662-811c-423c-9143-696781434380/vGz2Uv0u7a.json')
      .then(res => res.json())
      .then(data => setHeroAnimation(data))
      .catch(err => console.error("Hero Lottie load failed:", err));

    fetch('https://lottie.host/0209673d-99f7-4171-8973-77296068630d/9vT6uI3v5v.json')
      .then(res => res.json())
      .then(data => setContactAnimation(data))
      .catch(err => console.error("Contact Lottie load failed:", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCVDownload = () => {
    const link = document.createElement('a');
    link.href = '/Harsh_Gangwani_CV.pdf';
    link.download = 'Harsh_Gangwani_CV.pdf';
    link.click();
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorX = useSpring(mousePos.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePos.y, { stiffness: 500, damping: 28 });

  return (
    <div className="min-h-screen relative overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-white mix-blend-difference rounded-full pointer-events-none z-[99999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 4 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white mix-blend-difference rounded-full pointer-events-none z-[99999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Background Blobs with Parallax */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          style={{
            x: useTransform(useMotionValue(mousePos.x), [0, window.innerWidth], [-50, 50]),
            y: useTransform(useMotionValue(mousePos.y), [0, window.innerHeight], [-50, 50]),
          }}
          animate={{ 
            scale: [1, 1.2, 1]
          }}
          transition={{ scale: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{
            x: useTransform(useMotionValue(mousePos.x), [0, window.innerWidth], [50, -50]),
            y: useTransform(useMotionValue(mousePos.y), [0, window.innerHeight], [50, -50]),
          }}
          animate={{ 
            scale: [1, 1.3, 1]
          }}
          transition={{ scale: { duration: 25, repeat: Infinity, ease: "linear" } }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px]" 
        />
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="fixed bottom-8 right-8 p-4 rounded-2xl glass-card border border-white/10 text-white z-[60] shadow-2xl hover:bg-brand-primary hover:border-brand-primary transition-all group"
          >
            <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        scrolled 
          ? "top-4 w-[calc(100%-2rem)] max-w-7xl glass-card rounded-2xl py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10" 
          : "top-0 w-full bg-transparent py-8"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#home" 
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            HG.
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="text-sm font-medium text-gray-300 hover:text-brand-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-gray-300 hover:text-brand-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={handleCVDownload}
                  className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold"
                >
                  Download CV
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>I'm </motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="gradient-text">Harsh Gangwani</motion.span>
              <br />
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-5xl text-gray-400">
                <Typewriter
                  words={['Full-Stack Developer', 'Problem Solver', 'C++ Enthusiast']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed"
            >
              B.Tech CSE student at LPU with a passion for building scalable web applications and solving complex algorithmic problems. 300+ DSA problems solved.
            </motion.p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Magnetic>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-brand-primary/20 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">View Projects <ChevronRight className="w-5 h-5" /></span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  />
                </motion.button>
              </Magnetic>
              <Magnetic>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCVDownload}
                  className="px-8 py-4 rounded-2xl glass-card text-white font-bold flex items-center gap-2 border border-white/10 hover:border-white/30 transition-all"
                >
                  Download CV <Download className="w-5 h-5" />
                </motion.button>
              </Magnetic>
            </div>

            <div className="flex gap-6">
              {[
                { icon: <Github />, href: "https://github.com/Gangwaniharsh" },
                { icon: <Linkedin />, href: "https://www.linkedin.com/in/harshgangwani28" },
                { icon: <Mail />, href: "mailto:harshgangwani682@gmail.com" },
                { icon: <Phone />, href: "tel:+917524055566" }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -5, color: '#3b82f6' }}
                    className="text-gray-400 transition-colors p-2"
                  >
                    {social.icon}
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="w-full aspect-square max-w-md mx-auto relative">
              {/* Lottie Animation for Hero */}
              <div className="absolute inset-0 z-0 opacity-80">
                {heroAnimation && (
                  <Lottie 
                    animationData={heroAnimation}
                    loop={true}
                    className="w-full h-full"
                  />
                )}
              </div>
              
              {/* Decorative Rings */}
              <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-electric-violet/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Profile Image with Tilt and Float */}
              <motion.div 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-10 rounded-full overflow-hidden glass-card flex items-center justify-center premium-glow z-10 shadow-[0_0_50px_rgba(59,130,246,0.3)] group"
              >
                <img 
                  src="/profile.jpg" 
                  alt="Harsh Gangwani" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent pointer-events-none" />
              </motion.div>


            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="A comprehensive list of technologies and tools I use to bring ideas to life."
          />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {Object.entries(SKILLS).flatMap(([_, skills]) => skills).map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} index={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Featured Work" 
            subtitle="A selection of my recent full-stack and frontend projects."
          />
          
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            {PROJECTS.map((project, i) => (
              <div 
                key={project.title}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Achievements" 
            subtitle="Milestones and certifications that mark my professional growth."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACHIEVEMENTS.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl relative group hover:premium-glow transition-all"
              >
                <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-brand-primary text-white shadow-lg group-hover:rotate-12 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                <div className="text-sm text-brand-primary font-medium mb-4">{achievement.issuer}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
                <div className="mt-6 text-[10px] text-gray-500 font-mono uppercase tracking-widest">{achievement.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <SectionHeading title="Education" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                degree: "Bachelor of Technology - Computer Science and Engineering",
                school: "Lovely Professional University",
                duration: "Aug 2023 - Aug 2027",
                stats: "CGPA: 7.36/10",
                location: "Jalandhar, Punjab"
              },
              {
                degree: "Intermediate (Class XII)",
                school: "New Stepping Stones International School",
                duration: "Apr 2022 - Apr 2023",
                stats: "Percentage: 71.4%",
                location: "Kanpur, Uttar Pradesh"
              },
              {
                degree: "Matriculation (Class X)",
                school: "New Stepping Stones International School",
                duration: "Apr 2020 - Apr 2021",
                stats: "Percentage: 89.17%",
                location: "Kanpur, Uttar Pradesh"
              }
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="glass-card p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white/10 transition-colors border border-white/5 hover:border-brand-primary/30"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-brand-secondary/20 text-brand-secondary group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{edu.degree}</h3>
                    <div className="text-gray-400 font-medium">{edu.school}</div>
                    <div className="text-sm text-gray-500 mt-1">{edu.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-brand-primary font-bold text-lg">{edu.stats}</div>
                  <div className="text-sm text-gray-500 font-mono">{edu.duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Let's build something amazing together. I'm always open to new opportunities and collaborations."
          />
          
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="glass-card p-8 rounded-3xl border-l-4 border-brand-primary">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                
                <div className="space-y-4">
                    { [
                      { icon: <Mail />, label: "Email", value: "harshgangwani682@gmail.com", href: "mailto:harshgangwani682@gmail.com" },
                      { icon: <Phone />, label: "Phone", value: "+91-7524055566", href: "tel:+917524055566" },
                      { icon: <Linkedin />, label: "LinkedIn", value: "harshgangwani28", href: "https://www.linkedin.com/in/harshgangwani28" },
                      { icon: <Github />, label: "GitHub", value: "Gangwaniharsh", href: "https://github.com/Gangwaniharsh" }
                    ].map((item, i) => (
                      <motion.a 
                        key={i} 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 10 }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="flex items-center gap-4 group"
                      >
                        <div className="p-3 rounded-xl bg-white/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-gray-300 font-medium group-hover:text-brand-primary transition-colors">{item.value}</span>
                      </motion.a>
                    ))}
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl bg-gradient-to-br from-brand-primary/10 to-transparent relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 opacity-20">
                  {contactAnimation && (
                    <Lottie 
                      animationData={contactAnimation}
                      loop={true}
                    />
                  )}
                </div>
                <h4 className="text-white font-bold mb-2">Location</h4>
                <p className="text-gray-400 text-sm">Kanpur, Uttar Pradesh, India</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 glass-card p-10 rounded-3xl relative"
            >
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="Harsh Gangwani" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="harsh@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all" required />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Collaboration Opportunity" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all" required />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea rows={5} placeholder="Hi Harsh, I'd love to talk about..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all resize-none" required />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full py-5 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-3 shadow-xl transition-all"
                >
                  Send Message <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold gradient-text mb-2">Harsh Gangwani</div>
            <p className="text-gray-500 text-sm">Full-Stack Developer & Problem Solver</p>
          </div>
          
          <div className="flex gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="text-xs text-gray-400 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleCVDownload}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              className="text-gray-400 text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> CV
            </motion.button>
            <div className="text-gray-500 text-xs">
              © 2026 Harsh Gangwani. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



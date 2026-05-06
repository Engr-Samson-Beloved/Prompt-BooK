import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Cpu, Zap, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import NeuralCore from './NeuralCore';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out"
      });

      gsap.from(".hero-description", {
        opacity: 0,
        x: -20,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 overflow-hidden pt-0 pb-12 px-6 bg-white -mt-24">
      {/* Subtle Background Glows */}
      <div className="glow-bg -top-40 -left-40 opacity-10" />
      <div className="glow-bg -bottom-40 -right-40 opacity-5" />

      {/* 3D Neural Core */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative flex items-center justify-center w-full lg:w-1/2"
      >
        <NeuralCore />
        
        {/* Technical Overlays */}
        <div className="absolute top-0 left-0 p-4 border-l border-t border-brand-accent/20 font-mono text-[10px] text-neutral-400">
          CORE_SYNC: ACTIVE<br />
          NEURAL_LOAD: 12.4%
        </div>
        <div className="absolute bottom-0 right-0 p-4 border-r border-b border-brand-accent/20 font-mono text-[10px] text-neutral-400 text-right">
          QUANTUM_STATE: STABLE<br />
          LATENCY: 2.4ms
        </div>
      </motion.div>

      {/* Content Column */}
      <div 
        ref={textRef}
        className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl z-20"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-8 backdrop-blur-md">
          <Activity className="w-3 h-3 text-brand-accent animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
            System Architecture v4.0.2
          </span>
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-display mb-6 leading-[0.9] tracking-tighter flex flex-wrap justify-center lg:justify-start text-brand-black">
          <span className="inline-block mr-4">ARCHITECTING</span>
          <span className="text-brand-accent inline-block">INTELLIGENCE</span>
        </h1>
        
        <h2 className="hero-description text-xl md:text-2xl font-mono text-neutral-600 mb-8 tracking-tight border-l-2 border-brand-accent/30 pl-6 py-2">
          Autonomous Prompt Engineering for the <span className="text-brand-black font-bold">Synthetic Era</span>.
        </h2>
        
        <p className="hero-description text-base md:text-lg text-neutral-500 leading-relaxed font-sans mb-12 max-w-lg">
          High-fidelity algorithmic refinement and autonomous prompt synthesis. We bridge the gap between human intent and machine execution with precision-engineered neural workflows.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/portfolio')}
            className="group relative flex items-center gap-4 px-10 py-5 bg-brand-black text-white rounded-sm font-mono font-bold uppercase tracking-widest hover:bg-brand-accent transition-all overflow-hidden shadow-lg shadow-black/10"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            <Cpu className="w-5 h-5" />
            Initialize System
            <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-3 px-8 py-5 bg-transparent border border-neutral-200 rounded-sm text-neutral-600 font-mono font-semibold uppercase tracking-widest hover:border-brand-black hover:text-brand-black transition-all"
          >
            <Zap className="w-4 h-4" />
            View Architecture
          </button>
        </div>

        {/* Bottom Technical Status */}
        <div className="mt-16 flex items-center gap-8 border-t border-neutral-100 pt-8 w-full">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Active Nodes</span>
            <span className="text-xl font-mono text-brand-black font-bold">1,204</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Throughput</span>
            <span className="text-xl font-mono text-brand-black font-bold">8.4 PB/s</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Optimization</span>
            <span className="text-xl font-mono text-brand-black font-bold">99.9%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

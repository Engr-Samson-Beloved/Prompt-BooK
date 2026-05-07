import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Expand, LayoutGrid, ArrowLeftRight, Network, Lock, ArrowUpRight, Cog, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ReversePromptFlow from './ReversePromptFlow';
import IdeaExpanderFlow from './IdeaExpanderFlow';

const services = [
  {
    id: 'reverse-engine',
    title: "Reverse Prompt Engine",
    desc: "Upload any image and our AI analyzes composition, lighting, and style to return a structured prompt.",
    icon: <Scan className="w-6 h-6 text-brand-black" />,
  },
  {
    id: 'expander',
    title: "Idea Expander",
    desc: "Type a rough idea and expand it into a full, production-ready prompt with mood board references.",
    icon: <Expand className="w-6 h-6 text-brand-black" />,
  },
  {
    id: 'carousel',
    title: "High-End Carousel",
    desc: "Curated gallery of stunning AI outputs. Find a style you like, click 'Get Prompt as API'.",
    icon: <LayoutGrid className="w-6 h-6 text-brand-black" />,
  },
  {
    id: 'cross-model',
    title: "Cross-Model Compat",
    desc: "Single prompt automatically translated for Midjourney, DALL-E 3, Stable Diffusion, and more.",
    icon: <ArrowLeftRight className="w-6 h-6 text-brand-black" />,
  },
  {
    id: 'connectors',
    title: "Microservice Connectors",
    desc: "Every saved prompt gets a REST endpoint. Connect your API keys and we handle routing and fallbacks.",
    icon: <Network className="w-6 h-6 text-brand-black" />,
  },
  {
    id: 'consistency',
    title: "Consistency Mode",
    desc: "Upload reference brand assets to extract style embeddings and lock them across future generations.",
    icon: <Lock className="w-6 h-6 text-brand-black" />,
  }
];

const FeatureCard: React.FC<{ service: typeof services[0], idx: number, onOpen: (id: string) => void }> = ({ service, idx, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    gsap.to(spotlightRef.current, { x: x - 100, y: y - 100, opacity: 1, duration: 0.2 });
    const rotateX = ((y / height) - 0.5) * 10;
    const rotateY = ((x / width) - 0.5) * -10;
    gsap.to(cardRef.current, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !spotlightRef.current) return;
    gsap.to(spotlightRef.current, { opacity: 0, duration: 0.5 });
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(service.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="glass-card p-6 md:p-10 flex flex-col relative overflow-hidden cursor-pointer group border border-neutral-100 hover:border-brand-accent/20 transition-colors"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={spotlightRef} className="absolute w-[200px] h-[200px] bg-brand-accent/5 blur-3xl rounded-full pointer-events-none opacity-0" />
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center p-2.5 shadow-sm border border-neutral-50 bg-white group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
        <div className="group-hover:text-white transition-colors">{service.icon}</div>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="text-2xl font-display mb-4 tracking-tight group-hover:text-brand-accent transition-colors">{service.title}</h3>
        <p className="text-neutral-500 leading-relaxed font-sans text-sm md:text-base pr-4">{service.desc}</p>
      </div>
      <div className="mt-auto pt-8 flex items-center gap-2">
        <div className="w-8 h-[1px] bg-neutral-100 group-hover:w-12 group-hover:bg-brand-accent transition-all duration-500" />
        <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-black transition-colors" />
      </div>
    </motion.div>
  );
};

const Services: React.FC<{ onOpenConnect?: () => void }> = ({ onOpenConnect }) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col items-center mb-20">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 mb-6 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          <Zap className="w-3 h-3 text-brand-accent" />
          Neural Infrastructure
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-7xl font-display mb-4 text-center tracking-tighter">
          Core <span className="text-brand-accent">Capabilities</span>
        </motion.h2>
        <p className="text-neutral-500 text-center max-w-lg font-sans">Autonomous modules designed to bridge the gap between imagination and production.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-brand-black rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-4xl font-display mb-6 max-w-[200px] leading-tight">Get started with promptBook</h3>
            <button onClick={onOpenConnect} className="px-10 py-4 bg-white text-brand-black rounded-full font-mono font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-white transition-all shadow-xl">INITIALIZE_SYNC</button>
          </div>
          <div className="flex justify-end mt-12 relative z-10">
            <Cog className="w-24 h-24 text-white/5 group-hover:text-white/20 group-hover:rotate-180 transition-all duration-1000 ease-in-out" strokeWidth={1} />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full group-hover:translate-x-20 transition-transform duration-1000" />
        </motion.div>

        {services.map((service, idx) => (
          <FeatureCard key={service.title} service={service} idx={idx} onOpen={(id) => setActiveFeature(id)} />
        ))}
      </div>

      <AnimatePresence>
        {(activeFeature === 'reverse-engine' || activeFeature === 'expander') && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveFeature(null)} className="fixed inset-0 bg-white/95 backdrop-blur-md z-[1000]" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <div className="bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl pointer-events-auto relative p-6 md:p-12 lg:p-20 border border-neutral-100">
                <button onClick={() => setActiveFeature(null)} className="absolute top-6 md:top-10 right-6 md:right-10 p-2 md:p-3 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-brand-black"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
                {activeFeature === 'reverse-engine' ? <ReversePromptFlow /> : <IdeaExpanderFlow />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="glow-bg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-150 pointer-events-none" />
    </section>
  );
};

export default Services;

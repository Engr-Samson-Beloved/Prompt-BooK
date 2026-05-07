import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Type, Sparkles, BrainCircuit, Share2, Zap, Send, CheckCircle2, ChevronRight, Binary } from 'lucide-react';
import gsap from 'gsap';

const IdeaExpanderFlow: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Input, 1: Semantic Analysis, 2: Neural Expansion, 3: Refined Result
  const [input, setInput] = useState('');
  const neuralMapRef = useRef<SVGSVGElement>(null);

  const steps = [
    { id: 'input', label: 'Rough Concept', icon: <Type className="w-5 h-5" /> },
    { id: 'analyze', label: 'Semantic Parse', icon: <Binary className="w-5 h-5" /> },
    { id: 'expand', label: 'Neural Branching', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'result', label: 'Refined Output', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const handleStartExpansion = () => {
    if (!input) return;
    setStep(1);
    setTimeout(() => setStep(2), 2500);
    setTimeout(() => setStep(3), 5500);
  };

  useEffect(() => {
    if (step === 2 && neuralMapRef.current) {
      const paths = neuralMapRef.current.querySelectorAll('path');
      gsap.fromTo(paths, 
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        { strokeDashoffset: 0, duration: 2, stagger: 0.2, ease: "power1.inOut" }
      );
    }
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-16 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-100 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
              step >= i ? 'bg-brand-black border-brand-black text-white shadow-xl' : 'bg-white border-neutral-200 text-neutral-300'
            }`}>
              {step > i ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : s.icon}
            </div>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
              step >= i ? 'text-brand-black' : 'text-neutral-400'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Interaction Canvas */}
        <div className="relative aspect-square bg-neutral-50 rounded-[3rem] border border-neutral-100 overflow-hidden flex items-center justify-center shadow-inner">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-neutral-100 flex items-center justify-center mb-8">
                  <Type className="w-8 h-8 text-neutral-300" />
                </div>
                <h3 className="text-2xl font-display mb-4">Input Rough Concept</h3>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. A city made of glass in space"
                  className="w-full p-6 bg-white border border-neutral-100 rounded-2xl font-sans text-sm focus:border-brand-accent/50 outline-none transition-all shadow-sm mb-8"
                  rows={3}
                />
                <button 
                  onClick={handleStartExpansion}
                  disabled={!input}
                  className="px-10 py-4 bg-brand-black text-white font-mono font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-accent transition-all flex items-center gap-3 disabled:opacity-20"
                >
                  <BrainCircuit className="w-4 h-4" />
                  INITIATE_EXPANSION
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="analyze"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex gap-2">
                  {['CITY', 'GLASS', 'SPACE'].map((word, i) => (
                    <motion.div 
                      key={word}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="px-6 py-3 bg-brand-black text-white font-mono text-xs rounded-full shadow-lg"
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
                <div className="w-48 h-[1px] bg-neutral-100 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-brand-accent w-1/2"
                  />
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.3em] animate-pulse">Deconstructing_Semantics</span>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="expand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex items-center justify-center p-12"
              >
                <svg ref={neuralMapRef} className="w-full h-full" viewBox="0 0 200 200">
                  <path d="M100 100 L60 60 M100 100 L140 60 M100 100 L60 140 M100 100 L140 140" stroke="#3b82f6" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <motion.circle cx="100" cy="100" r="4" fill="#3b82f6" animate={{ r: [4, 6, 4] }} transition={{ repeat: Infinity }} />
                  {/* Branch nodes */}
                  {[60, 140].map(x => [60, 140].map(y => (
                    <motion.g key={`${x}-${y}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                      <circle cx={x} cy={y} r="2" fill="#111" />
                      <text x={x+5} y={y+2} className="text-[6px] font-mono fill-neutral-400">KEYWORDS++</text>
                    </motion.g>
                  )))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 border border-brand-accent/20 rounded-full animate-ping opacity-10" />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-display mb-4">Neural Synthesis Complete</h3>
                <p className="text-neutral-500 text-sm mb-8 px-12">Your concept has been cross-referenced with 4M+ artistic tokens.</p>
                <button 
                  onClick={() => setStep(0)}
                  className="px-8 py-3 bg-neutral-100 text-brand-black font-mono font-bold uppercase tracking-widest text-[9px] rounded-full hover:bg-brand-black hover:text-white transition-all"
                >
                  RESTART_PROTOCOL
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Narrative Zone */}
        <div className="pt-12">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-100 mb-6 text-neutral-400">
                  <Share2 className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Expansion Core</span>
                </div>
                <h2 className="text-4xl font-display mb-6 tracking-tighter uppercase leading-tight">AMPLIFY <span className="text-brand-accent">INTENT</span></h2>
                <div className="space-y-4">
                  <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                    Our Idea Expander takes primitive concepts and runs them through a multi-layer semantic transformer to generate cinematic, high-fidelity descriptive prompts.
                  </p>
                  <div className="flex items-center gap-4 p-5 bg-white border border-neutral-100 rounded-2xl">
                    <Zap className="w-5 h-5 text-brand-accent" />
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Capability</span>
                      <span className="text-sm font-bold text-brand-black">Contextual Enrichment</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300">System_Log_042</div>
                <div className="space-y-6">
                  {step === 1 && (
                    <div className="p-8 bg-brand-black text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-6">
                        <Binary className="w-5 h-5 text-brand-accent" />
                        <span className="font-mono text-[10px] uppercase tracking-widest">Parsing Semantic Vectors</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed text-neutral-400">
                        {'>'} Identified Keywords: [City, Glass, Space]<br/>
                        {'>'} Mapping to Stylistic Clusters...<br/>
                        {'>'} Fetching Architectural Metadata...
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-4xl font-display tracking-tighter">BRANCHING <span className="text-brand-accent">LOGIC</span></h2>
                      <div className="grid grid-cols-2 gap-4">
                        {['Volumetric Lighting', 'Refractive Index', 'Zero Gravity', 'Iridium Plating'].map((f, i) => (
                          <motion.div 
                            key={f}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 border border-neutral-100 rounded-xl font-mono text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-2"
                          >
                            <ChevronRight className="w-3 h-3 text-brand-accent" />
                            {f}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-4xl font-display tracking-tighter">EXPANDED <span className="text-brand-accent">PROMPT</span></h2>
                      <div className="p-8 bg-brand-accent/5 border border-brand-accent/20 rounded-[2rem] relative">
                        <Sparkles className="absolute top-4 right-4 w-6 h-6 text-brand-accent opacity-20" />
                        <p className="font-mono text-sm leading-relaxed text-brand-black italic">
                          "Cinematic wide shot of a monolithic crystalline megacity suspended in a nebula-rich vacuum, intricate glass architecture with complex refractive caustics, floating debris, iridium plated docking bays, volumetric interstellar dust, hyper-realistic, shot on IMAX 70mm --v 6.0"
                        </p>
                        <button 
                          className="mt-8 flex items-center gap-3 px-6 py-3 bg-brand-black text-white rounded-xl font-mono text-[10px] uppercase tracking-widest hover:bg-brand-accent transition-all"
                        >
                          <Send className="w-4 h-4" />
                          DEPLOY_TO_MJ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IdeaExpanderFlow;

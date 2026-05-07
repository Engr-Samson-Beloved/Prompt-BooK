import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Cpu, Layers, Sparkles, Image as ImageIcon, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import gsap from 'gsap';

const ReversePromptFlow: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Upload, 1: Scanning, 2: Feature Extraction, 3: Result
  const [preview, setPreview] = useState<string | null>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 'upload', label: 'Input Acquisition', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'scan', label: 'Neural Scan', icon: <Scan className="w-5 h-5" /> },
    { id: 'features', label: 'Feature Mapping', icon: <Layers className="w-5 h-5" /> },
    { id: 'result', label: 'Final Synthesis', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const handleStartProcess = () => {
    setStep(1);
    // Simulate steps
    setTimeout(() => setStep(2), 3000);
    setTimeout(() => setStep(3), 6000);
  };

  useEffect(() => {
    if (step === 1 && scanLineRef.current) {
      gsap.to(scanLineRef.current, {
        top: '100%',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    } else {
      gsap.killTweensOf(scanLineRef.current);
    }
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Timeline */}
      <div className="flex items-center justify-between mb-12 px-4 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-100 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
              step >= i ? 'bg-brand-black border-brand-black text-white shadow-lg shadow-black/20' : 'bg-white border-neutral-200 text-neutral-400'
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual Zone */}
        <div className="relative aspect-square bg-neutral-50 rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-inner group">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-neutral-300" />
                </div>
                <h3 className="text-xl font-display mb-2">Ingest Visual Data</h3>
                <p className="text-neutral-400 text-sm mb-8">Upload any high-fidelity image to reverse-engineer its architectural DNA.</p>
                <button 
                  onClick={handleStartProcess}
                  className="px-8 py-4 bg-brand-black text-white font-mono font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-accent transition-all flex items-center gap-3"
                >
                  <Activity className="w-4 h-4" />
                  Initialize_Scan
                </button>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-black flex items-center justify-center"
              >
                {/* Mock Image with Scanning Effect */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                
                {step === 1 && (
                  <div ref={scanLineRef} className="absolute top-0 left-0 w-full h-1 bg-brand-accent shadow-[0_0_20px_#3b82f6] z-20" />
                )}

                {step === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="grid grid-cols-3 gap-1 px-4">
                      {[...Array(9)].map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1, 0.8] }}
                          transition={{ delay: i * 0.1, repeat: Infinity }}
                          className="w-16 h-16 border border-brand-accent/40 bg-brand-accent/5 rounded-lg flex items-center justify-center"
                        >
                          <div className="w-1 h-1 bg-brand-accent rounded-full animate-ping" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] flex items-center justify-center z-40">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Zone */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }}>
                <h2 className="text-4xl font-display mb-6 tracking-tighter uppercase">Protocol <span className="text-brand-accent">A-1</span></h2>
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center">
                        <Scan className="w-4 h-4 text-brand-black" />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Step 1: Parsing</span>
                    </div>
                    <p className="text-neutral-500 text-sm font-sans">The engine analyzes every pixel for lighting vectors and stylistic markers.</p>
                  </div>
                  <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-brand-black" />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Step 2: Decomposition</span>
                    </div>
                    <p className="text-neutral-500 text-sm font-sans">Elements are mapped to MJ-ready descriptors using our proprietary neural dictionary.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 animate-pulse">
                  <Cpu className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Neural_Processing_Active</span>
                </div>
                <h2 className="text-4xl font-display tracking-tighter">SCANNING <span className="text-neutral-300">MORPHOLOGY</span></h2>
                <div className="font-mono text-[11px] space-y-2 text-neutral-400 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>INDEXING_BUFFERS</span>
                    <span className="text-brand-accent">84%</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>LUMINANCE_VECTOR</span>
                    <span className="text-brand-accent">COMPUTING</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CHROMA_SYNC</span>
                    <span className="text-brand-accent">ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Layers className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Extracting_Stylistics</span>
                </div>
                <h2 className="text-4xl font-display tracking-tighter text-brand-black">MAPPING <span className="text-brand-accent">GENETICS</span></h2>
                <div className="space-y-3">
                  {['Composition: Rule of Thirds', 'Style: Brutalist Futurism', 'Lighting: Cinematic Volumetric'].map((f, i) => (
                    <motion.div 
                      key={f}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-4 p-4 bg-white border border-neutral-100 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="font-mono text-xs text-brand-black">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-black text-white">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Synthesis_Complete</span>
                </div>
                <h2 className="text-4xl font-display tracking-tighter">ABSOLUTE <span className="text-brand-accent">PROMPT</span></h2>
                <div className="p-8 bg-neutral-50 rounded-3xl border border-brand-accent/20 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-brand-black">
                    /imagine prompt: cinematic shot of a brutalist obsidian skyscraper in a neon-drenched futuristic city, volumetric lighting, hyper-realistic, shot on 35mm lens --v 6.0
                  </p>
                  <button 
                    onClick={() => setStep(0)}
                    className="mt-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-accent hover:gap-4 transition-all"
                  >
                    RESET_PROTOCOL <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReversePromptFlow;

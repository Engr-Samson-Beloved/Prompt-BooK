import React, { useState } from 'react';
import { getAbsolutePrompt } from '../openai';
import { runMJScript } from '../promptbook.mjs';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Scan, Zap, MessageSquare, Terminal } from 'lucide-react';
import ReversePromptFlow from './ReversePromptFlow';

const PromptEngine: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'manual' | 'reverse'>('manual');
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject) return;
    setIsLoading(true);
    try {
      const refined = await getAbsolutePrompt(subject, style);
      const result = runMJScript(refined);
      setFinalPrompt(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 mb-6 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            <Cpu className="w-3 h-3 text-brand-accent" />
            Core Synthesis Node v6.0
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-4 text-center tracking-tighter">
            NEURAL <span className="text-brand-accent">WORKBENCH</span>
          </h1>
          <p className="text-neutral-500 text-center max-w-lg font-sans">
            Architect high-fidelity prompts using autonomous neural synthesis.
          </p>
        </div>

        {/* Tab System */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100 shadow-sm">
            <button 
              onClick={() => setActiveMode('manual')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeMode === 'manual' 
                  ? 'bg-brand-black text-white shadow-xl shadow-black/20' 
                  : 'text-neutral-400 hover:text-brand-black'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Manual_Input
            </button>
            <button 
              onClick={() => setActiveMode('reverse')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeMode === 'reverse' 
                  ? 'bg-brand-black text-white shadow-xl shadow-black/20' 
                  : 'text-neutral-400 hover:text-brand-black'
              }`}
            >
              <Scan className="w-4 h-4" />
              Reverse_Engineer
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeMode === 'manual' ? (
            <motion.div 
              key="manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-2xl bg-white border border-neutral-100 p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                  <MessageSquare className="w-48 h-48" />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Subject Parameters</label>
                    <input 
                      placeholder="e.g. Cyberpunk Samurai, Obsidian Palace..." 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)} 
                      className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-brand-black font-sans text-lg focus:border-brand-accent/50 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Stylistic Embedding</label>
                    <input 
                      placeholder="e.g. Hyper-realistic, Studio Lighting, 8k..." 
                      value={style}
                      onChange={(e) => setStyle(e.target.value)} 
                      className="w-full p-5 bg-neutral-50 border border-neutral-100 rounded-2xl text-brand-black font-sans text-lg focus:border-brand-accent/50 outline-none transition-all"
                    />
                  </div>

                  <button 
                    onClick={handleGenerate} 
                    disabled={isLoading || !subject}
                    className="group w-full p-6 bg-brand-black text-white font-mono font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-accent transition-all disabled:opacity-20 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      {isLoading ? (
                        <>
                          <Zap className="w-4 h-4 animate-pulse" />
                          Synthesizing_Prompt...
                        </>
                      ) : (
                        <>
                          <Cpu className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          Execute_Synthesis
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {finalPrompt && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-12 pt-12 border-t border-neutral-100"
                  >
                    <div className="p-8 bg-neutral-50 rounded-3xl border border-brand-accent/10 relative">
                      <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">Output Protocol: MJ-Absolute</h3>
                      <p className="text-brand-black font-mono text-sm leading-relaxed">{finalPrompt}</p>
                      <button 
                        onClick={() => navigator.clipboard.writeText(finalPrompt)}
                        className="mt-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-black transition-colors"
                      >
                        Copy_to_Buffer
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="reverse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ReversePromptFlow />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PromptEngine;

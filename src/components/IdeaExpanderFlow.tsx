import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Cpu, Layers, Sparkles, Image as ImageIcon, CheckCircle2, ChevronRight, Activity, Loader2, Download, Save, Trash2, Shield, Globe, Palette, Code2, Coins, Zap, LayoutGrid, Terminal, Type, BrainCircuit, Share2, Binary } from 'lucide-react';
import gsap from 'gsap';
import { runStartupArchitect } from '../gemini';
import { useVault, NeuralBlueprint } from '../contexts/VaultContext';
import { useNavigate } from 'react-router-dom';

const niches = [
  { id: 'arch', label: 'Architecture', icon: <Scan className="w-4 h-4" /> },
  { id: 'prod', label: 'Product Design', icon: <Zap className="w-4 h-4" /> },
  { id: 'char', label: 'Character', icon: <Share2 className="w-4 h-4" /> },
  { id: 'env', label: 'Environment', icon: <Layers className="w-4 h-4" /> }
];

const IdeaExpanderFlow: React.FC = () => {
  const { savedBlueprints, saveBlueprint, deleteBlueprint, exportMarkdown } = useVault();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); 
  const [niche, setNiche] = useState('arch');
  const [problem, setProblem] = useState('');
  const [concept, setConcept] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NeuralBlueprint | null>(null);
  const neuralMapRef = useRef<SVGSVGElement>(null);

  const steps = [
    { id: 'context', label: 'Contextual Input', icon: <Type className="w-5 h-5" /> },
    { id: 'analyze', label: 'Semantic Parse', icon: <Binary className="w-5 h-5" /> },
    { id: 'expand', label: 'Neural Branching', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'result', label: 'Refined Output', icon: <Sparkles className="w-5 h-5" /> }
  ];

  // PERSISTENCE: Save/Load Last Draft
  useEffect(() => {
    // Load last draft if active
    const draft = localStorage.getItem('startup_architect_draft');
    if (draft) {
      const { result, niche, problem, concept } = JSON.parse(draft);
      setResult(result);
      setNiche(niche);
      setProblem(problem);
      setConcept(concept);
      if (result) setStep(3);
    }
  }, []);

  const handleSaveBlueprint = () => {
    if (result) saveBlueprint(result);
  };

  const handleDeleteBlueprint = (name: string) => {
    deleteBlueprint(name);
  };

  const handleExportMarkdown = (blueprint: NeuralBlueprint) => {
    exportMarkdown(blueprint);
  };

  const handleContinueWork = (blueprint: any) => {
    setResult(blueprint);
    setNiche('arch'); // Reset or detect
    setProblem(blueprint.product_name);
    setConcept(blueprint.mission_statement);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExpansion = async () => {
    if (!concept || !problem) return;
    setIsLoading(true);
    setStep(1);
    
    try {
      // Simulate analysis steps for UX
      setTimeout(() => setStep(2), 2500);
      
      const blueprint = await runStartupArchitect(niche, problem, concept);
      setResult(blueprint);
      
      setTimeout(() => {
        setStep(3);
        setIsLoading(false);
      }, 5500);
    } catch (error) {
      console.error("Expansion failed:", error);
      setIsLoading(false);
      setStep(0);
    }
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
      {/* Progress Timeline */}
      <div className="flex items-center justify-between mb-16 px-4 relative max-w-sm mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-100 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="relative">
            <motion.div 
              animate={step === i && isLoading ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border relative ${
                step >= i ? 'bg-brand-black border-brand-black text-white shadow-xl shadow-black/20' : 'bg-white border-neutral-200 text-neutral-400'
              }`}
            >
              {step > i ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : s.icon}
              
              {/* Active Ring */}
              {step === i && (
                <motion.div 
                  layoutId="activeRing"
                  className="absolute -inset-1 border border-brand-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
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
                className="w-full h-full p-10 overflow-y-auto flex flex-col"
              >
                <div className="mb-8">
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Target Niche</label>
                  <div className="grid grid-cols-2 gap-3">
                    {niches.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setNiche(n.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                          niche === n.id ? 'bg-brand-black text-white border-brand-black' : 'bg-white text-neutral-400 border-neutral-100 hover:border-brand-accent'
                        }`}
                      >
                        {n.icon} {n.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Problem Statement</label>
                  <input 
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="e.g. Need high-contrast lighting for a mood board..."
                    className="w-full p-4 bg-white border border-neutral-100 rounded-xl font-sans text-xs focus:border-brand-accent outline-none"
                  />
                </div>

                <div className="mb-8">
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Core Concept</label>
                  <textarea 
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Describe your raw idea..."
                    className="w-full p-4 bg-white border border-neutral-100 rounded-xl font-sans text-xs focus:border-brand-accent outline-none"
                    rows={2}
                  />
                </div>

                <button 
                  onClick={handleStartExpansion}
                  disabled={!concept || !problem}
                  className="mt-auto px-10 py-4 bg-brand-black text-white font-mono font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-accent transition-all flex items-center justify-center gap-3 disabled:opacity-20 shadow-xl shadow-black/10"
                >
                  <BrainCircuit className="w-4 h-4" />
                  INITIALIZE_SYNTHESIS
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
                  <motion.circle cx="100" cy="100" initial={{ r: 4 }} fill="#3b82f6" animate={{ r: [4, 6, 4] }} transition={{ repeat: Infinity }} />
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
                  className="px-8 py-3 bg-neutral-100 text-brand-black font-mono font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-brand-black hover:text-white transition-all"
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
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">Expansion Core</span>
                </div>
                <h2 className="text-4xl font-display mb-6 tracking-tighter uppercase leading-tight">AMPLIFY <span className="text-brand-accent">INTENT</span></h2>
                <div className="space-y-4">
                  <p className="text-neutral-500 text-base leading-relaxed mb-8">
                    Our Idea Expander takes primitive concepts and runs them through a multi-layer semantic transformer to generate cinematic, high-fidelity descriptive prompts.
                  </p>
                  <div className="flex items-center gap-4 p-5 bg-white border border-neutral-100 rounded-2xl">
                    <Zap className="w-5 h-5 text-brand-accent" />
                    <div>
                      <span className="block text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">Capability</span>
                      <span className="text-base font-bold text-brand-black">Contextual Enrichment</span>
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
                        <span className="font-mono text-xs uppercase tracking-widest">Parsing Semantic Vectors</span>
                      </div>
                      <p className="font-mono text-sm leading-relaxed text-neutral-400">
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
                            className="p-4 border border-neutral-100 rounded-xl font-mono text-[11px] uppercase tracking-widest text-neutral-500 flex items-center gap-2"
                          >
                            <ChevronRight className="w-3 h-3 text-brand-accent" />
                            {f}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                   {step === 3 && result && (
                    <div className="space-y-6 text-left">
                      <h2 className="text-4xl font-display tracking-tighter uppercase text-center">PRODUCT <span className="text-brand-accent">BLUEPRINT</span></h2>
                      <div className="p-8 bg-neutral-50 rounded-3xl border border-brand-accent/20 relative group overflow-hidden mb-6">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                          <LayoutGrid className="w-12 h-12" />
                        </div>
                        
                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-brand-black rounded-xl flex items-center justify-center">
                              <Zap className="w-5 h-5 text-brand-accent" />
                            </div>
                            <div>
                              <h4 className="text-xl font-display text-brand-black">{result.product_name || 'Nexus_Core'}</h4>
                              <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Brand_Identity</span>
                            </div>
                          </div>
                          <p className="text-brand-black font-sans text-base italic leading-relaxed border-l-2 border-brand-accent/30 pl-4">
                            "{result.mission_statement}"
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                          {/* Technical DNA */}
                          <div className="p-6 bg-neutral-900 rounded-3xl border border-white/10 text-left">
                            <div className="flex items-center gap-3 mb-4">
                              <Code2 className="w-5 h-5 text-brand-accent" />
                              <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Technical_Architecture</span>
                            </div>
                            <div className="space-y-3">
                              <div className="text-xs font-mono text-neutral-400">
                                <span className="text-brand-accent">FRONTEND:</span> {result.technical_stack?.frontend}
                              </div>
                              <div className="text-xs font-mono text-neutral-400">
                                <span className="text-brand-accent">BACKEND:</span> {result.technical_stack?.backend}
                              </div>
                              <div className="text-xs font-mono text-neutral-400">
                                <span className="text-brand-accent">DB:</span> {result.technical_stack?.database}
                              </div>
                              <div className="pt-2 border-t border-white/5">
                                <span className="block text-xs font-mono text-neutral-500 mb-2 uppercase">Schema_Snapshot</span>
                                {result.technical_stack?.schema.map((s, i) => (
                                  <div key={i} className="text-xs font-mono text-white/80 flex items-start gap-2 mb-1">
                                    <Terminal className="w-2.5 h-2.5 mt-0.5 text-brand-accent" />
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Monetization */}
                          <div className="p-6 bg-white rounded-3xl border border-neutral-100 text-left">
                            <div className="flex items-center gap-3 mb-4">
                              <Coins className="w-5 h-5 text-emerald-500" />
                              <span className="font-mono text-xs font-bold text-brand-black uppercase tracking-widest">Revenue_Model</span>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <span className="block text-[10px] font-mono text-neutral-400 mb-1">STRATEGY</span>
                                <div className="text-sm font-display text-brand-black">{result.monetization?.model}</div>
                              </div>
                              <div className="flex gap-2">
                                {result.monetization?.pricing_tiers.map(t => (
                                  <span key={t} className="px-2 py-1 bg-neutral-50 border border-neutral-100 rounded-md text-[11px] font-mono text-brand-black">{t}</span>
                                ))}
                              </div>
                              <div className="pt-2 border-t border-neutral-100">
                                <span className="block text-[10px] font-mono text-neutral-400 mb-2 uppercase">Growth_Hack</span>
                                {result.monetization?.gtm_strategy.map((s, i) => (
                                  <div key={i} className="text-xs font-sans text-neutral-600 flex items-start gap-2 mb-1">
                                    <Zap className="w-2.5 h-2.5 mt-0.5 text-emerald-500" />
                                    {s}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Design Tokens */}
                        <div className="p-6 bg-brand-accent/5 rounded-3xl border border-brand-accent/20 mb-8 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Palette className="w-4 h-4 text-brand-accent" />
                              <span className="font-mono text-xs font-bold text-brand-black uppercase">Neural_Palette:</span>
                            </div>
                            <div className="flex gap-2">
                              {result.design_tokens?.colors.map(c => (
                                <div key={c} className="flex items-center gap-2 px-2 py-1 bg-white rounded-full border border-neutral-100">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                                  <span className="text-[11px] font-mono text-neutral-400">{c}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px] font-mono text-neutral-400 mb-1">TYPOGRAPHY</span>
                            <div className="text-sm font-mono font-bold text-brand-black">{result.design_tokens?.typography}</div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <span className="block text-[11px] font-mono font-bold text-brand-accent uppercase tracking-widest mb-3">Core_Feature_Matrix</span>
                            <div className="space-y-2 text-left">
                              {result.features?.map((f: any, i) => (
                                <div key={i} className="p-3 bg-white rounded-xl border border-neutral-100 text-[11px] font-mono text-brand-black uppercase">
                                  <div className="flex items-center gap-3 mb-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    <span className="font-bold">{typeof f === 'object' ? f.name : f}</span>
                                  </div>
                                  {typeof f === 'object' && f.description && (
                                    <p className="text-[11px] text-neutral-400 font-sans normal-case ml-6">{f.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="block text-[11px] font-mono font-bold text-brand-accent uppercase tracking-widest mb-3">Execution_Roadmap</span>
                            <div className="space-y-2 text-left">
                              {result.roadmap?.map((p: any, i) => (
                                <div key={i} className="mb-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                                    <span className="text-[11px] font-mono font-bold text-brand-black uppercase">
                                      {typeof p === 'object' ? p.name || p.phase : `Phase ${i+1}`}
                                    </span>
                                  </div>
                                  <p className="text-neutral-500 font-sans text-sm leading-relaxed ml-3">
                                    {typeof p === 'object' ? p.description || p.goal : p}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Startup Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-12">
                        {[
                          { label: 'Market Fit', value: result.stats.market_fit, icon: <Globe className="w-3 h-3" /> },
                          { label: 'Complexity', value: result.stats.complexity, icon: <Shield className="w-3 h-3" /> },
                          { label: 'Scalability', value: result.stats.scalability, icon: <LayoutGrid className="w-3 h-3" /> }
                        ].map(stat => (
                          <div key={stat.label} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center">
                            <div className="text-brand-accent mb-2">{stat.icon}</div>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</span>
                            <span className="text-base font-display text-brand-black">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={handleSaveBlueprint}
                          className="px-6 py-3 bg-brand-black text-white rounded-xl font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-800 transition-all"
                        >
                          <Save className="w-4 h-4" /> Save_to_Vault
                        </button>
                        <button 
                          onClick={() => handleExportMarkdown(result)}
                          className="px-6 py-3 bg-white border border-neutral-200 text-brand-black rounded-xl font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:border-brand-accent transition-all"
                        >
                          <Download className="w-4 h-4" /> Export_Blueprint
                        </button>
                      </div>

                      <button 
                        onClick={() => { setStep(0); setResult(null); }}
                        className="mt-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-accent hover:gap-4 transition-all mx-auto"
                      >
                        INITIALIZE_NEW_CONCEPT <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Neural Vault Section */}
      {savedBlueprints.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32 pt-16 border-t border-neutral-100"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand-accent" />
              <h3 className="text-2xl font-display tracking-tight uppercase">Neural <span className="text-brand-accent">Vault</span></h3>
            </div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{savedBlueprints.length} Saved Blueprints</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {savedBlueprints.map((blueprint) => (
              <div key={blueprint.product_name} className="group p-6 bg-white border border-neutral-100 rounded-3xl hover:border-brand-accent transition-all flex items-center justify-between shadow-sm">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.2em] mb-1">{blueprint.stats.market_fit}% Market Fit</span>
                  <h4 className="text-xl font-display text-brand-black">{blueprint.product_name}</h4>
                  <p className="text-[10px] text-neutral-400 font-sans truncate max-w-[200px]">{blueprint.mission_statement}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleExportMarkdown(blueprint)}
                    className="p-3 bg-neutral-50 text-neutral-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all"
                    title="Export Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBlueprint(blueprint.product_name || '')}
                    className="p-3 bg-neutral-50 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Neural Vault Section */}
      {savedBlueprints.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32 pt-16 border-t border-neutral-100"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand-accent" />
              <h3 className="text-2xl font-display tracking-tight uppercase">Neural <span className="text-brand-accent">Vault</span></h3>
            </div>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{savedBlueprints.length} Saved Blueprints</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {savedBlueprints.map((blueprint) => (
              <div key={blueprint.product_name} className="group p-6 bg-white border border-neutral-100 rounded-3xl hover:border-brand-accent transition-all flex items-center justify-between shadow-sm">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-[0.2em] mb-1">{blueprint.stats.market_fit}% Market Fit</span>
                  <h4 className="text-xl font-display text-brand-black">{blueprint.product_name}</h4>
                  <p className="text-[10px] text-neutral-400 font-sans truncate max-w-[200px]">{blueprint.mission_statement}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleExportMarkdown(blueprint)}
                    className="p-3 bg-neutral-50 text-neutral-400 hover:text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all"
                    title="Export Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBlueprint(blueprint.product_name || '')}
                    className="p-3 bg-neutral-50 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IdeaExpanderFlow;

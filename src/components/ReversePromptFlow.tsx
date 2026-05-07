import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Cpu, Layers, Sparkles, Image as ImageIcon, CheckCircle2, ChevronRight, Activity, Loader2, Upload, Copy, Terminal, FileCode, Braces } from 'lucide-react';
import gsap from 'gsap';
import { runNeuralScan, NeuralBlueprint } from '../gemini';

const ReversePromptFlow: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Upload, 1: Scanning, 2: Feature Extraction, 3: Result
  const [preview, setPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [userDescription, setUserDescription] = useState('');
  const [outputFormat, setOutputFormat] = useState<'json' | 'xml' | 'yaml'>('json');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NeuralBlueprint | null>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 'upload', label: 'Input Acquisition', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'scan', label: 'Neural Scan', icon: <Scan className="w-5 h-5" /> },
    { id: 'features', label: 'Feature Mapping', icon: <Layers className="w-5 h-5" /> },
    { id: 'result', label: 'Final Synthesis', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setImageBase64(base64.split(',')[1]); // Remove data:image/jpeg;base64,
      };
      reader.readAsDataURL(file);
    }
  };

  // PERSISTENCE: Save/Load Neural Drafts
  useEffect(() => {
    const saved = localStorage.getItem('neural_scan_draft');
    if (saved) {
      const { result, preview, imageBase64 } = JSON.parse(saved);
      setResult(result);
      setPreview(preview);
      setImageBase64(imageBase64);
      setStep(3); // Jump to result if draft exists
    }
  }, []);

  useEffect(() => {
    if (result) {
      localStorage.setItem('neural_scan_draft', JSON.stringify({ result, preview, imageBase64 }));
    }
  }, [result, preview, imageBase64]);

  const handleStartProcess = async () => {
    if (!imageBase64) return;
    setIsLoading(true);
    setError(null);
    setStep(1);
    
    try {
      const mappingTimer = setTimeout(() => setStep(2), 2000);

      const blueprint = await runNeuralScan("Decompose this image for reconstruction", imageBase64, userDescription);
      
      clearTimeout(mappingTimer);
      setResult(blueprint);
      setStep(3); // Advance immediately when data is ready
    } catch (err: any) {
      console.error("Neural Scan failed:", err);
      setError(err.message || "Connection to Neural Core lost.");
      setStep(0);
    } finally {
      setIsLoading(false);
    }
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
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-neutral-100 flex items-center justify-center mb-6 cursor-pointer hover:scale-110 transition-transform group"
                >
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover rounded-3xl" alt="Preview" />
                  ) : (
                    <Upload className="w-8 h-8 text-neutral-300 group-hover:text-brand-accent transition-colors" />
                  )}
                </div>

                <h3 className="text-xl font-display mb-2">Ingest Visual Data</h3>
                <p className="text-neutral-400 text-sm mb-6">Upload any high-fidelity image to reverse-engineer its architectural DNA.</p>
                
                <div className="w-full mb-8">
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2 text-left">Additional Context (Optional)</label>
                  <textarea 
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    placeholder="e.g. Focus on the lighting, Ignore the background..."
                    className="w-full p-4 bg-white border border-neutral-100 rounded-xl font-sans text-xs focus:border-brand-accent outline-none resize-none"
                    rows={2}
                  />
                </div>

                <button 
                  onClick={handleStartProcess}
                  disabled={!preview || isLoading}
                  className="w-full px-8 py-4 bg-brand-black text-white font-mono font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-accent transition-all flex items-center justify-center gap-3 disabled:opacity-20 shadow-xl shadow-black/10"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                  {isLoading ? 'Processing...' : 'Initialize_Scan'}
                </button>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-black flex items-center justify-center"
              >
                {/* Background Image / Preview */}
                <div 
                  className="absolute inset-0 opacity-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${preview})` }}
                />
                
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
                <h2 className="text-4xl font-display tracking-tighter text-brand-black text-left">MAPPING <span className="text-brand-accent">GENETICS</span></h2>
                <div className="space-y-3">
                  {(result?.features || ['Analyzing Texture', 'Mapping Light', 'Decomposing Form']).map((f, i) => (
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

            {step === 3 && result && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-black text-white">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Synthesis_Complete</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-4xl font-display tracking-tighter uppercase">ABSOLUTE <span className="text-brand-accent">PROMPT</span></h2>
                  
                  {/* Format Switcher */}
                  <div className="flex bg-neutral-100 p-1 rounded-lg border border-neutral-200">
                    {[
                      { id: 'json', icon: <Braces className="w-3 h-3" /> },
                      { id: 'xml', icon: <FileCode className="w-3 h-3" /> },
                      { id: 'yaml', icon: <Terminal className="w-3 h-3" /> }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setOutputFormat(f.id as any)}
                        className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 text-[8px] font-mono font-bold uppercase ${
                          outputFormat === f.id ? 'bg-white text-brand-black shadow-sm' : 'text-neutral-400'
                        }`}
                      >
                        {f.icon} {f.id}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-neutral-50 rounded-3xl border border-brand-accent/20 relative group overflow-hidden">
                  <button 
                    onClick={() => {
                      const textToCopy = outputFormat === 'json' ? result.absolute_prompt : 
                                        outputFormat === 'xml' ? result.xml_prompt : result.yaml_prompt;
                      navigator.clipboard.writeText(textToCopy || '');
                    }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-lg border border-neutral-100 hover:border-brand-accent transition-all text-neutral-400 hover:text-brand-accent"
                    title="Copy to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <div className="absolute top-0 left-0 p-4 opacity-5">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  
                  <pre className="font-mono text-[11px] leading-relaxed text-brand-black italic whitespace-pre-wrap max-h-[200px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-neutral-200">
                    {outputFormat === 'json' ? result.absolute_prompt : 
                     outputFormat === 'xml' ? result.xml_prompt : 
                     result.yaml_prompt}
                  </pre>
                  
                  <button 
                    onClick={() => { setStep(0); setResult(null); setPreview(null); setUserDescription(''); }}
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

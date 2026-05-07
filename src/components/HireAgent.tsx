import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Bot, Sparkles, ChevronRight, Phone, Calendar, UserCheck, Shield, BrainCircuit, Zap, Globe, MessageSquare, ArrowRight, CheckCircle2, Download, ExternalLink, Users, Target, Search } from 'lucide-react';
import { runStartupArchitect, NeuralBlueprint } from '../gemini';
import { generateBrandConstitution } from '../services/ExportService';

const MoodboardGrid: React.FC<{ prompts: string[], colors: string[] }> = ({ prompts, colors }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {prompts.slice(0, 4).map((prompt, idx) => (
        <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <Sparkles className="w-6 h-6 text-neutral-300 mb-2 group-hover:text-brand-accent transition-colors" />
            <p className="text-[8px] font-mono text-neutral-400 uppercase leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
              {prompt.substring(0, 60)}...
            </p>
          </div>
          {/* Placeholder for real AI image generation integration */}
          <div className="absolute bottom-3 right-3 flex gap-1">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const RoboticAgentVisual: React.FC<{ isCalling: boolean, isHovered: boolean, color?: string }> = ({ isCalling, isHovered, color = "#ffcc00" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const size = containerRef.current.clientWidth;
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(new THREE.Color(color), 2);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    const robotGroup = new THREE.Group();

    // Robot Head (Glass/Sleek)
    const headGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 1,
      envMapIntensity: 1,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    robotGroup.add(head);

    // Eye Visor (Emissive)
    const visorGeo = new THREE.BoxGeometry(1.6, 0.2, 0.5);
    const visorMat = new THREE.MeshStandardMaterial({ 
      color: 0x000000, 
      emissive: new THREE.Color(color), 
      emissiveIntensity: 1 
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.2, 0.9);
    robotGroup.add(visor);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.4, 0.6, 0.8, 32);
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = -1.5;
    robotGroup.add(neck);

    // Floating Plates (Technical Detail)
    const plateGeo = new THREE.BoxGeometry(0.8, 1.2, 0.1);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    const plateL = new THREE.Mesh(plateGeo, plateMat);
    const plateR = new THREE.Mesh(plateGeo, plateMat);
    plateL.position.set(-1.8, 0, 0);
    plateR.position.set(1.8, 0, 0);
    robotGroup.add(plateL, plateR);

    scene.add(robotGroup);
    camera.position.set(0, 0, 6);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // GSAP Animations
    gsap.to(robotGroup.position, {
      y: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(robotGroup.rotation, {
      y: 0.1,
      x: 0.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Eye Flicker
    const flicker = () => {
      gsap.to(visorMat, {
        emissiveIntensity: Math.random() * 2 + 1,
        duration: 0.1,
        onComplete: () => setTimeout(flicker, Math.random() * 2000)
      });
    };
    flicker();

    if (isCalling) {
      gsap.to(visorMat, { emissiveIntensity: 5, color: 0xff0000, duration: 0.5 });
      gsap.to(robotGroup.rotation, { y: Math.PI * 2, duration: 2, ease: "power2.inOut" });
    } else {
      gsap.to(visorMat, { emissiveIntensity: 1, color: new THREE.Color(color), duration: 0.5 });
    }

    if (isHovered) {
      gsap.to(robotGroup.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 0.5 });
      gsap.to(headMat, { opacity: 0.2, transparent: true, duration: 0.5 });
    } else {
      gsap.to(robotGroup.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
      gsap.to(headMat, { opacity: 1, transparent: false, duration: 0.5 });
    }

    return () => {
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, [isCalling, isHovered, color]);

  return <div ref={containerRef} className="w-full h-full" />;
};

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const HireAgent: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<'brand' | 'social'>('brand');
  const [activeStep, setActiveStep] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brandInfo, setBrandInfo] = useState({ name: '', vision: '', audience: '' });
  const [blueprint, setBlueprint] = useState<NeuralBlueprint | null>(null);

  const agents = {
    brand: {
      name: 'K-7 BRAND ARCHITECT',
      color: '#ffcc00',
      tagline: 'High-fidelity brand DNA construction.',
      manifesto: 'I am K-7. In the era of AGI, traditional branding is obsolete. Why spend weeks and thousands on slow human iterations? I architect high-fidelity brand DNA in seconds with 99.8% semantic accuracy.',
      steps: [
        { id: 'identity', label: 'Brand_Identity', description: 'What is the designation of your venture?' },
        { id: 'vision', label: 'Core_Vision', description: 'Describe the world your brand intends to build.' },
        { id: 'audience', label: 'Neural_Target', description: 'Who are the primary biological nodes you are targeting?' },
        { id: 'link', label: 'Neural_Link', description: 'Finalize engagement via direct communication.' }
      ]
    },
    social: {
      name: 'S-4 SOCIAL TWIN',
      color: '#00ccff',
      tagline: 'Autonomous communication & customer sync.',
      manifesto: 'I am S-4. I handle the stress of human interaction so you don\'t have to. I manage your Gmail, WhatsApp, and Social platforms with zero latency. I am fast, accurate, and execute with absolute autonomy.',
      steps: [
        { id: 'sync', label: 'Platform_Sync', description: 'Connect your Gmail and WhatsApp channels.' },
        { id: 'tone', label: 'Voice_Calibration', description: 'How should I respond to your customers?' },
        { id: 'auth', label: 'Neural_Scan', description: 'Scan the QR code to grant autonomous access.' },
        { id: 'active', label: 'Live_Execution', description: 'I am now managing your social ecosystem.' }
      ]
    }
  };

  const currentAgent = agents[activeAgent];

  const handleNext = () => {
    if (activeStep < currentAgent.steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await runStartupArchitect(brandInfo.audience, brandInfo.vision, brandInfo.name);
      setBlueprint(result);
      setActiveStep(3);
    } catch (error) {
      console.error("Failed to generate blueprint:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      handleGenerate();
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section: The Era of AGI */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-brand-accent/5 to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-8"
          >
            <BrainCircuit className="w-4 h-4 text-brand-accent" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">The Agentic Transition</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-display tracking-tighter uppercase mb-8 leading-[0.85]"
          >
            BEYOND <span className="text-brand-accent">PROMPTING.</span><br/>
            ENTER <span className="text-neutral-200 italic">AGI.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 text-xl md:text-2xl max-w-3xl mx-auto font-sans leading-relaxed mb-12"
          >
            We have transitioned from passive generative models to **Autonomous Agentic Systems**. Our agents don't just generate—they strategize, communicate, and execute with the precision of Artificial General Intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="text-4xl font-display font-bold text-brand-black">200+</span>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">Satisfied_Founders</span>
            </div>
            <div className="w-px h-12 bg-neutral-100 hidden md:block" />
            <a 
              href="/portfolio"
              className="group flex items-center gap-4 text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em] hover:text-brand-black transition-all"
            >
              VIEW_ARCHITECTURAL_VAULT 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Agent Interface */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        
        {/* Agent Selector Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200">
            {(['brand', 'social'] as const).map((key) => (
              <button
                key={key}
                onClick={() => { setActiveAgent(key); setActiveStep(0); }}
                className={`px-8 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                  activeAgent === key 
                    ? 'bg-white text-brand-black shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {key === 'brand' ? 'Brand Architect' : 'Social Twin'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Agent Visual Side (3D Robotic Agent) */}
          <motion.div 
            key={activeAgent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group/agent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100 aspect-square bg-white flex items-center justify-center cursor-help">
              <div className="absolute inset-0 z-0">
                <RoboticAgentVisual isCalling={isCalling} isHovered={isHovered} color={currentAgent.color} />
              </div>
              
              {/* Typewriter Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 bg-brand-black/90 backdrop-blur-sm p-12 flex flex-col justify-center text-left"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: currentAgent.color }}>Neural_Manifesto_v1.0</span>
                    <p className="text-white font-mono text-base leading-relaxed tracking-tight">
                      <TypewriterText text={currentAgent.manifesto} />
                    </p>
                    <div className="mt-8 flex items-center gap-2 font-mono text-[10px] font-bold uppercase" style={{ color: currentAgent.color }}>
                      <Zap className="w-3 h-3" /> Efficiency_Index: 99.8%
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white to-transparent pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: currentAgent.color }} />
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-bold">Neural_Status: Active</span>
                </div>
                <h2 className="text-4xl font-display text-brand-black uppercase tracking-tight">{currentAgent.name}</h2>
              </div>
            </div>
            
            {/* Status Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 p-6 bg-white shadow-2xl rounded-3xl border border-neutral-100 max-w-[200px] hidden md:block z-10"
            >
              <Zap className="w-6 h-6 mb-3" style={{ color: currentAgent.color }} />
              <span className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Processing_Speed</span>
              <span className="text-xl font-display">4.2 TB/s</span>
            </motion.div>
          </motion.div>

          {/* Interaction Flow Side */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: currentAgent.color }}>Deployment_Phase_0{activeStep + 1}</span>
              <h3 className="text-5xl font-display uppercase tracking-tighter mb-6">{currentAgent.tagline.split(' ')[0]} <span className="text-neutral-300 italic">{currentAgent.tagline.split(' ').slice(1).join(' ')}</span></h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Provide high-fidelity metadata to construct your agentic DNA. Follow the neural sequence below.
              </p>
            </div>

            <div className="relative p-10 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 min-h-[420px] flex flex-col">
              {/* Step Indicators */}
              <div className="flex gap-2 mb-10">
                {currentAgent.steps.map((s, idx) => (
                  <div 
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= activeStep ? 'bg-brand-black' : 'bg-neutral-200'}`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${activeAgent}-${activeStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-grow"
                >
                  <div className="mb-8 text-left">
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">{currentAgent.steps[activeStep].label}</span>
                    <h4 className="text-3xl font-display text-brand-black uppercase tracking-tight leading-tight">{currentAgent.steps[activeStep].description}</h4>
                  </div>

                  {activeAgent === 'brand' ? (
                    <>
                      {activeStep === 0 && (
                        <input 
                          type="text" 
                          placeholder="Enter Brand Name..." 
                          className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-5 font-sans text-lg focus:outline-none focus:border-brand-accent transition-all shadow-inner"
                          value={brandInfo.name}
                          onChange={(e) => setBrandInfo({...brandInfo, name: e.target.value})}
                        />
                      )}

                      {activeStep === 1 && (
                        <textarea 
                          placeholder="Our vision is to..." 
                          className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-5 font-sans text-lg focus:outline-none focus:border-brand-accent transition-all h-32 resize-none shadow-inner"
                          value={brandInfo.vision}
                          onChange={(e) => setBrandInfo({...brandInfo, vision: e.target.value})}
                        />
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-6">
                          <div className="flex gap-4">
                            <button onClick={startCall} className="flex-1 py-5 bg-brand-black text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-lg">
                              <Phone className="w-4 h-4" /> CALL_NOW
                            </button>
                            <button onClick={handleNext} className="flex-1 py-5 bg-white border border-neutral-200 text-brand-black rounded-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:border-brand-accent transition-all shadow-sm">
                              <Calendar className="w-4 h-4" /> SCHEDULE
                            </button>
                          </div>
                          <p className="text-center text-xs font-mono text-neutral-400 uppercase tracking-widest italic leading-relaxed px-8">
                            "I am ready to process your vocal patterns and expectations." — K-7
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {activeStep === 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={handleNext} className="p-6 bg-white border border-neutral-200 rounded-2xl hover:border-brand-accent transition-all text-left">
                            <Globe className="w-6 h-6 mb-3 text-brand-accent" />
                            <span className="block font-bold text-sm">GMAIL_SYNC</span>
                            <span className="text-[10px] text-neutral-400">Manage Communications</span>
                          </button>
                          <button onClick={handleNext} className="p-6 bg-white border border-neutral-200 rounded-2xl hover:border-brand-accent transition-all text-left">
                            <MessageSquare className="w-6 h-6 mb-3 text-emerald-500" />
                            <span className="block font-bold text-sm">WHATSAPP_LINK</span>
                            <span className="text-[10px] text-neutral-400">Instant Response</span>
                          </button>
                        </div>
                      )}

                      {activeStep === 1 && (
                        <div className="space-y-4">
                          <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-between">
                            <span className="text-sm font-bold">Formal_Professional</span>
                            <div className="w-4 h-4 rounded-full border-2 border-brand-accent bg-brand-accent" />
                          </div>
                          <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-center justify-between opacity-50">
                            <span className="text-sm font-bold">Friendly_Conversational</span>
                            <div className="w-4 h-4 rounded-full border-2 border-neutral-200" />
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="w-32 h-32 bg-white p-4 border border-neutral-200 rounded-2xl mb-6 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-2 opacity-20">
                              {[...Array(9)].map((_, i) => <div key={i} className="w-4 h-4 bg-black" />)}
                            </div>
                          </div>
                          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest animate-pulse">Waiting_for_QR_Scan...</p>
                        </div>
                      )}
                    </>
                  )}

                  {activeStep === 3 && (
                    <div className="text-center space-y-8">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm space-y-6">
                           <div>
                              <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-2">Neural_Blueprint</span>
                              <h5 className="text-3xl font-display uppercase tracking-tight text-brand-black">{blueprint?.product_name || "PROTOTYPE_v1"}</h5>
                              <p className="text-sm text-neutral-500 mt-2 italic">"{blueprint?.mission_statement}"</p>
                           </div>

                           <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-50 rounded-lg"><Search className="w-4 h-4 text-brand-accent" /></div>
                                <div>
                                   <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Market_Gap</span>
                                   <p className="text-xs text-brand-black font-medium">{blueprint?.market_gap || "Analyzing scarcity patterns..."}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-neutral-50 rounded-lg"><Target className="w-4 h-4 text-emerald-500" /></div>
                                <div>
                                   <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Neural_Target</span>
                                   <p className="text-xs text-brand-black font-medium">{blueprint?.psychographics?.persona || "Biological nodes mapped."}</p>
                                </div>
                              </div>
                           </div>

                           <button 
                              onClick={() => blueprint && generateBrandConstitution(blueprint)}
                              className="w-full py-4 bg-brand-black text-white rounded-2xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all group"
                           >
                              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> EXPORT_CONSTITUTION_PDF
                           </button>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8">
                           <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">Aesthetic_Moodboard</span>
                           <MoodboardGrid prompts={blueprint?.moodboard_prompts || []} colors={blueprint?.design_tokens?.colors || ['#ffcc00', '#000', '#fff']} />
                        </div>
                      </div>

                      <button 
                        onClick={() => { setActiveStep(0); setBlueprint(null); }}
                        className="text-[10px] font-mono font-bold uppercase tracking-widest hover:gap-4 flex items-center gap-2 mx-auto transition-all text-neutral-400"
                      >
                        RESTART_PROTOCOL <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {activeStep < (activeAgent === 'social' && activeStep === 2 ? 3 : 2) && (
                <button 
                  onClick={activeAgent === 'brand' && activeStep === 2 ? handleGenerate : handleNext}
                  disabled={isGenerating}
                  className={`mt-8 py-5 bg-brand-black text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all group ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-accent'}`}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 animate-pulse" /> SCANNING_DNA...
                    </>
                  ) : (
                    <>
                      {activeAgent === 'brand' && activeStep === 2 ? 'ARCHITECT_DNA' : 'NEXT_SEQUENCE'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call Overlay Simulation */}
      <AnimatePresence>
        {(isCalling || isGenerating) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-white"
          >
            <div className="relative mb-12">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-40 h-40 rounded-full border-4 border-brand-accent/30 flex items-center justify-center"
              >
                <div className="w-32 h-32 rounded-full border-2 border-brand-accent flex items-center justify-center">
                  <Bot className="w-16 h-16 text-brand-accent" />
                </div>
              </motion.div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-accent text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-lg">
                {isGenerating ? 'SYNTHESIS_ACTIVE' : 'LINK_ACTIVE'}
              </div>
            </div>
            
            <h3 className="text-4xl font-display uppercase tracking-widest mb-4">
              {isGenerating ? 'Neural_Synthesis_' : 'Neural_Session_'}
            </h3>
            <p className="text-neutral-400 font-mono text-sm uppercase tracking-[0.2em] mb-12">
              {isGenerating ? 'Constructing high-fidelity brand DNA...' : 'Analyzing biological vocal patterns...'}
            </p>
            
            <div className="flex gap-4">
              <motion.div 
                animate={{ height: [4, 16, 4] }} 
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1.5 bg-brand-accent" 
              />
              <motion.div 
                animate={{ height: [4, 32, 4] }} 
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                className="w-1.5 bg-brand-accent" 
              />
              <motion.div 
                animate={{ height: [4, 24, 4] }} 
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                className="w-1.5 bg-brand-accent" 
              />
              <motion.div 
                animate={{ height: [4, 12, 4] }} 
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                className="w-1.5 bg-brand-accent" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HireAgent;

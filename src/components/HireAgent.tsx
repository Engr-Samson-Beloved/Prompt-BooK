import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Bot, Sparkles, ChevronRight, Phone, Calendar, UserCheck, Shield, BrainCircuit, Zap, Globe, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

const RoboticAgentVisual: React.FC<{ isCalling: boolean, isHovered: boolean }> = ({ isCalling, isHovered }) => {
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
    const pointLight = new THREE.PointLight(0xffcc00, 2);
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
      emissive: 0xffcc00, 
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
      gsap.to(visorMat, { emissiveIntensity: 1, color: 0x000000, duration: 0.5 });
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
  }, [isCalling, isHovered]);

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
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const HireAgent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [brandInfo, setBrandInfo] = useState({ name: '', vision: '', audience: '' });

  const steps = [
    { id: 'identity', label: 'Brand_Identity', description: 'What is the designation of your venture?' },
    { id: 'vision', label: 'Core_Vision', description: 'Describe the world your brand intends to build.' },
    { id: 'audience', label: 'Neural_Target', description: 'Who are the primary biological nodes you are targeting?' },
    { id: 'link', label: 'Neural_Link', description: 'Finalize engagement via direct communication.' }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const startCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      // Simulation: After call, move to final date assignment
      setIsCalling(false);
      setActiveStep(3);
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

      {/* Main Agent Interface: Brand Expert */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Agent Visual Side (3D Robotic Agent) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative group/agent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100 aspect-square bg-white flex items-center justify-center cursor-help">
              <div className="absolute inset-0 z-0">
                <RoboticAgentVisual isCalling={isCalling} isHovered={isHovered} />
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
                    <span className="text-brand-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Neural_Manifesto_v1.0</span>
                    <p className="text-white font-mono text-base leading-relaxed tracking-tight">
                      <TypewriterText text="I am K-7. In the era of AGI, traditional branding is obsolete. Why spend weeks and thousands on slow human iterations? I architect high-fidelity brand DNA in seconds with 99.8% semantic accuracy. Fast. Efficient. Unignorable. My designs are not just art—they are mathematical certainties of market fit." />
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-brand-accent font-mono text-[10px] font-bold uppercase">
                      <Zap className="w-3 h-3" /> Efficiency_Index: 99.8%
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white to-transparent pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-bold">Neural_Status: Active</span>
                </div>
                <h2 className="text-4xl font-display text-brand-black uppercase tracking-tight">K-7 BRAND ARCHITECT</h2>
              </div>
            </div>
            
            {/* Status Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 p-6 bg-white shadow-2xl rounded-3xl border border-neutral-100 max-w-[200px] hidden md:block z-10"
            >
              <Zap className="w-6 h-6 text-brand-accent mb-3" />
              <span className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Processing_Speed</span>
              <span className="text-xl font-display">4.2 TB/s</span>
            </motion.div>
          </motion.div>

          {/* Interaction Flow Side */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="text-brand-accent font-mono text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Deployment_Phase_01</span>
              <h3 className="text-5xl font-display uppercase tracking-tighter mb-6">THE BRAND <span className="text-neutral-300 italic">DISCOVERY.</span></h3>
              <p className="text-neutral-500 text-lg leading-relaxed">
                The K-7 Architect requires high-fidelity metadata to construct your brand DNA. Follow the neural sequence below.
              </p>
            </div>

            <div className="relative p-10 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 min-h-[400px] flex flex-col">
              {/* Step Indicators */}
              <div className="flex gap-2 mb-10">
                {steps.map((s, idx) => (
                  <div 
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= activeStep ? 'bg-brand-black' : 'bg-neutral-200'}`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-grow"
                >
                  <div className="mb-8">
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">{steps[activeStep].label}</span>
                    <h4 className="text-3xl font-display text-brand-black uppercase tracking-tight">{steps[activeStep].description}</h4>
                  </div>

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

                  {activeStep === 3 && (
                    <div className="text-center space-y-8">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <div>
                        <h5 className="text-2xl font-display uppercase mb-2">NEURAL_SYNC_COMPLETE</h5>
                        <p className="text-neutral-500 text-base">The Brand Architect has finalized your session. Deployment scheduled for:</p>
                        <div className="mt-4 p-4 bg-brand-black text-white rounded-2xl font-mono text-xl font-bold tracking-[0.2em]">
                          MAY_12_2026 // 10:00_GMT
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveStep(0)}
                        className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest hover:gap-4 flex items-center gap-2 mx-auto transition-all"
                      >
                        RESTART_PROTOCOL <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {activeStep < 2 && (
                <button 
                  onClick={handleNext}
                  className="mt-8 py-5 bg-brand-black text-white rounded-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-accent transition-all group"
                >
                  NEXT_SEQUENCE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call Overlay Simulation */}
      <AnimatePresence>
        {isCalling && (
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
                LINK_ACTIVE
              </div>
            </div>
            
            <h3 className="text-4xl font-display uppercase tracking-widest mb-4">Neural Session_</h3>
            <p className="text-neutral-400 font-mono text-sm uppercase tracking-[0.2em] mb-12">Analyzing biological vocal patterns...</p>
            
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

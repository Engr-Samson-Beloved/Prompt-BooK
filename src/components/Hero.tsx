import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownRight, Terminal, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const designs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    prompt: "Minimalist 3D abstract fluid shapes, iridescent colors, high gloss",
    model: "Midjourney v6"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
    prompt: "Cyberpunk street photography, neon rain, reflection on puddles",
    model: "DALL-E 3"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    prompt: "Futuristic architectural visualization, organic curves, sustainable city",
    model: "SD 3.5"
  }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % designs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 overflow-hidden py-24 px-6">
      {/* Background Glows */}
      <div className="glow-bg -top-20 -left-20 opacity-30" />
      <div className="glow-bg -bottom-20 -right-20 opacity-20" />

      {/* Interactive 3D Book Showcase */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center w-full max-w-[500px]"
      >
        <div className="book-scene" style={{ scale: '0.9' }}>
          <div 
            className={`book-container ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Front Cover */}
            <div className="book-cover book-cover-front">
              <div className="text-[3rem] font-black text-[#c8a03c] tracking-[5px] drop-shadow-[0_0_20px_rgba(200,160,60,0.3)]">PB</div>
              <div className="text-[0.8rem] text-white/50 mt-2 tracking-[2px] uppercase">PROMPTBOOK</div>
              <div className="mt-12 flex flex-col items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#c8a03c] animate-bounce" />
                <span className="text-[0.6rem] text-[#c8a03c] font-bold tracking-widest">TAP TO REVEAL</span>
              </div>
            </div>

            {/* Inside Pages */}
            <div className="book-pages">
              <div className="book-page overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={designs[activeIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col p-6"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-inner">
                      <img 
                        src={designs[activeIndex].image} 
                        alt="AI Design" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-brand-black/60" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                          {designs[activeIndex].model}
                        </span>
                      </div>
                      <p className="text-[11px] font-sans leading-relaxed text-neutral-800 line-clamp-4 italic border-l-2 border-[#c8a03c]/30 pl-3">
                        "{designs[activeIndex].prompt}"
                      </p>
                      <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-brand-accent" />
                          <span className="text-[8px] font-bold text-brand-black">VERIFIED OUTPUT</span>
                        </div>
                        <span className="text-[8px] font-bold text-neutral-300">0{activeIndex + 1} / 0{designs.length}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Back Cover */}
            <div className="book-cover" style={{ transform: 'translateZ(-40px)', zIndex: 0 }} />
          </div>
        </div>

        {/* Decorative elements around the book */}
        <div className="absolute -inset-12 border border-dashed border-neutral-200 rounded-[3rem] -z-10 animate-[spin_120s_linear_infinite]" />
      </motion.div>

      {/* Content Column */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">AI AGENT ACTIVE</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-display mb-6 leading-[0.9] tracking-tight">
          prompt<span className="text-neutral-300">Book</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-6">
          Reverse-engineer creativity.
        </h2>
        
        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-sans mb-10 max-w-md">
          A high-end agentic platform that generates prompts from any AI output and delivers them as reusable microservices.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-3 px-10 py-5 bg-brand-black text-white rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 group"
          >
            Explore Carousel 
            <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 px-8 py-5 bg-white border border-neutral-200 rounded-full text-neutral-600 font-semibold hover:bg-neutral-50 transition-colors"
          >
            Features
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

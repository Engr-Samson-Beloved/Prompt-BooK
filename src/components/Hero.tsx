import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 overflow-hidden py-20">
      {/* Background Glow */}
      <div className="glow-bg -top-20 -left-20" />
      <div className="glow-bg -bottom-20 -right-20" />

      {/* Profile Image Column */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-[1.5px] border-neutral-200 p-2">
          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 border-[1px] border-neutral-100">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" 
              alt="Isaac Adebayo"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        {/* Abstract Circle decoration */}
        <div className="absolute -inset-4 border border-dashed border-neutral-300 rounded-full -z-10 animate-[spin_60s_linear_infinite]" />
      </motion.div>

      {/* Content Column */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg"
      >
        <h1 className="text-6xl md:text-8xl font-display mb-2 drop-shadow-sm">Isaac A</h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-4">Fullstack Engineer</h2>
        
        <div className="mb-6">
          <ShieldCheck className="w-10 h-10 text-neutral-400" strokeWidth={1} />
        </div>

        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-sans mb-8">
          Hi, I'm Isaac Adebayo — S-tier fullstack engineer crafting optimized, maintainable solutions that scale
        </p>

        <button 
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-3 px-8 py-4 bg-white border border-brand-black rounded-full text-brand-black font-semibold hover:bg-neutral-50 transition-colors group"
        >
          Portfolio 
          <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;

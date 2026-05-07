import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Download, Trash2, ChevronRight, Shield, Zap, Sparkles } from 'lucide-react';
import { useVault } from '../contexts/VaultContext';
import { useNavigate } from 'react-router-dom';

const Portfolio: React.FC = () => {
  const { savedBlueprints, deleteBlueprint, exportMarkdown } = useVault();
  const navigate = useNavigate();

  const staticProjects = [
    { title: "Cyberpunk Cityscape", category: "Midjourney v6", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop" },
    { title: "Minimalist Product Render", category: "DALL-E 3", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" },
    { title: "Corporate Branding Kit", category: "Stable Diffusion 3.5", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" },
    { title: "Cinematic Character Portrait", category: "Firefly 2", image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-accent/5 border border-brand-accent/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-black">Neural Template Library</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-display tracking-tighter uppercase"
        >
          YOUR <span className="text-brand-accent">BLUEPRINTS</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        <AnimatePresence mode="popLayout">
          {savedBlueprints.map((blueprint, idx) => (
            <motion.div
              key={blueprint.product_name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-neutral-100 rounded-[2.5rem] p-8 hover:border-brand-accent transition-all shadow-sm hover:shadow-2xl hover:shadow-brand-accent/5"
            >
              <div className="flex flex-col h-full text-left">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">Active_Architect</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-brand-accent uppercase">{blueprint.stats.market_fit}% Fit</div>
                </div>

                <h3 className="text-3xl font-display text-brand-black mb-4 leading-tight">{blueprint.product_name}</h3>
                <p className="text-neutral-500 text-sm font-sans line-clamp-3 mb-8 leading-relaxed">
                  {blueprint.mission_statement}
                </p>

                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => navigate('/')} // We'll need a better way to route back with data
                    className="w-full py-4 bg-brand-black text-white rounded-2xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-accent transition-all"
                  >
                    CONTINUE_WORK <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => exportMarkdown(blueprint)}
                      className="flex-1 py-3 bg-neutral-50 text-neutral-400 rounded-xl hover:text-brand-accent hover:bg-brand-accent/5 transition-all flex items-center justify-center gap-2 font-mono text-[9px] font-bold uppercase"
                    >
                      <Download className="w-3.5 h-3.5" /> MD_EXPORT
                    </button>
                    <button 
                      onClick={() => deleteBlueprint(blueprint.product_name)}
                      className="p-3 bg-neutral-50 text-neutral-400 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-display uppercase tracking-tighter mb-12">Visual <span className="text-neutral-300">Inspiration</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {staticProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-neutral-100 mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-500 flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10" />
                </div>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-[0.2em]">{project.category}</span>
                <h3 className="text-3xl font-display mt-2 text-brand-black">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

import React from 'react';
import { motion } from 'motion/react';
import { Scan, Expand, LayoutGrid, ArrowLeftRight, Network, Lock, ArrowUpRight, Cog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: "Reverse Prompt Engine",
    desc: "Upload any image and our AI analyzes composition, lighting, and style to return a structured prompt.",
    icon: <Scan className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-[#FFB703]/20 text-[#FFB703]",
  },
  {
    title: "Idea Expander",
    desc: "Type a rough idea and expand it into a full, production-ready prompt with mood board references.",
    icon: <Expand className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-[#E34F26]/20 text-[#E34F26]",
  },
  {
    title: "High-End Carousel",
    desc: "Curated gallery of stunning AI outputs. Find a style you like, click 'Get Prompt as API'.",
    icon: <LayoutGrid className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-[#61DAFB]/20 text-[#61DAFB]",
  },
  {
    title: "Cross-Model Compat",
    desc: "Single prompt automatically translated for Midjourney, DALL-E 3, Stable Diffusion, and more.",
    icon: <ArrowLeftRight className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-[#A259FF]/20 text-[#A259FF]",
  },
  {
    title: "Microservice Connectors",
    desc: "Every saved prompt gets a REST endpoint. Connect your API keys and we handle routing and fallbacks.",
    icon: <Network className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-[#00D1B2]/20 text-[#00D1B2]",
  },
  {
    title: "Consistency Mode",
    desc: "Upload reference brand assets to extract style embeddings and lock them across future generations.",
    icon: <Lock className="w-6 h-6 text-brand-black" />,
    badgeColor: "bg-neutral-800 text-white",
  }
];

const Services: React.FC<{ onOpenConnect?: () => void }> = ({ onOpenConnect }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-display mb-12 text-center"
        >
          Features<span className="text-neutral-300">.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Special Lead Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-brand-black rounded-3xl p-10 flex flex-col justify-between text-white relative overflow-hidden group"
        >
          <div>
            <h3 className="text-3xl font-display mb-4 max-w-[200px]">Get started with promptBook</h3>
            <button 
              onClick={onOpenConnect}
              className="px-8 py-3 bg-white text-brand-black rounded-full font-bold hover:bg-neutral-100 transition-colors z-10 relative"
            >
              CONNECT
            </button>
          </div>
          <div className="flex justify-end mt-8">
            <Cog className="w-20 h-20 text-white/10 group-hover:rotate-90 transition-transform duration-1000" strokeWidth={1} />
          </div>
          {/* Inner Glow Decorative */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
        </motion.div>

        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-10 flex flex-col relative"
          >
            <div className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center p-2.5 shadow-sm border border-neutral-100`}>
              {service.icon}
            </div>
            
            <div className="mt-4">
              <h3 className="text-2xl font-display mb-4">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed font-sans text-sm md:text-base">
                {service.desc}
              </p>
            </div>

            <div className="mt-auto pt-8">
              <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-black transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Glow */}
      <div className="glow-bg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
    </section>
  );
};

export default Services;

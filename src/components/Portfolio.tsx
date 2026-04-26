import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  { title: "Defi Exchange", category: "Blockchain", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop" },
  { title: "NFT Marketplace", category: "Web3", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" },
  { title: "Modern CRM", category: "Web App", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" },
  { title: "Fitness Tracker", category: "Mobile", image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop" },
];

const Portfolio: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-display mb-16"
      >
        Portfolio<span className="text-neutral-300">.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-100 mb-6">
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
              <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{project.category}</span>
              <h3 className="text-2xl font-display mt-2">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;

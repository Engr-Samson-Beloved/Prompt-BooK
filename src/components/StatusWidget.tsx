import React from 'react';
import { Music } from 'lucide-react';
import { motion } from 'motion/react';

const StatusWidget: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-12 left-8 z-50 flex items-center gap-3 p-3 bg-white border border-neutral-100 rounded-2xl shadow-lg"
    >
      <div className="w-10 h-10 bg-[#1DB954] rounded-xl flex items-center justify-center text-white">
        <Music className="w-5 h-5 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Listening on Spotify</span>
        <span className="text-xs font-semibold text-brand-black">Midnight City — M83</span>
      </div>
    </motion.div>
  );
};

export default StatusWidget;

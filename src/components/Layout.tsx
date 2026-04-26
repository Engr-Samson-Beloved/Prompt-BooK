import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Twitter, Bug } from 'lucide-react';
import { motion } from 'motion/react';
import StatusWidget from './StatusWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Status Widget */}
      <StatusWidget />

      {/* Spider - Top Left */}
      <div className="fixed top-0 left-12 z-50 flex flex-col items-center">
        <div className="w-[1px] h-32 bg-neutral-300" />
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bug className="w-8 h-8 text-neutral-800" />
        </motion.div>
      </div>

      {/* Side Dots - Left */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <div className="w-2 h-8 bg-brand-black rounded-full" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-2 h-2 bg-neutral-300 rounded-full" />
        ))}
      </div>

      {/* Socials - Right */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        <a href="#" className="p-2 bg-brand-black text-white rounded-lg hover:scale-110 transition-transform">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="p-2 bg-brand-black text-white rounded-lg hover:scale-110 transition-transform">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="p-2 bg-brand-black text-white rounded-lg hover:scale-110 transition-transform">
          <Twitter className="w-5 h-5" />
        </a>
      </div>

      {/* Mobile Bottom Ticker or extra elements could go here */}

      <main className="pt-24 pb-12 px-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;

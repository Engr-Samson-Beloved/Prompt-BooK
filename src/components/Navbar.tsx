import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Zap, Layers, CreditCard, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenConnect?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const [explainingIndex, setExplainingIndex] = useState(-1);
  const [isDone, setIsDone] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" strokeWidth={2.5} /> },
    { name: 'Features', path: '/services', icon: <Zap className="w-5 h-5" strokeWidth={2.5} /> },
    { name: 'Templates', path: '/portfolio', icon: <Layers className="w-5 h-5" strokeWidth={2.5} /> },
    { name: 'Pricing', path: '/pricing', icon: <CreditCard className="w-5 h-5" strokeWidth={2.5} /> },
    { name: 'Hire Agent', path: '/hire-agent', icon: <UserCheck className="w-5 h-5" strokeWidth={2.5} /> },
  ];

  useEffect(() => {
    const runSequence = async () => {
      // Small initial delay for page load
      await new Promise(resolve => setTimeout(resolve, 800));
      
      for (let i = 0; i < navLinks.length; i++) {
        setExplainingIndex(i);
        await new Promise(resolve => setTimeout(resolve, 1400));
      }
      setExplainingIndex(-1);
      setIsDone(true);
    };

    runSequence();
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4 md:px-0">
      <motion.nav 
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="pill-nav p-1.5 md:p-2 shadow-2xl flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-xl border border-neutral-100 rounded-full overflow-hidden"
      >
        {navLinks.map((link, i) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `relative flex items-center rounded-full transition-colors duration-500 whitespace-nowrap ${
                  isActive 
                  ? 'bg-brand-black text-white shadow-lg' 
                  : 'text-neutral-500 hover:text-brand-black hover:bg-neutral-50'
              } ${explainingIndex === i ? 'px-4 md:px-6 py-2.5 md:py-3.5' : 'p-3 md:p-4'}`
            }
          >
            <div className="flex items-center">
              {/* Icon - Locked Size */}
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {link.icon}
              </div>
              
              <AnimatePresence mode="wait">
                {(explainingIndex === i) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: 'auto', opacity: 1, marginLeft: 12 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom Expo Out
                    className="overflow-hidden"
                  >
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest pr-2">
                      {link.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Text Stability */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    className="hidden lg:block overflow-hidden"
                  >
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest ml-3 pr-2">
                      {link.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </NavLink>
        ))}
        
        <div className="w-[1px] h-4 bg-neutral-200 mx-1 hidden md:block" />
        
        <button 
          onClick={onOpenConnect}
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-black hover:bg-brand-black hover:text-white rounded-full transition-all font-mono text-[11px] font-bold uppercase tracking-widest shadow-inner"
        >
          <Shield className="w-4 h-4 flex-shrink-0" /> 
          <span className="whitespace-nowrap">Access</span>
        </button>
      </motion.nav>
    </header>
  );
};

export default Navbar;


import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail, Chrome, X, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const authMethods = [
    { 
      id: 'google', 
      name: 'Google', 
      icon: <Chrome className="w-5 h-5" />, 
      color: 'hover:bg-blue-50 hover:border-blue-200',
      iconColor: 'text-blue-500'
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: <Github className="w-5 h-5" />, 
      color: 'hover:bg-neutral-50 hover:border-neutral-900',
      iconColor: 'text-black'
    },
    { 
      id: 'email', 
      name: 'Email', 
      icon: <Mail className="w-5 h-5" />, 
      color: 'hover:bg-brand-accent/5 hover:border-brand-accent',
      iconColor: 'text-brand-accent'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-brand-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-10">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Secure Authentication
                  </div>
                  <h2 className="text-4xl font-display mb-4 tracking-tighter">
                    INITIALIZE <span className="text-brand-accent">ACCESS</span>
                  </h2>
                  <p className="text-neutral-500 text-sm font-sans px-4">
                    Choose your preferred path to enter the PromptBook ecosystem.
                  </p>
                </div>

                <div className="space-y-3">
                  {authMethods.map((method, idx) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className={`w-full flex items-center justify-between p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl transition-all duration-300 group ${method.color}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-white shadow-sm transition-colors ${method.iconColor}`}>
                          {method.icon}
                        </div>
                        <div className="text-left">
                          <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Continue with</span>
                          <span className="text-base font-bold text-brand-black">{method.name}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-black group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
                  <div className="flex items-center justify-center gap-4 mb-4 text-neutral-200">
                    <Zap className="w-3 h-3" />
                    <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Trusted Architecture</div>
                    <Zap className="w-3 h-3" />
                  </div>
                  <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                    By continuing, you agree to our Protocol Agreement and Data Encryption Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConnectModal;

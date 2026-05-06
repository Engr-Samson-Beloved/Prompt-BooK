import React from 'react';
import { motion } from 'motion/react';
import { Github, Mail, Chrome, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Connect: React.FC = () => {
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
    <section className="relative py-24 max-w-5xl mx-auto px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Secure Authentication
          </div>
          <h2 className="text-5xl md:text-7xl font-display mb-6 tracking-tighter">
            INITIALIZE <span className="text-brand-accent">ACCESS</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto font-sans">
            Connect your developer profile to start reverse-engineering creativity with high-fidelity neural workflows.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md space-y-4"
        >
          {authMethods.map((method, idx) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`w-full flex items-center justify-between p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm transition-all duration-300 group ${method.color}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-neutral-50 group-hover:bg-white transition-colors ${method.iconColor}`}>
                  {method.icon}
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Continue with</span>
                  <span className="text-lg font-bold text-brand-black">{method.name}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-black group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}

          <div className="pt-8 mt-8 border-t border-neutral-100 text-center">
            <div className="flex items-center justify-center gap-6 mb-6 text-neutral-300">
              <Zap className="w-4 h-4" />
              <div className="w-12 h-[1px] bg-neutral-100" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Trusted by Engineers</div>
              <div className="w-12 h-[1px] bg-neutral-100" />
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-[10px] text-neutral-400 font-sans leading-relaxed px-12">
              By initializing access, you agree to our <span className="text-brand-black underline cursor-pointer">Protocol Agreement</span> and <span className="text-brand-black underline cursor-pointer">Data Encryption Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;

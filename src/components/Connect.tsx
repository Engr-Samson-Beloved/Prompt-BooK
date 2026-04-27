import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Connect: React.FC = () => {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-display mb-6">Get Access<span className="text-neutral-300">.</span></h2>
        <p className="text-neutral-500 text-lg font-sans">Join the waitlist to start reverse-engineering creativity.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 flex flex-col items-center text-center"
        >
          <Mail className="w-10 h-10 mb-4 text-brand-accent" />
          <h3 className="text-xl font-display mb-2">Email</h3>
          <p className="text-neutral-500">hello@promptbook.com</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col items-center text-center md:col-span-2"
        >
          <form className="w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-brand-black transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-brand-black transition-colors"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-brand-black transition-colors"
            />
            <button className="w-full py-4 bg-brand-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Join Waitlist <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;

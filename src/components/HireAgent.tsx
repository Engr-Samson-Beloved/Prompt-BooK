import React from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Shield, Globe, Cpu, ChevronRight, UserCheck, Star, Clock, MessageSquare } from 'lucide-react';

const agents = [
  {
    id: 'architect',
    name: 'Neural Architect',
    specialty: 'System Design & Blueprints',
    description: 'Expert in technical DNA, database schemas, and multi-tier infrastructure planning.',
    capabilities: ['Schema Design', 'Tech Stack Optimization', 'System Mapping'],
    icon: <Cpu className="w-6 h-6" />,
    color: 'brand-accent'
  },
  {
    id: 'strategist',
    name: 'GTM Strategist',
    specialty: 'Market Fit & Growth',
    description: 'Specializes in monetization models, pricing psychology, and rapid market entry.',
    capabilities: ['Revenue Modeling', 'GTM Execution', 'Competitor Analysis'],
    icon: <Globe className="w-6 h-6" />,
    color: 'emerald-500'
  },
  {
    id: 'engineer',
    name: 'Prompt Engineer',
    specialty: 'Instruction Optimization',
    description: 'Deep refinement of absolute prompts and cross-format semantic transformations.',
    capabilities: ['Prompt Hardening', 'XML/YAML Logic', 'Instruction Sets'],
    icon: <Zap className="w-6 h-6" />,
    color: 'brand-black'
  }
];

const HireAgent: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/5 border border-brand-accent/20 mb-6 text-brand-accent"
        >
          <UserCheck className="w-4 h-4" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-black">Professional Neural Force</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-display tracking-tighter mb-6 uppercase"
        >
          HIRE <span className="text-brand-accent">NEURAL</span> AGENTS
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Deploy specialized AI agents to architect your vision. High-fidelity intelligence for technical design, market strategy, and prompt engineering.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="group p-8 bg-white border border-neutral-100 rounded-[2.5rem] hover:border-brand-accent transition-all shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 relative overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6 text-${agent.color} group-hover:scale-110 transition-transform`}>
              {agent.icon}
            </div>
            
            <div className="mb-8 text-left">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">{agent.specialty}</span>
              <h3 className="text-2xl font-display text-brand-black mb-3">{agent.name}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{agent.description}</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              {agent.capabilities.map(cap => (
                <div key={cap} className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-black uppercase">
                  <Shield className="w-3 h-3 text-brand-accent" />
                  {cap}
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-neutral-50 text-brand-black rounded-2xl font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-black group-hover:text-white transition-all">
              ENGAGE_AGENT <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-20 border-t border-neutral-100">
        {[
          { icon: <Star />, label: 'Neural Rating', value: '4.98/5.0' },
          { icon: <Clock />, label: 'Response Time', value: '< 200ms' },
          { icon: <Zap />, label: 'Tasks Completed', value: '142k+' },
          { icon: <MessageSquare />, label: 'Active Sessions', value: '1.2k' }
        ].map((stat, i) => (
          <div key={i} className="p-6 text-center">
            <div className="text-brand-accent flex justify-center mb-4">{stat.icon}</div>
            <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-xl font-display text-brand-black">{stat.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HireAgent;

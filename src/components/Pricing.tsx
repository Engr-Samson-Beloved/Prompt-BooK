import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, CreditCard, Shield } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "₦0",
      description: "Test the neural core with zero commitment.",
      features: ["3 Neural Generations", "Standard Latency", "Community Support", "Basic MJ Parameters"],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Low Budget",
      price: "₦5,000",
      period: "/month",
      description: "Ideal for individual creators and engineers.",
      features: ["1,000 Generations /mo", "High Speed Priority", "Advanced Style Control", "API Access (Basic)"],
      cta: "Subscribe Now",
      highlight: true
    },
    {
      name: "Pay As You Go",
      price: "₦500",
      description: "Fuel your work with precise token injections.",
      features: ["100 Tokens per pack", "No Expiration", "Use Anytime", "Full Feature Access"],
      cta: "Buy Tokens",
      highlight: false
    },
    {
      name: "Unlimited",
      price: "₦25,000",
      period: "/month",
      description: "For high-volume architectural output.",
      features: ["Infinite Generations", "Dedicated Node Access", "24/7 Support", "Enterprise API Access"],
      cta: "Go Unlimited",
      highlight: false
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-6 font-mono text-xs text-neutral-500 uppercase tracking-widest">
          <CreditCard className="w-4 h-4 text-brand-accent" />
          Neural Fueling Options
        </div>
        <h2 className="text-5xl md:text-7xl font-display mb-6 tracking-tighter">
          CHOOSE YOUR <span className="text-brand-accent">VELOCITY</span>
        </h2>
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-sans">
          Select the compute capacity that matches your creative throughput. All plans include our core neural architecture.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500 ${
              plan.highlight 
                ? 'bg-brand-black text-white border-brand-black shadow-2xl scale-105 z-10' 
                : 'bg-white text-brand-black border-neutral-100 hover:border-brand-accent/30'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-xs font-mono font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                Recommended
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-display mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold">{plan.price}</span>
                {plan.period && <span className={`text-base font-mono ${plan.highlight ? 'text-neutral-400' : 'text-neutral-400'}`}>{plan.period}</span>}
              </div>
              <p className={`mt-4 text-base font-sans leading-relaxed ${plan.highlight ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {plan.description}
              </p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${plan.highlight ? 'bg-white/10' : 'bg-neutral-50'}`}>
                    <Check className={`w-3.5 h-3.5 ${plan.highlight ? 'text-brand-accent' : 'text-brand-accent'}`} />
                  </div>
                  <span className={`text-sm font-mono tracking-tight ${plan.highlight ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-mono font-bold uppercase tracking-widest text-sm transition-all ${
              plan.highlight 
                ? 'bg-brand-accent text-white hover:opacity-90' 
                : 'bg-neutral-100 text-brand-black hover:bg-brand-black hover:text-white'
            }`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-24 pt-12 border-t border-neutral-100 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <Shield className="w-5 h-5" /> Secure Checkout
        </div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <Zap className="w-5 h-5" /> Instant Activation
        </div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-5 h-5" /> Satisfaction Guaranteed
        </div>
      </div>
    </section>
  );
};

export default Pricing;

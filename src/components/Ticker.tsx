import React from 'react';
import { motion } from 'motion/react';

const models = [
  { symbol: 'GPT-4O', stat: '99.9%', desc: 'Uptime', color: 'text-emerald-500' },
  { symbol: 'CLAUDE 3.5', stat: '98.5%', desc: 'Accuracy', color: 'text-emerald-500' },
  { symbol: 'MIDJOURNEY v6', stat: '10M+', desc: 'Prompts', color: 'text-emerald-500' },
  { symbol: 'DALL-E 3', stat: 'Fast', desc: 'Latency', color: 'text-emerald-500' },
  { symbol: 'STABLE DIFF.', stat: 'v3.5', desc: 'Active', color: 'text-emerald-500' },
  { symbol: 'FIREFLY 2', stat: 'Synced', desc: 'Status', color: 'text-emerald-500' },
  { symbol: 'GEMINI 1.5', stat: 'Online', desc: 'Status', color: 'text-emerald-500' },
  { symbol: 'LLAMA 3', stat: 'Local', desc: 'Node', color: 'text-neutral-500' },
];

const Ticker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-neutral-100 py-3 overflow-hidden z-40">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center px-6">
            {models.map((model) => (
              <div key={model.symbol} className="flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{model.symbol}</span>
                <span className="text-sm font-semibold">{model.stat}</span>
                <span className={`text-[10px] font-bold ${model.color}`}>
                  {model.desc}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

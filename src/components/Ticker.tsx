import React from 'react';
import { motion } from 'motion/react';

const stocks = [
  { symbol: 'XDI', price: '$1.7', change: '+0.00%', color: 'text-emerald-500' },
  { symbol: 'MSFT', price: '$424.85', change: '+0.22%', color: 'text-emerald-500' },
  { symbol: 'AAPL', price: '$271.9', change: '+0.64%', color: 'text-emerald-500' },
  { symbol: 'NVDA', price: '$208.57', change: '+0.77%', color: 'text-emerald-500' },
  { symbol: 'GOOGL', price: '$343.73', change: '+0.03%', color: 'text-emerald-500' },
  { symbol: 'AMZN', price: '$264.47', change: '+0.51%', color: 'text-emerald-500' },
  { symbol: 'TSLA', price: '$198.40', change: '-1.45%', color: 'text-rose-500' },
  { symbol: 'META', price: '$502.12', change: '+1.12%', color: 'text-emerald-500' },
];

const Ticker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-neutral-100 py-3 overflow-hidden z-40">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center px-6">
            {stocks.map((stock) => (
              <div key={stock.symbol} className="flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stock.symbol}</span>
                <span className="text-sm font-semibold">{stock.price}</span>
                <span className={`text-[10px] font-bold ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stock.change}
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

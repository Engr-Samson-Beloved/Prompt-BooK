import React, { useState } from 'react';
import { getAbsolutePrompt } from '../openai';
import { runMJScript } from '../promptbook.mjs';

const PromptEngine: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject) return alert("Please enter a subject!");
    setIsLoading(true);
    try {
      const refined = await getAbsolutePrompt(subject, style);
      const result = runMJScript(refined);
      setFinalPrompt(result);
    } catch (err) {
      console.error(err);
      alert("Error: Check your API Key or connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-6">
      <div className="tech-border glass-card max-w-2xl w-full p-12">
        <h2 className="text-4xl font-display mb-8 text-brand-black">PROMPT_ENGINE</h2>
        
        <div className="flex flex-col gap-6 w-full">
          <input 
            placeholder="Subject (e.g. Cyberpunk Samurai)" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)} 
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-brand-black font-mono focus:border-brand-accent outline-none transition-all"
          />
          <input 
            placeholder="Style (e.g. Hyper-realistic)" 
            value={style}
            onChange={(e) => setStyle(e.target.value)} 
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-brand-black font-mono focus:border-brand-accent outline-none transition-all"
          />
          <button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="w-full p-5 bg-brand-black text-white font-bold uppercase tracking-widest rounded-lg hover:bg-brand-accent transition-all disabled:opacity-50"
          >
            {isLoading ? 'ANALYZING_INPUT...' : 'GENERATE_ABSOLUTE_PROMPT'}
          </button>
        </div>

        {finalPrompt && (
          <div className="mt-12 p-8 bg-brand-accent/5 border border-brand-accent/20 rounded-xl">
            <h3 className="text-brand-accent font-mono text-sm mb-4 uppercase tracking-widest">Final MJ Command:</h3>
            <p className="text-neutral-700 font-mono text-sm break-all leading-relaxed bg-white/50 p-4 rounded border border-neutral-100">{finalPrompt}</p>
            <button 
              onClick={() => navigator.clipboard.writeText(finalPrompt)}
              className="mt-6 px-6 py-3 bg-brand-black text-white text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptEngine;

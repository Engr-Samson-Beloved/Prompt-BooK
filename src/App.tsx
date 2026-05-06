import { useState } from 'react';
import { getAbsolutePrompt } from './openai';
import { runMJScript } from './mjscript.mjs';

function App() {
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
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ffcc' }}>Prompt Book</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <input 
          placeholder="Subject (e.g. Cyberpunk Samurai)" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)} 
          style={{ padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '5px' }}
        />
        <input 
          placeholder="Style (e.g. Hyper-realistic)" 
          value={style}
          onChange={(e) => setStyle(e.target.value)} 
          style={{ padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '5px' }}
        />
        <button 
          onClick={handleGenerate} 
          disabled={isLoading}
          style={{ padding: '12px', background: '#00ffcc', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {isLoading ? 'Generating...' : 'Get Absolute Prompt'}
        </button>
      </div>

      {finalPrompt && (
        <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #00ffcc', borderRadius: '10px', background: '#111' }}>
          <h3 style={{ color: '#00ffcc', marginTop: 0 }}>Final MJ Command:</h3>
          <p style={{ wordBreak: 'break-all', lineHeight: '1.6' }}>{finalPrompt}</p>
          <button 
            onClick={() => navigator.clipboard.writeText(finalPrompt)}
            style={{ marginTop: '10px', padding: '8px 15px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

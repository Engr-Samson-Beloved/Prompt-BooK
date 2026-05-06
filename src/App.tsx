import { useState } from 'react';
import { getAbsolutePrompt } from './openai';
import { runMJScript } from './promptbook.mjs';

function App() {
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject) return alert("Please enter a subject first!");
    setIsLoading(true);
    try {
      const refined = await getAbsolutePrompt(subject, style);
      const result = runMJScript(refined);
      setFinalPrompt(result);
    } catch (err) {
      console.error(err);
      alert("Check your API key and credits!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Prompt Book</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <input 
          placeholder="Subject" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)} 
          style={{ padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }}
        />
        <input 
          placeholder="Style" 
          value={style}
          onChange={(e) => setStyle(e.target.value)} 
          style={{ padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }}
        />
        <button onClick={handleGenerate} disabled={isLoading} style={{ padding: '10px', cursor: 'pointer' }}>
          {isLoading ? 'Generating...' : 'Get Absolute Prompt'}
        </button>
      </div>

      {finalPrompt && (
        <div style={{ marginTop: '30px', border: '1px solid #444', padding: '20px' }}>
          <h3 style={{ color: '#00ffcc' }}>Final MJ Command:</h3>
          <p style={{ lineHeight: '1.5' }}>{finalPrompt}</p>
          <button 
            onClick={() => navigator.clipboard.writeText(finalPrompt)}
            style={{ background: 'transparent', color: '#888', border: '1px solid #444', padding: '5px 10px', cursor: 'pointer' }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

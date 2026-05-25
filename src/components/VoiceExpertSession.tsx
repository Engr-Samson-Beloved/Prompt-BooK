import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Mic, MicOff, PhoneOff, Zap, BrainCircuit, Volume2 } from 'lucide-react';
import { runConversationalExpert } from '../gemini';

interface VoiceExpertSessionProps {
  onClose: () => void;
  onComplete: (data: any) => void;
  brandName: string;
  brandVision: string;
}

const VoiceExpertSession: React.FC<VoiceExpertSessionProps> = ({ onClose, onComplete, brandName, brandVision }) => {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('Initializing Neural Link...');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [history, setHistory] = useState<any[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceInput(text);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Start Timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleEndCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Initial greeting
    const greeting = brandName 
      ? `I am K-7. Neural link established for project ${brandName}. I've analyzed your vision to ${brandVision.substring(0, 50)}... Tell me more about the core values behind this.`
      : "I am K-7. Neural link established. Describe your vision for the brand.";
      
    speak(greeting);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    setAiResponse(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    
    // Optional: Try to find a premium sounding voice
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Male')) || voices[0];
    if (premiumVoice) utterance.voice = premiumVoice;

    window.speechSynthesis.speak(utterance);
    
    utterance.onend = () => {
       if (timeLeft > 0) toggleListening();
    };
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const processVoiceInput = async (text: string) => {
    if (!text || text.trim().length === 0) return;
    
    setIsThinking(true);
    setAiResponse('Processing patterns...');
    
    try {
      const response = await runConversationalExpert(text, history, { name: brandName, vision: brandVision });
      setHistory([...history, { role: 'user', parts: [{ text }] }, { role: 'model', parts: [{ text: response }] }]);
      speak(response);
    } catch (error) {
      console.error("Voice processing error:", error);
      speak("Signal interference detected. Please repeat.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleEndCall = () => {
    onClose();
    onComplete(history);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-brand-black/98 backdrop-blur-2xl flex flex-col items-center justify-center text-white p-6"
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Neural_Link: Active
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="relative mb-16">
        <motion.div
          animate={{ 
            scale: isListening ? [1, 1.1, 1] : 1,
            rotate: isThinking ? 360 : 0
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 1 },
            rotate: { repeat: Infinity, duration: 2, ease: "linear" }
          }}
          className={`w-64 h-64 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${
            isListening ? 'border-brand-accent shadow-[0_0_50px_rgba(255,204,0,0.3)]' : 'border-white/10'
          }`}
        >
          <div className={`w-56 h-56 rounded-full border-2 flex items-center justify-center ${
            isListening ? 'border-brand-accent/50' : 'border-white/5'
          }`}>
            <Bot className={`w-24 h-24 transition-colors ${isListening ? 'text-brand-accent' : 'text-white/20'}`} />
          </div>
        </motion.div>
        
        {/* Waveforms */}
        {isListening && (
          <div className="absolute -inset-8 flex items-center justify-between pointer-events-none px-12">
             {[...Array(4)].map((_, i) => (
               <motion.div 
                 key={i}
                 animate={{ height: [10, 40, 10] }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                 className="w-1.5 bg-brand-accent rounded-full"
               />
             ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl text-center space-y-8">
        <div className="min-h-[100px]">
          <h3 className="text-4xl font-display uppercase tracking-widest mb-4">K-7 BRAND ARCHITECT</h3>
          <p className="text-xl text-neutral-400 font-mono italic leading-relaxed">
            "{aiResponse}"
          </p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl min-h-[60px] flex items-center justify-center">
          {transcript ? (
             <p className="text-sm font-mono text-brand-accent uppercase tracking-widest animate-pulse">
               {transcript}
             </p>
          ) : (
             <span className="text-xs font-mono text-white/20 uppercase tracking-[0.3em]">Waiting for voice input...</span>
          )}
        </div>

        <div className="flex gap-6 justify-center">
          <button 
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-brand-accent text-brand-black scale-110' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          
          <button 
            onClick={handleEndCall}
            className="w-20 h-20 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
          >
            <PhoneOff className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">
        Neural_Architecture_Session_v2.0
      </div>
    </motion.div>
  );
};

export default VoiceExpertSession;

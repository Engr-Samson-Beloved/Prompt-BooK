import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail, Chrome, X, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { sendMagicLink, signInWithOAuth } from '../lib/auth';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'select' | 'email'>('select');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOAuth = async (provider: 'google' | 'github') => {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsLoading(true);

    const { error } = await signInWithOAuth(provider);

    if (error) {
      setErrorMessage(error.message || 'OAuth sign-in failed.');
      setIsLoading(false);
    }
    // If OAuth redirect succeeds, the app will navigate away.
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);
    setIsLoading(true);

    const { error } = await sendMagicLink(email);

    if (error) {
      setErrorMessage(error.message || 'Failed to send magic link.');
    } else {
      setStatusMessage('Magic link sent. Check your inbox and use the link to sign in.');
    }

    setIsLoading(false);
  };

  const resetModal = () => {
    setMode('select');
    setEmail('');
    setErrorMessage(null);
    setStatusMessage(null);
  };

  const closeAndReset = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto relative"
            >
              <button
                type="button"
                onClick={closeAndReset}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-brand-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-10">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Secure Authentication
                  </div>
                  <h2 className="text-4xl font-display mb-4 tracking-tighter">
                    INITIALIZE <span className="text-brand-accent">ACCESS</span>
                  </h2>
                  <p className="text-neutral-500 text-sm font-sans px-4">
                    Choose your preferred path to enter the PromptBook ecosystem.
                  </p>
                </div>

                {mode === 'select' ? (
                  <div className="space-y-3">
                    <motion.button
                      type="button"
                      onClick={() => handleOAuth('google')}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl transition-all duration-300 group hover:bg-blue-50 hover:border-blue-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-white shadow-sm text-blue-500">
                          <Chrome className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Continue with</span>
                          <span className="text-base font-bold text-brand-black">Google</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-black group-hover:translate-x-1 transition-all" />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => handleOAuth('github')}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl transition-all duration-300 group hover:bg-neutral-50 hover:border-neutral-900"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-white shadow-sm text-black">
                          <Github className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Continue with</span>
                          <span className="text-base font-bold text-brand-black">GitHub</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-black group-hover:translate-x-1 transition-all" />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setMode('email');
                        setErrorMessage(null);
                        setStatusMessage(null);
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl transition-all duration-300 group hover:bg-brand-accent/5 hover:border-brand-accent"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-white shadow-sm text-brand-accent">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Continue with</span>
                          <span className="text-base font-bold text-brand-black">Email OTP</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-black group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="text-left">
                      <label htmlFor="auth-email" className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Email address</label>
                      <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-colors"
                        required
                      />
                    </div>

                    {errorMessage && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    {statusMessage && (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {statusMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-6 py-4 bg-brand-black text-white rounded-xl font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Send Magic Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('select')}
                      className="w-full px-6 py-4 border border-neutral-200 rounded-xl text-neutral-600 font-mono text-[10px] uppercase tracking-widest hover:border-brand-black hover:text-brand-black"
                    >
                      Back to options
                    </button>
                  </form>
                )}

                <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
                  <div className="flex items-center justify-center gap-4 mb-4 text-neutral-200">
                    <Zap className="w-3 h-3" />
                    <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Trusted Architecture</div>
                    <Zap className="w-3 h-3" />
                  </div>
                  <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                    By continuing, you agree to our Protocol Agreement and Data Encryption Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConnectModal;

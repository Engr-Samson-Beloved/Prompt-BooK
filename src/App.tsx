/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Connect from './components/Connect';
import Ticker from './components/Ticker';
import PromptEngine from './components/PromptEngine';

import ConnectModal from './components/ConnectModal';

import Pricing from './components/Pricing';

const AnimatedRoutes = ({ onOpenConnect }: { onOpenConnect: () => void }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onOpenConnect={onOpenConnect} />
          </motion.div>
        } />
        <Route path="/pricing" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Pricing />
          </motion.div>
        } />
        <Route path="/services" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Services onOpenConnect={onOpenConnect} />
          </motion.div>
        } />
        <Route path="/portfolio" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Portfolio />
          </motion.div>
        } />
        <Route path="/experience" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Experience />
          </motion.div>
        } />
        <Route path="/generate" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <PromptEngine />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-brand-white text-brand-black">
        <Navbar onOpenConnect={() => setIsConnectOpen(true)} />
        <Layout>
          <AnimatedRoutes onOpenConnect={() => setIsConnectOpen(true)} />
        </Layout>
        <Ticker />
        
        <ConnectModal 
          isOpen={isConnectOpen} 
          onClose={() => setIsConnectOpen(false)} 
        />
      </div>
    </Router>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Layers, ArrowUpRight, HelpCircle } from 'lucide-react';
import ArticleModal from './components/ArticleModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animateOnLoad, setAnimateOnLoad] = useState<boolean>(false);

  useEffect(() => {
    // Trigger entrance animation delay
    const timer = setTimeout(() => {
      setAnimateOnLoad(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="app-root-container"
      className="w-screen h-screen bg-black text-neutral-200 flex flex-col justify-center items-center relative overflow-hidden font-sans p-6 md:p-10"
    >
      {/* Decorative stars/glowing points in the background - extremely subtle to preserve plane-black requirement */}
      <div id="subtle-points" className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-orange-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-40" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-25" />
      </div>

      {/* Main Content Area */}
      <main 
        id="app-main-content"
        className="flex-1 w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16 z-10"
      >
        {/* Left Headline Component: "Out of time" */}
        <motion.div
          id="headline-left"
          initial={{ opacity: 0, x: -30 }}
          animate={animateOnLoad ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/3 text-center md:text-right select-none"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white glow-text leading-none select-none">
            Out of time
          </h1>
        </motion.div>

        {/* Central interactive spacer - canvas removed as requested */}
        <motion.div
          id="canvas-center-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={animateOnLoad ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center shrink-0"
        >
          {/* Space kept in the center for clean layout alignment */}
        </motion.div>

        {/* Right Headline Component: "and space" */}
        <motion.div
          id="headline-right"
          initial={{ opacity: 0, x: 30 }}
          animate={animateOnLoad ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/3 text-center md:text-left select-none"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white glow-text leading-none select-none">
            and space
          </h1>
        </motion.div>
      </main>

      {/* Bottom Footer */}
      <motion.footer
        id="app-footer"
        initial={{ opacity: 0, y: 15 }}
        animate={animateOnLoad ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="w-full max-w-2xl text-center z-10"
      >
        {/* Copyright or developer stamp */}
        <div className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} Coinflect Foundation • Decentralized Multi-chain Node
        </div>
      </motion.footer>

      {/* Slide-over / Fade-in News Article Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

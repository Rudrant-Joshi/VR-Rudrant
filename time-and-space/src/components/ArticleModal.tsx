/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Clipboard, Check, HelpCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ isOpen, onClose }: ArticleModalProps) {
  const [legacyAmount, setLegacyAmount] = useState<string>('1000');
  const [copiedContract, setCopiedContract] = useState<string | null>(null);
  const [calcFeedback, setCalcFeedback] = useState<boolean>(false);

  if (!isOpen) return null;

  // Mock Coinflect address parameters
  const LEGACY_CONTRACT = '0x1A2b3C4d5E6f7G8h9I0jK1l2m3n4o5p6q7r8s9t0';
  const WRAPPED_CONTRACT = '0xf9239856a9Bcf237A8C8C9CdCe37320D6a6AbcdE';

  const handleCopy = (address: string, label: string) => {
    navigator.clipboard.writeText(address);
    setCopiedContract(label);
    setTimeout(() => setCopiedContract(null), 2000);
  };

  const calculateConversion = () => {
    const amt = parseFloat(legacyAmount);
    if (isNaN(amt) || amt <= 0) return '0.00';
    // 1:1 Bridge ratio
    return amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  };

  return (
    <div id="article-modal-portal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        id="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        id="modal-content-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl text-neutral-200 shadow-2xl shadow-orange-500/5 flex flex-col font-sans"
      >
        {/* Header */}
        <div id="modal-header" className="sticky top-0 bg-neutral-950/90 backdrop-blur-sm px-6 py-5 border-b border-neutral-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-lg font-medium text-white tracking-tight font-sans">Ecosystem Migration Protocol</h2>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div id="modal-body" className="p-6 space-y-8 flex-1">
          {/* Hero Header */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest font-mono text-orange-500 font-medium">Official Migration Announcement</div>
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
              Coinflect Has Migrated to Wrapped Coinflect ($WCFLT)
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We are pleased to announce the successful deployment of our upgraded smart contract infrastructure. 
              The migration from Legacy Coinflect to Wrapped Coinflect ($WCFLT) marks a vital milestone to maximize token utility, optimize multi-chain liquidity routing, and drastically reduce decentralized transaction fees.
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <div className="flex items-center space-x-2 text-orange-400">
                <RefreshCw size={16} />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Migration Ratio</span>
              </div>
              <p className="text-xl font-medium text-white">1 : 1 Conversion</p>
              <p className="text-xs text-neutral-500">Every 1 Legacy Coinflect token is redeemable for exactly 1 Wrapped Coinflect token.</p>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <div className="flex items-center space-x-2 text-orange-400">
                <AlertCircle size={16} />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Safe & Fully Audited</span>
              </div>
              <p className="text-xl font-medium text-white">100% Secure</p>
              <p className="text-xs text-neutral-500">The migration smart contracts have passed rigorous security audits with zero critical flaws discovered.</p>
            </div>
          </div>

          {/* Smart Contract Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white tracking-wider uppercase font-mono">Contract Parameters</h3>
            
            <div className="space-y-3">
              {/* Legacy Address */}
              <div className="bg-neutral-900/40 border border-neutral-800 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">Legacy Coinflect Contract</div>
                  <div className="font-mono text-neutral-300 break-all">{LEGACY_CONTRACT}</div>
                </div>
                <button
                  id="copy-legacy-address-btn"
                  onClick={() => handleCopy(LEGACY_CONTRACT, 'legacy')}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors self-start sm:self-auto shrink-0"
                >
                  {copiedContract === 'legacy' ? <Check size={13} className="text-green-500" /> : <Clipboard size={13} />}
                  <span>{copiedContract === 'legacy' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Wrapped Address */}
              <div className="bg-neutral-900/40 border border-neutral-800 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="text-[10px] text-orange-500 uppercase font-mono">New Wrapped Coinflect ($WCFLT)</div>
                  <div className="font-mono text-orange-200 break-all">{WRAPPED_CONTRACT}</div>
                </div>
                <button
                  id="copy-wrapped-address-btn"
                  onClick={() => handleCopy(WRAPPED_CONTRACT, 'wrapped')}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-orange-200 hover:text-orange-100 flex items-center justify-center space-x-1.5 transition-colors self-start sm:self-auto shrink-0"
                >
                  {copiedContract === 'wrapped' ? <Check size={13} className="text-green-500" /> : <Clipboard size={13} />}
                  <span>{copiedContract === 'wrapped' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Bridge Calculator */}
          <div className="bg-gradient-to-br from-neutral-900 to-black p-5 rounded-2xl border border-neutral-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-white flex items-center gap-1.5">
                <HelpCircle size={14} className="text-orange-500" />
                Token Conversion Calculator
              </h3>
              <span className="text-[10px] font-mono text-neutral-500">Live 1:1 Ratio</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-3">
              <div className="md:col-span-5 relative">
                <label className="absolute top-2 left-3 text-[9px] uppercase font-mono text-neutral-500">Input Legacy Coinflect</label>
                <input
                  id="legacy-calc-input"
                  type="number"
                  value={legacyAmount}
                  onChange={(e) => {
                    setLegacyAmount(e.target.value);
                    setCalcFeedback(true);
                    setTimeout(() => setCalcFeedback(false), 500);
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 pt-6 pb-2 text-white font-mono text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-1 flex justify-center text-neutral-600">
                <ArrowRight size={18} className="rotate-90 md:rotate-0" />
              </div>

              <div className="md:col-span-5 relative">
                <label className="absolute top-2 left-3 text-[9px] uppercase font-mono text-orange-500/80">Receiving $WCFLT</label>
                <div className={`w-full bg-neutral-950/80 border border-neutral-800/85 rounded-xl px-3 pt-6 pb-2 text-orange-400 font-mono text-sm transition-all duration-300 ${
                  calcFeedback ? 'border-orange-500/50 bg-orange-500/[0.01]' : ''
                }`}>
                  {calculateConversion()}
                </div>
              </div>
            </div>
          </div>

          {/* Steps to Migrate */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white tracking-wider uppercase font-mono">Step-by-Step Swap Guide</h3>
            <div className="relative border-l border-neutral-800 pl-4 ml-2 space-y-6 text-sm">
              <div className="relative">
                <span className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500 text-[10px] font-mono text-orange-400 font-bold">1</span>
                <div className="font-semibold text-white">Approve Smart Contract Access</div>
                <div className="text-neutral-400 text-xs mt-1">Visit our verified migration portal, connect your decentralized Web3 wallet, and grant permissions for the swap contract to interface with your legacy tokens.</div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-neutral-400 font-bold">2</span>
                <div className="font-semibold text-white">Execute One-Click Liquidity Swap</div>
                <div className="text-neutral-400 text-xs mt-1">Input the exact token balance you desire to migrate. Review transaction parameters, confirm the conversion gas fee, and click swap.</div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-neutral-400 font-bold">3</span>
                <div className="font-semibold text-white">Import Wrapped Contract Address</div>
                <div className="text-neutral-400 text-xs mt-1">Once completed, copy the Wrapped Contract Address ($WCFLT) listed above and add it to your browser wallet (e.g., MetaMask) to view your brand new balance immediately.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div id="modal-footer" className="sticky bottom-0 bg-neutral-950 p-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
          <div className="text-xs text-neutral-500">
            Secure Swap Protocol v2.4.0 • Audited by CertiK
          </div>
          <a
            id="migration-external-portal"
            href="https://coinflect.com/migrate"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-medium rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all duration-200 select-none shrink-0"
          >
            <span>Proceed to Swap Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

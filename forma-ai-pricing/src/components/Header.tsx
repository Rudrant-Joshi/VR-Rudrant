import React from 'react';
import { Sparkles, Shield, User } from 'lucide-react';
import { PricingPlan } from '../types';

interface HeaderProps {
  currentPlan: PricingPlan | null;
  billingCycle: 'monthly' | 'yearly';
  onResetSubscription: () => void;
}

export default function Header({ currentPlan, billingCycle, onResetSubscription }: HeaderProps) {
  return (
    <header className="w-full border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Forma AI
          </span>
        </div>

        {/* Current Subscription Indicator */}
        <div className="flex items-center gap-4">
          {currentPlan ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-3 pr-4 py-1.5 text-xs animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-neutral-400">
                Active: <strong className="text-white font-medium">{currentPlan.name}</strong> ({billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})
              </span>
              <button
                onClick={onResetSubscription}
                className="text-neutral-400 hover:text-rose-400 transition-colors ml-2 font-semibold text-[10px] uppercase tracking-wider"
                title="Cancel simulated subscription"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
              <span>Sandbox Simulation Mode</span>
            </div>
          )}

          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

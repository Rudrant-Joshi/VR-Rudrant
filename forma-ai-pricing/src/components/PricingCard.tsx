import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, Sparkles } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: 'monthly' | 'yearly';
  isSelected: boolean;
  isActive: boolean;
  onSelect: () => void;
}

// Tooltips for specific features to make the pricing board interactive and informative
const FEATURE_DESCRIPTIONS: Record<string, string> = {
  "Up to 3 projects in the cloud": "Perfect for keeping your personal works synchronized across device borders.",
  "Image export up to 1080p": "High-definition static exports ideal for digital displays, webs, and general social platforms.",
  "Basic editing tools": "Essential workspace controls: smart cropping, filter presets, basic adjustment sliders, and font tools.",
  "Free templates and icons": "Unrestricted use of over 500+ starter layouts and universal visual icons to speed up workflows.",
  "Access via web and mobile app": "Full access via modern web browsers and dedicated Android and iOS companion apps.",
  "Up to 50 projects in the cloud": "Ample cloud storage to run multiple creative workflows and parallel client archives safely.",
  "Export up to 4K": "Ultra-high-definition resolution exports suitable for commercial printing and premium screens.",
  "Advanced editing toolkit": "Includes vector layer masking, keyframe animations, intelligent content replacement, and premium brush support.",
  "Team collaboration (up to 5 members)": "Shared workspace seats to co-edit files, leave inline reviews, and assign project roles seamlessly.",
  "Access to premium template library": "Get unlimited access to 10,000+ elite templates curated by top designers worldwide.",
  "Unlimited projects": "Infinite secure cloud storage. Store as many projects, templates, and iterations as you can create.",
  "Export up to 8K + animations": "Cinema-grade 8K exports and fully rendered vector animations in MP4, ProRes, and WebM formats.",
  "AI-powered content generation tools": "Harness the power of cutting-edge neural models to expand, generate, and intelligently color-grade assets.",
  "Unlimited team members": "Scale your entire organization. Add as many creators, managers, and stakeholders as your team grows.",
  "Brand customization (logos, fonts, color palettes)": "Save brand assets globally. Lock color palettes, typography, and logo sets across all active team designs."
};

export default function PricingCard({
  plan,
  billingCycle,
  isSelected,
  isActive,
  onSelect
}: PricingCardProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const isFree = plan.priceMonthly === 0;
  
  // Calculate display price based on cycle
  const displayPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearlyMonthlyEquivalent;
  const yearlyTotal = plan.priceYearlyMonthlyEquivalent * 12;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[32px] p-8 flex flex-col justify-between h-full transition-all duration-300 group ${
        plan.isPopular 
          ? 'bg-white/[0.04] border-2 border-sky-500/30 shadow-[0_0_40px_-5px_rgba(14,165,233,0.15)]' 
          : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
      }`}
      style={{ backdropFilter: 'blur(24px)' }}
      id={`pricing-card-${plan.id}`}
    >
      {/* Background glow for the premium Pro plan */}
      {plan.isPopular && (
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
      )}

      <div>
        {/* Popular / Pro Badge */}
        {plan.isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        )}

        {/* Top Label */}
        <span className="text-neutral-400 font-display font-medium text-sm tracking-wide block mb-1">
          {plan.name}
        </span>

        {/* Big Heading / Price */}
        <div className="h-16 flex items-baseline mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${billingCycle}-${displayPrice}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline"
            >
              {isFree ? (
                <span className="text-white font-display font-bold text-5xl tracking-tight">
                  Free
                </span>
              ) : (
                <>
                  <span className="text-white font-display font-bold text-5xl tracking-tight">
                    ${displayPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-neutral-400 text-sm ml-1.5 font-sans font-medium">
                    /m
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Annual Billing Context info */}
        <div className="h-6 mb-6">
          {!isFree && billingCycle === 'yearly' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block text-[11px] font-sans font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full"
            >
              Billed yearly (${yearlyTotal.toFixed(2).replace('.', ',')}/y) — Save 20%
            </motion.span>
          )}
        </div>

        {/* Subtitle */}
        <p className="text-neutral-400 font-sans text-sm leading-relaxed mb-8 h-12">
          {plan.description}
        </p>

        {/* Features Checklist */}
        <div className="space-y-4">
          {plan.features.map((feature, index) => {
            const hasDescription = !!FEATURE_DESCRIPTIONS[feature];
            const isTooltipOpen = activeTooltip === feature;

            return (
              <div 
                key={index} 
                className="flex items-start gap-3 text-sm relative group/item"
              >
                {/* Checkbox icon */}
                <div className="mt-0.5 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                  <Check className="w-3 h-3 text-neutral-300" />
                </div>

                {/* Feature text with hover state */}
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-300 font-sans leading-tight">
                    {feature}
                  </span>

                  {hasDescription && (
                    <div className="relative">
                      <button
                        onMouseEnter={() => setActiveTooltip(feature)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(isTooltipOpen ? null : feature)}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors focus:outline-none p-0.5"
                        aria-label="More information"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      {/* Micro tooltip */}
                      <AnimatePresence>
                        {isTooltipOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-950 border border-white/15 rounded-xl shadow-2xl z-50 pointer-events-none text-xs text-neutral-200 font-normal leading-relaxed text-center"
                          >
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950" />
                            {FEATURE_DESCRIPTIONS[feature]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button at the bottom */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <button
          onClick={onSelect}
          disabled={isActive}
          className={`w-full py-3.5 px-6 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
            isActive
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default'
              : plan.isPopular
                ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white hover:from-sky-300 hover:to-indigo-400 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25 border-t border-white/20'
                : 'bg-white text-black hover:bg-neutral-200 hover:shadow-lg'
          }`}
          id={`btn-choose-plan-${plan.id}`}
        >
          {isActive ? (
            <>
              <Check className="w-4 h-4" />
              Current Plan
            </>
          ) : (
            'Choose Plan'
          )}
        </button>
      </div>
    </motion.div>
  );
}

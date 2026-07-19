import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Mail, User, ShieldCheck, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { PricingPlan, UserSubscription } from '../types';

interface CheckoutModalProps {
  plan: PricingPlan | null;
  billingCycle: 'monthly' | 'yearly';
  onClose: () => void;
  onSubscribeSuccess: (subscription: UserSubscription) => void;
}

const STEP_MESSAGES = [
  "Initializing checkout secure tunnels...",
  "Processing credit card tokens on sandbox...",
  "Provisioning cloud container databases...",
  "Applying workspace permissions...",
  "Completing membership activation..."
];

export default function CheckoutModal({
  plan,
  billingCycle,
  onClose,
  onSubscribeSuccess
}: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle step-by-step loading simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      interval = setInterval(() => {
        setSubmitStep((prev) => {
          if (prev >= STEP_MESSAGES.length - 1) {
            clearInterval(interval);
            setIsSubmitting(false);
            setIsSuccess(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  if (!plan) return null;

  const isFreePlan = plan.priceMonthly === 0;
  const singleCost = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearlyMonthlyEquivalent;
  const totalCost = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearlyMonthlyEquivalent * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic client validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!isFreePlan) {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setError('Card number must be 16 digits');
        return;
      }
      if (!expiry.includes('/')) {
        setError('Expiry must be in MM/YY format');
        return;
      }
      if (cvc.length < 3) {
        setError('CVC must be 3 or 4 digits');
        return;
      }
    }

    // Trigger simulation
    setIsSubmitting(true);
    setSubmitStep(0);
  };

  const handleFinish = () => {
    onSubscribeSuccess({
      planId: plan.id,
      billingCycle,
      email,
      name,
      cardNumber: isFreePlan ? 'FREE' : cardNumber.slice(-4),
      expiry,
      cvc
    });
  };

  // Card formatting helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const clearValue = value.replace(/[^0-9]/g, '');
    if (clearValue.length >= 2) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    return clearValue;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Checkout Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-zinc-950/90 border border-white/10 shadow-2xl z-10"
        style={{ backdropFilter: 'blur(30px)' }}
        id="checkout-modal"
      >
        <div className="p-8">
          {/* Close button */}
          {!isSubmitting && !isSuccess && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {/* SUCCESS VIEW */}
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Subscription Active!
                </h3>
                <p className="text-neutral-400 text-sm max-w-sm mb-6 leading-relaxed">
                  Welcome to <strong>{plan.name}</strong>. Your subscription has been initialized. You are now authorized to use premium cloud tools.
                </p>

                {/* Simulated Order Details receipt */}
                <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-2.5 font-sans">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Subscriber Name:</span>
                    <span className="text-white font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Associated Email:</span>
                    <span className="text-white font-medium">{email}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Activated Plan:</span>
                    <span className="text-sky-400 font-semibold">{plan.name} Tier</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Billing Cycle:</span>
                    <span className="text-white font-medium capitalize">{billingCycle}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-white/5 pt-2.5">
                    <span className="text-neutral-400">Billed Total:</span>
                    <span className="text-white font-bold text-sm">
                      ${totalCost.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 transition-all font-sans font-semibold text-sm rounded-full flex items-center justify-center gap-2 group"
                >
                  Enter Workspace
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : isSubmitting ? (
              /* PROVISIONING ANIMATED LOADER VIEW */
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 flex flex-col items-center justify-center min-h-[350px]"
              >
                <div className="relative mb-8">
                  <Loader2 className="w-12 h-12 text-sky-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-indigo-400 absolute top-0 right-0 animate-bounce" />
                </div>
                
                <h4 className="font-display font-semibold text-lg text-white mb-2">
                  Building Your Creative Workspace
                </h4>
                
                {/* Dynamically changing message status */}
                <div className="h-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={submitStep}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-neutral-400 font-mono tracking-wide"
                    >
                      {STEP_MESSAGES[submitStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Progress dot indicator */}
                <div className="flex items-center gap-1.5 mt-8">
                  {STEP_MESSAGES.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx <= submitStep ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              /* STANDARD FORM VIEW */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header info */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    SIMULATE CHECKOUT
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Unlock {plan.name} Plan
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1">
                    No actual charges will be processed. Fill credentials to activate.
                  </p>
                </div>

                {/* Checkout Summary Box */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6 flex justify-between items-center">
                  <div>
                    <span className="block text-xs text-neutral-400">Selected Plan</span>
                    <span className="text-sm font-semibold text-white">{plan.name} ({billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-neutral-400">Total Price</span>
                    <span className="text-lg font-bold text-sky-400">
                      ${totalCost.toFixed(2).replace('.', ',')}
                    </span>
                    {!isFreePlan && billingCycle === 'yearly' && (
                      <span className="block text-[9px] text-emerald-400 font-medium">Billed annually</span>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mb-4 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  {/* Name field */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Credit Card Details (only if not Free Plan) */}
                  {!isFreePlan && (
                    <div className="space-y-4 pt-2 border-t border-white/5">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-500 text-center focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                            CVC Code
                          </label>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="123"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-500 text-center focus:outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-4 bg-white text-black hover:bg-neutral-200 font-sans font-semibold text-sm rounded-full transition-all duration-300 shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>{isFreePlan ? 'Activate Free Membership' : 'Subscribe Now'}</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

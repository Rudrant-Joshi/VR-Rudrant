import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, HelpCircle, BadgePercent, CheckCircle, RefreshCw } from 'lucide-react';
import PricingCard from './components/PricingCard';
import CheckoutModal from './components/CheckoutModal';
import { PricingPlan, UserSubscription } from './types';

const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearlyMonthlyEquivalent: 0,
    description: "For creators taking their first steps with Forma.",
    features: [
      "Up to 3 projects in the cloud",
      "Image export up to 1080p",
      "Basic editing tools",
      "Free templates and icons",
      "Access via web and mobile app"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    priceMonthly: 9.99,
    priceYearlyMonthlyEquivalent: 7.99, // 20% discount
    description: "For freelancers and small teams who need more freedom and flexibility.",
    features: [
      "Up to 50 projects in the cloud",
      "Export up to 4K",
      "Advanced editing toolkit",
      "Team collaboration (up to 5 members)",
      "Access to premium template library"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 19.99,
    priceYearlyMonthlyEquivalent: 15.99, // 20% discount
    description: "For studios, agencies, and professional creators working with brands.",
    features: [
      "Unlimited projects",
      "Export up to 8K + animations",
      "AI-powered content generation tools",
      "Unlimited team members",
      "Brand customization (logos, fonts, color palettes)"
    ],
    isPopular: true
  }
];

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<UserSubscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist mock subscription in localStorage for session preservation
  useEffect(() => {
    const saved = localStorage.getItem('forma_sub');
    if (saved) {
      try {
        const sub = JSON.parse(saved) as UserSubscription;
        setActiveSubscription(sub);
        const plan = PLANS.find(p => p.id === sub.planId) || null;
        setCurrentPlan(plan);
      } catch (e) {
        console.error("Error reading saved subscription", e);
      }
    }
  }, []);

  const handleSubscribeSuccess = (subscription: UserSubscription) => {
    localStorage.setItem('forma_sub', JSON.stringify(subscription));
    setActiveSubscription(subscription);
    const plan = PLANS.find(p => p.id === subscription.planId) || null;
    setCurrentPlan(plan);
    setSelectedPlanForCheckout(null);
    
    // Trigger success toast
    setToastMessage(`Successfully subscribed to ${plan?.name} (${subscription.billingCycle === 'yearly' ? 'Yearly' : 'Monthly'})!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleCancelSubscription = () => {
    localStorage.removeItem('forma_sub');
    setActiveSubscription(null);
    setCurrentPlan(null);
    
    setToastMessage("Subscription cancelled successfully.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col relative overflow-x-hidden font-sans">
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full flex flex-col items-center relative z-10">
        
        {/* Page Titles Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-neutral-400">
            <BadgePercent className="w-4 h-4 text-emerald-400" />
            <span>Select Yearly billing to <strong>Save 20%</strong> instantly</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent leading-tight">
            Plans For Every Scale
          </h1>
          
          <p className="text-neutral-400 font-sans text-base max-w-xl mx-auto leading-relaxed">
            Configure premium cloud pipelines, secure cloud backups, and high-fidelity media exports tailored perfectly for your workflow.
          </p>
        </div>

        {/* The 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full max-w-6xl mx-auto relative mb-12">
          {PLANS.map((plan) => {
            const isActive = currentPlan?.id === plan.id;
            
            return (
              <div 
                key={plan.id} 
                className="transition-all duration-300"
              >
                <PricingCard
                  plan={plan}
                  billingCycle={billingCycle}
                  isSelected={selectedPlanForCheckout?.id === plan.id}
                  isActive={isActive}
                  onSelect={() => setSelectedPlanForCheckout(plan)}
                />
              </div>
            );
          })}
        </div>

        {/* Yearly / Monthly Toggle on the Bottom-Left matching the provided image's signature layout */}
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4 mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-sans text-sm font-medium">Billed Monthly</span>
            {/* Toggle Track */}
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none relative border ${
                billingCycle === 'yearly' ? 'bg-sky-500 border-sky-400/30' : 'bg-neutral-800 border-white/10'
              }`}
              id="billing-cycle-toggle"
              aria-label="Toggle between monthly and yearly billing"
            >
              {/* Thumb */}
              <motion.div
                layout
                className="w-5.5 h-5.5 rounded-full bg-white shadow-md"
                animate={{ x: billingCycle === 'yearly' ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className="text-white font-sans text-sm font-semibold flex items-center gap-1.5">
              Yearly
              <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase px-2 py-0.5 rounded-full">
                -20%
              </span>
            </span>
          </div>

          <div className="text-xs text-neutral-500 font-sans">
            * All tiers are subject to fair use resource quotas. Prices are listed in USD.
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-10 mt-20 relative z-10 text-center font-sans text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <p>© 2026 Forma AI Inc. All rights reserved.</p>
          <p className="max-w-md mx-auto leading-relaxed text-neutral-600">
            Forma AI is an experimental design application built on custom container runtimes. Simulated Sandbox checkout only.
          </p>
        </div>
      </footer>

      {/* Toast Alert Popups */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-emerald-500/30 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm font-sans"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs font-medium leading-relaxed">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal Overlay Popup */}
      <AnimatePresence>
        {selectedPlanForCheckout && (
          <CheckoutModal
            plan={selectedPlanForCheckout}
            billingCycle={billingCycle}
            onClose={() => setSelectedPlanForCheckout(null)}
            onSubscribeSuccess={handleSubscribeSuccess}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Trash2, Cpu, Activity, Clock } from "lucide-react";
import AgentVisual from "./components/AgentVisual";
import BookingModal from "./components/BookingModal";
import LearnMoreDrawer from "./components/LearnMoreDrawer";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  
  // Real Local Persistence for scheduled sessions
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vortiq_bookings");
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
      }
    }
  }, []);

  const handleNewBooking = (booking: any) => {
    const updated = [booking, ...bookings];
    setBookings(updated);
    localStorage.setItem("vortiq_bookings", JSON.stringify(updated));
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("vortiq_bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 font-sans flex flex-col justify-between overflow-x-hidden relative">
      {/* Subtle overlay grid for tech alignment feel, kept very clean on plain black */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-neutral-900/50 relative z-20">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 flex items-center justify-center">
            {/* Elegant sleek geometric V logo mark */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <path d="M 20 10 L 50 85 L 80 10 L 60 10 L 50 60 L 40 10 Z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-wider uppercase font-sans">Vortiq</span>
        </div>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1">
          {["SOLUTIONS", "FEATURES", "PRICING", "CUSTOMERS"].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 rounded-full text-[10px] font-bold text-neutral-400 hover:text-white hover:bg-neutral-950 transition-all cursor-pointer tracking-wider"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-5 py-2 border border-neutral-800 hover:border-neutral-500 bg-black/40 hover:bg-white hover:text-black rounded-lg text-[10px] font-bold tracking-wider transition-all cursor-pointer"
          >
            BOOK DEMO
          </button>
        </div>
      </header>

      {/* Main Container Hero - Left Aligned and Spacious */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 lg:py-24 text-left flex flex-col items-start justify-center relative z-10">
        
        {/* Left-Aligned Content */}
        <div className="space-y-10 flex flex-col items-start justify-start max-w-3xl">
          <div className="space-y-4 text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-white flex flex-col items-start"
            >
              <span>AI Agents</span>
              <span>That Think,</span>
              <span className="text-neutral-400">Automate &</span>
              <span className="text-neutral-400">Deliver</span>
            </motion.h1>
          </div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-start"
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded-full transition-all cursor-pointer shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
            >
              Book a Demo
            </button>
            <button
              onClick={() => setIsLearnMoreOpen(true)}
              className="px-6 py-3 border border-neutral-800 hover:border-neutral-500 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              Learn More
            </button>
          </motion.div>

          {/* Local Storage Scheduled Bookings Widget */}
          <AnimatePresence>
            {bookings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl space-y-3 shadow-lg max-w-sm w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    Scheduled Sessions ({bookings.length})
                  </span>
                  <span className="text-[9px] text-neutral-500">Local save active</span>
                </div>
                
                <div className="max-h-[120px] overflow-y-auto space-y-2 pr-1">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-2.5 bg-neutral-900/40 border border-neutral-800 rounded-lg text-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white truncate max-w-[170px]">{booking.agentName}</div>
                        <div className="text-[10px] text-neutral-400 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-orange-500" /> {booking.date} 
                          <span className="text-neutral-700">|</span> 
                          <Clock className="w-3 h-3 text-orange-500" /> {booking.time}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded transition-all cursor-pointer"
                        title="Cancel Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>



      {/* Elegant Floating Cards Section - 4 on the Left, 4 on the Right, Spacer in the center */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 max-w-7xl mx-auto py-16">
          
          {/* Left Column Stack (4 Cards) */}
          <div className="flex flex-col gap-12 lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2 pl-4 border-l border-white/20">
              Sovereign Core Architecture
            </div>

            {/* Card L1: Advanced Secure System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Advanced secure system
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Advanced protection to keep transactions safe, confidential, and fully reliable.
              </p>
            </motion.div>

            {/* Card L2: Sovereign Control */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Sovereign control
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Total data sovereignty with localized storage keys and custom restricted access clearances.
              </p>
            </motion.div>

            {/* Card L3: Deep Market Research */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Deep market research
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Automated workflow agents parsing global financial data streams for continuous real-time market analysis.
              </p>
            </motion.div>

            {/* Card L4: Cognitive Automation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Cognitive automation
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Empower your business with self-correcting cognitive stacks designed to resolve complex, nested variables.
              </p>
            </motion.div>
          </div>

          {/* Center Column Spacer - Hidden on mobile, completely blank gap for symmetry on lg */}
          <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

          {/* Right Column Stack (4 Cards) */}
          <div className="flex flex-col gap-12 lg:col-span-5 lg:translate-y-20">
            <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2 pl-4 border-l border-white/20">
              Access & Delivery Matrix
            </div>

            {/* Card R1: Seamless User Access */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3-3h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Seamless user access
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Seamless experience for managing financial resources anytime, anywhere with modern secure integrations.
              </p>
            </motion.div>

            {/* Card R2: Real-time Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Real-time intelligence
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Continuous telemetry tracking and auto-scaling processing speeds across dynamic sovereign node clusters.
              </p>
            </motion.div>

            {/* Card R3: Enterprise Scaling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Enterprise scaling
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Designed with complete transaction separation to safely handle heavy traffic under zero-latency constraints.
              </p>
            </motion.div>

            {/* Card R4: Continuous Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 bg-gradient-to-b from-[#111318] to-[#0a0b0d] border border-white/10 rounded-[28px] shadow-2xl relative group hover:border-white/25 transition-all duration-300"
            >
              <div className="mb-6 flex">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/5 scale-125 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-light text-white tracking-tight mb-2">
                Continuous feedback
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Dynamic, real-time reinforcement loops learning directly from workflow inputs to continuously improve accuracy.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Floating Process Chips Section - Placed at the end of the page, arranged in a line */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2 pl-4 border-l border-white/20 self-center">
            Development & Deployment Lifecycle
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center select-none max-w-5xl">
            {[
              "Market research",
              "Product design",
              "Beta launch",
              "User needs analysis",
              "System development",
              "User feedback",
              "System development",
              "Performance optimization"
            ].map((text, idx) => (
              <motion.div
                key={text + "-" + idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="flex items-center gap-3 px-6 py-3.5 bg-[#0f1115]/80 border border-neutral-800 rounded-full text-xs text-neutral-300 font-light hover:border-neutral-500 hover:text-white hover:scale-105 hover:bg-[#15181e] transition-all duration-300 cursor-default shadow-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="tracking-wide">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900/50 py-4 px-6 text-center text-[10px] text-neutral-600 font-bold tracking-wider uppercase">
        &copy; {new Date().getFullYear()} Vortiq Inc. Sovereign cognitive automation systems.
      </footer>

      {/* Interactive Booking Flow Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={handleNewBooking}
      />

      {/* Interactive Core Architecture Drawer */}
      <LearnMoreDrawer
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
      />
    </div>
  );
}

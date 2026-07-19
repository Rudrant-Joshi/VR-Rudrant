import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, X, ChevronRight, CheckCircle2, Building, Mail, User, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: any) => void;
}

const AGENT_TYPES = [
  { id: "support", name: "Cognitive Support Agent", desc: "Automate human-grade client interactions 24/7" },
  { id: "content", name: "Creative Content Engine", desc: "Generate documents, marketing and newsletters at scale" },
  { id: "orchestration", name: "Workflow Matrix", desc: "Orchestrate complex multi-app pipelines instantly" },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

// A list of next 7 days for booking
const getNext7Days = () => {
  const days = [];
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dateStr: d.toISOString().split("T")[0],
      dayName: weekdayNames[d.getDay()],
      dayNum: d.getDate(),
      monthName: monthNames[d.getMonth()],
      rawDate: d,
    });
  }
  return days;
};

export default function BookingModal({ isOpen, onClose, onSuccess }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState(AGENT_TYPES[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days = getNext7Days();

  const handleNext = () => {
    if (step === 1 && selectedAgent) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    const newBooking = {
      id: "booking-" + Date.now(),
      agentName: AGENT_TYPES.find(a => a.id === selectedAgent)?.name,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      company,
      timestamp: new Date().toLocaleDateString(),
    };

    onSuccess(newBooking);
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedAgent(AGENT_TYPES[0].id);
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setCompany("");
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(255,90,0,0.1)] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 rounded">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                </div>
                <h3 className="text-md font-semibold text-white tracking-tight">
                  {submitted ? "Demo Confirmed" : `Configure Demo Slot (Step ${step}/3)`}
                </h3>
              </div>
              <button
                onClick={resetForm}
                className="p-1.5 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="p-6">
              {!submitted ? (
                <div>
                  {/* Step 1: Select AI Agent Solution */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <p className="text-xs text-neutral-400 mb-2">
                        Select which customized AI core you would like to run during your live session:
                      </p>
                      <div className="space-y-3">
                        {AGENT_TYPES.map((agent) => (
                          <label
                            key={agent.id}
                            className={`block p-4 rounded-xl border transition-all cursor-pointer ${
                              selectedAgent === agent.id
                                ? "border-orange-500 bg-orange-500/5 shadow-[0_0_15px_rgba(255,90,0,0.05)]"
                                : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                                <p className="text-xs text-neutral-400 mt-1">{agent.desc}</p>
                              </div>
                              <input
                                type="radio"
                                name="agentType"
                                value={agent.id}
                                checked={selectedAgent === agent.id}
                                onChange={() => setSelectedAgent(agent.id)}
                                className="accent-orange-500 mt-0.5"
                              />
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4 border-t border-neutral-900 mt-6">
                        <button
                          onClick={handleNext}
                          className="px-5 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          Continue Setup
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Time Scheduler */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* Date Select */}
                      <div>
                        <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-3">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          Select Date
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {days.map((day) => (
                            <button
                              key={day.dateStr}
                              onClick={() => setSelectedDate(day.dateStr)}
                              className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                                selectedDate === day.dateStr
                                  ? "border-orange-500 bg-orange-500/10 text-white"
                                  : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 text-neutral-300"
                              }`}
                            >
                              <div className="text-[10px] text-neutral-400 uppercase font-bold">{day.dayName}</div>
                              <div className="text-lg font-bold mt-0.5">{day.dayNum}</div>
                              <div className="text-[9px] text-neutral-400">{day.monthName}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Select */}
                      <div>
                        <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-3">
                          <Clock className="w-3.5 h-3.5 text-orange-500" />
                          Select Time Slot
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                                selectedTime === time
                                  ? "border-orange-500 bg-orange-500/10 text-white font-medium"
                                  : "border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 text-neutral-400"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-900 mt-6">
                        <button
                          onClick={handleBack}
                          className="px-4 py-2 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs rounded-lg transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!selectedDate || !selectedTime}
                          className={`px-5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                            selectedDate && selectedTime
                              ? "bg-white hover:bg-neutral-200 text-black cursor-pointer"
                              : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          }`}
                        >
                          Define Contacts
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Form & Final Confirm */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <p className="text-xs text-neutral-400 mb-2">
                        Provide your details to initiate server provisioning and receive secure access coordinates.
                      </p>

                      <div className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition-all"
                          />
                        </div>

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                          <input
                            type="email"
                            required
                            placeholder="Work Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition-all"
                          />
                        </div>

                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            required
                            placeholder="Company Name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Briefing summary widget */}
                      <div className="p-3 bg-neutral-900/60 border border-neutral-900 rounded-lg text-[11px] text-neutral-400 space-y-1">
                        <div className="font-semibold text-neutral-300">Demo Setup Summary:</div>
                        <div>• Core: {AGENT_TYPES.find(a => a.id === selectedAgent)?.name}</div>
                        <div>• Schedule: {selectedDate} at {selectedTime}</div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-900 mt-6">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs rounded-lg transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-black text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                        >
                          Confirm & Book Slot
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Success Animation Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="p-4 bg-orange-500/10 rounded-full border border-orange-500/30">
                      <CheckCircle2 className="w-12 h-12 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-white">Your Vortiq Slot is Secured!</h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                      Congratulations, {name}. A calendar invitation and virtual server coordinates have been dispatched to <span className="text-orange-400 font-medium">{email}</span>.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl max-w-sm mx-auto text-left space-y-1.5 text-xs text-neutral-300">
                    <div>
                      <span className="text-neutral-500">Instance Class:</span> {AGENT_TYPES.find(a => a.id === selectedAgent)?.name}
                    </div>
                    <div>
                      <span className="text-neutral-500">Session Date:</span> {selectedDate}
                    </div>
                    <div>
                      <span className="text-neutral-500">Session Time:</span> {selectedTime}
                    </div>
                    <div>
                      <span className="text-neutral-500">Workspace Host:</span> {company.toLowerCase().replace(/\s+/g, "-")}.vortiq.ai
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

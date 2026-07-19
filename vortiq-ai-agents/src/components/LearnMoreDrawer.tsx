import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Brain, Cpu, Send, Play, Check, ArrowRight, Zap, RefreshCw } from "lucide-react";

interface LearnMoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LearnMoreDrawer({ isOpen, onClose }: LearnMoreDrawerProps) {
  const [activeTab, setActiveTab] = useState<"think" | "automate" | "deliver">("think");

  // "Think" Simulator state
  const [queryInput, setQueryInput] = useState("Process client custom onboarding request");
  const [thinkSteps, setThinkSteps] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // "Automate" Simulator state
  const [selectedTrigger, setSelectedTrigger] = useState("web_hook");
  const [selectedAction, setSelectedAction] = useState("crm_update");
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(false);
  const [workflowLog, setWorkflowLog] = useState("");

  const runThinkSimulation = () => {
    setIsThinking(true);
    setThinkSteps([]);
    
    const steps = [
      "Analyzing request intent and constraints...",
      "Resolving CRM metadata and customer history...",
      "Consulting knowledge base for active onboarding rules...",
      "Generating localized contract variations...",
      "Validating output compliance structures...",
      "Executing human-in-the-loop review queue...",
      "Request finalized: Ready for instant deployment!"
    ];

    steps.forEach((stepText, index) => {
      setTimeout(() => {
        setThinkSteps(prev => [...prev, stepText]);
        if (index === steps.length - 1) {
          setIsThinking(false);
        }
      }, (index + 1) * 600);
    });
  };

  const runAutomateSimulation = () => {
    setIsWorkflowRunning(true);
    setWorkflowLog("Initializing pipeline matrix...");

    setTimeout(() => {
      setWorkflowLog("Listening for incoming hook on endpoint '/api/v1/ingest'...");
    }, 500);

    setTimeout(() => {
      setWorkflowLog(`Hook captured! Extracting fields: trigger_type='${selectedTrigger}'`);
    }, 1200);

    setTimeout(() => {
      setWorkflowLog(`Synthesizing context via Vortiq cognitive model...`);
    }, 2000);

    setTimeout(() => {
      setWorkflowLog(`Invoking downstream handler: action='${selectedAction}'`);
    }, 2800);

    setTimeout(() => {
      setWorkflowLog(`Pipeline fully resolved in 34ms!`);
      setIsWorkflowRunning(false);
    }, 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg h-full bg-neutral-950 border-l border-neutral-900 shadow-2xl flex flex-col z-10 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-900">
              <div>
                <h3 className="text-md font-bold tracking-tight">Vortiq Core Architecture</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">Explore the mechanics behind cognitive AI agents</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation tabs */}
            <div className="grid grid-cols-3 border-b border-neutral-900 px-4 bg-neutral-950">
              {(["think", "automate", "deliver"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-xs font-semibold capitalize border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? "border-orange-500 text-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tab === "think" && <span className="flex items-center justify-center gap-1.5"><Brain className="w-3.5 h-3.5 text-orange-500" /> Think</span>}
                  {tab === "automate" && <span className="flex items-center justify-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-orange-500" /> Automate</span>}
                  {tab === "deliver" && <span className="flex items-center justify-center gap-1.5"><Send className="w-3.5 h-3.5 text-orange-500" /> Deliver</span>}
                </button>
              ))}
            </div>

            {/* Dynamic Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: THINK (Cognitive Core) */}
              {activeTab === "think" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">The Self-Correcting Thought Matrix</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Vortiq agents don't just execute static code. They form complex, multi-layered plans, consult systemic context, self-assess outputs for accuracy, and dynamically modify their logic paths mid-execution.
                    </p>
                  </div>

                  {/* Interactive Simulator */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-orange-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-orange-500" /> Cognitive Playground
                    </span>

                    <div className="space-y-2">
                      <label className="text-[11px] text-neutral-400">Input a business request scenario:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={queryInput}
                          onChange={(e) => setQueryInput(e.target.value)}
                          className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          disabled={isThinking}
                        />
                        <button
                          onClick={runThinkSimulation}
                          disabled={isThinking || !queryInput}
                          className="px-3 bg-white text-black text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        >
                          {isThinking ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-black" />}
                          Run
                        </button>
                      </div>
                    </div>

                    {/* Console Output */}
                    <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-3 font-mono text-[10px] min-h-[160px] max-h-[160px] overflow-y-auto space-y-1.5 text-neutral-400">
                      <div className="text-neutral-500">// System response log will output here...</div>
                      {thinkSteps.map((stepText, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-start gap-1.5 ${idx === thinkSteps.length - 1 && !isThinking ? "text-green-400" : "text-neutral-300"}`}
                        >
                          <span className="text-orange-500">⚡</span>
                          <span>{stepText}</span>
                        </motion.div>
                      ))}
                      {isThinking && (
                        <div className="flex items-center gap-1.5 text-orange-500 font-semibold animate-pulse mt-1">
                          <span>●</span>
                          <span>Agent is reflecting...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AUTOMATE (Pipeline Orchestrator) */}
              {activeTab === "automate" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Event-Driven Action Matrix</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Connect any data stream to any transactional target. Vortiq acts as a cognitive bridge, mapping structural schemas, validating access criteria, and synthesizing missing properties autonomously.
                    </p>
                  </div>

                  {/* Interactive Builder Simulator */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-orange-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-orange-500" /> Pipeline Orchestration
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Trigger Selector */}
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Trigger Event</label>
                        <select
                          value={selectedTrigger}
                          onChange={(e) => setSelectedTrigger(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg p-2 text-neutral-200"
                        >
                          <option value="web_hook">Webhook Trigger</option>
                          <option value="email_receive">Email Received</option>
                          <option value="sheet_row">Sheets Row Created</option>
                        </select>
                      </div>

                      {/* Action Selector */}
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Target Action</label>
                        <select
                          value={selectedAction}
                          onChange={(e) => setSelectedAction(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-lg p-2 text-neutral-200"
                        >
                          <option value="crm_update">Update Salesforce CRM</option>
                          <option value="slack_alert">Post Slack Notification</option>
                          <option value="pdf_contract">Generate & Send PDF</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-center py-2">
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-3">
                        <span className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded-md font-mono">{selectedTrigger}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                        <span className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded-md font-mono">{selectedAction}</span>
                      </div>
                    </div>

                    <button
                      onClick={runAutomateSimulation}
                      disabled={isWorkflowRunning}
                      className="w-full py-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-black" />
                      Test Live Flow Connection
                    </button>

                    {/* Console Logs */}
                    {workflowLog && (
                      <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-3 font-mono text-[10px] space-y-1 text-neutral-300">
                        <div className="text-neutral-500">// Terminal Output:</div>
                        <div className="text-neutral-400 flex items-center gap-1.5">
                          {isWorkflowRunning ? (
                            <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                          ) : (
                            <Check className="w-3 h-3 text-green-400" />
                          )}
                          <span>{workflowLog}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: DELIVER (Deployment Hub) */}
              {activeTab === "deliver" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sovereign Channels</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Deploy your customized agents across multi-modal interfaces. Support rich interactions including text, document rendering, calendar syncs, and direct API actions.
                    </p>
                  </div>

                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-orange-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-orange-500" /> Live Integration Channels
                    </span>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-900 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium">Custom Web SDK Widget</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">HTML embed code ready</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-900 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium">Enterprise Slack Integration</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">OAuth workspace connection active</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-900 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium">Secure Email Server Handler</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">IMAP/SMTP tunneling live</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                      <h5 className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> High-Performance SLA Guaranteed
                      </h5>
                      <p className="text-[10px] text-neutral-400 mt-1 leading-normal">
                        Every single operation runs inside dedicated, sandboxed virtual environments that feature 99.99% uptime metrics, robust TLS v1.3 encryption protocols, and zero-data retention policies.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-900 bg-neutral-950">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center"
              >
                Close System Explorer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

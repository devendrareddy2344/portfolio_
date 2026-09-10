"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Database, Eye, Terminal, CheckCircle2, Play, Check } from "lucide-react";

interface Step {
  label: string;
  sublabel: string;
  type: "input" | "process" | "model" | "output";
}

interface ProjectArchFlowProps {
  steps: Step[];
  projectId: string;
}

export const ProjectArchFlow: React.FC<ProjectArchFlowProps> = ({ steps, projectId }) => {
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setCompleted(false);
    setActiveStep(0);

    const stepDuration = 600;

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setRunning(false);
            setCompleted(true);
            setTimeout(() => {
              setActiveStep(null);
              setCompleted(false);
            }, 3000);
          }, stepDuration);
        }
      }, idx * stepDuration);
    });
  };

  const getIcon = (type: Step["type"]) => {
    switch (type) {
      case "input":
        return <Eye className="w-4 h-4 text-cyan-400" />;
      case "process":
        return <Terminal className="w-4 h-4 text-sky-400" />;
      case "model":
        return <Database className="w-4 h-4 text-indigo-400" />;
      case "output":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getBorderColor = (type: Step["type"], isSimActive: boolean) => {
    if (isSimActive) {
      return "border-cyan-400 bg-cyan-500/20 shadow-[0_0_25px_rgba(0,240,255,0.4)] ring-1 ring-cyan-400 scale-[1.02]";
    }
    switch (type) {
      case "input":
        return "border-cyan-500/30 group-hover:border-cyan-400/70 bg-cyan-950/20";
      case "process":
        return "border-sky-500/30 group-hover:border-sky-400/70 bg-sky-950/20";
      case "model":
        return "border-indigo-500/30 group-hover:border-indigo-400/70 bg-indigo-950/20";
      case "output":
        return "border-emerald-500/30 group-hover:border-emerald-400/70 bg-emerald-950/20";
    }
  };

  return (
    <div className="w-full my-4 p-4 sm:p-5 rounded-2xl bg-[#090d18]/90 border border-slate-800/80 backdrop-blur-md overflow-hidden transition-all duration-300">
      
      {/* Flow Header with Simulation Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="uppercase tracking-wider font-semibold">Decision Pipeline Architecture</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={running}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-all duration-300 ${
              completed
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                : running
                ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 animate-pulse"
                : "bg-slate-800/80 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 cursor-pointer"
            }`}
          >
            {completed ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Simulation Complete (184ms)</span>
              </>
            ) : running ? (
              <>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Simulating Inference...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <span>Test Decision Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isSimActive = activeStep === idx;

          return (
            <div key={`${projectId}-step-${idx}`} className="relative group">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className={`h-full p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${getBorderColor(
                  step.type,
                  isSimActive
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-slate-900/90 border border-slate-800">
                    {getIcon(step.type)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                    Stage 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-100 tracking-wide group-hover:text-cyan-300 transition-colors">
                    {step.label}
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-snug mt-1 font-light">
                    {step.sublabel}
                  </p>
                </div>

                {isSimActive && (
                  <div className="mt-2 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Executing stage logic...</span>
                  </div>
                )}
              </motion.div>

              {/* Arrow connector between stages on desktop */}
              {!isLast && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-cyan-400/40 group-hover:text-cyan-400 transition-colors pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

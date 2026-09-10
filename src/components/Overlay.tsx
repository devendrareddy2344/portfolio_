"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown, Terminal, Cpu, Database, Network, Activity, Disc } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface OverlayProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const Overlay: React.FC<OverlayProps> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentFrame(Math.round(latest * 74));
    setScrollPercent(Math.round(latest * 100));
  });

  const { personal } = PORTFOLIO_DATA;

  // Section 1: 0% scroll (Center) - Identity, Core Philosophy & Status
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.12, 0.18], ["0px", "-10px", "-40px"]);

  // Section 2: 30% scroll (Left aligned) - Agentic AI, LangGraph, Autonomous Pipelines
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.45], [0, 1, 0.95, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.45], ["30px", "0px", "0px", "-30px"]);

  // Section 3: 60% scroll (Right aligned) - Production RAG, Vector DBs, ML & FastAPI Microservices
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.58, 0.68, 0.75], [0, 1, 0.95, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.58, 0.68, 0.75], ["30px", "0px", "0px", "-30px"]);

  // Section 4: 85%-98% scroll (Center transition) - Leading directly into Projects Laboratory
  const opacity4 = useTransform(scrollYProgress, [0.82, 0.88, 0.94, 0.99], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.88, 0.94, 0.99], ["30px", "0px", "0px", "-20px"]);

  // HUD Visibility: visible throughout the 400vh track, fades out at the very end
  const hudOpacity = useTransform(scrollYProgress, [0, 0.05, 0.93, 0.99], [0.9, 1, 1, 0]);

  const stages = [
    { num: "01", name: "IDENTITY", target: 0 },
    { num: "02", name: "AGENTS", target: 0.3 },
    { num: "03", name: "RAG & ML", target: 0.6 },
    { num: "04", name: "SYSTEMS", target: 0.88 },
  ];

  const scrollToRatio = (ratio: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop + ratio * (containerRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* ── Futuristic HUD: Live Frame & Telemetry Readout ── */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-xl">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Disc className="w-3 h-3 animate-spin" />
              <span>FRM // {String(currentFrame).padStart(2, "0")}/74</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-slate-300">
              SCRUB // <span className="text-white font-bold">{scrollPercent}%</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>60FPS CANVAS</span>
            </div>
          </div>
        </motion.div>

        {/* ── Interactive Right Stage Navigator ── */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="hidden md:flex flex-col gap-2.5 absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto"
        >
          {stages.map((stage) => {
            const isActive =
              (stage.num === "01" && scrollPercent < 20) ||
              (stage.num === "02" && scrollPercent >= 20 && scrollPercent < 48) ||
              (stage.num === "03" && scrollPercent >= 48 && scrollPercent < 78) ||
              (stage.num === "04" && scrollPercent >= 78);

            return (
              <button
                key={stage.num}
                onClick={() => scrollToRatio(stage.target)}
                className={`group flex items-center gap-2 text-right transition-all duration-300 cursor-pointer ${
                  isActive ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {stage.name}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border transition-all ${
                    isActive
                      ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                      : "bg-black/30 border-white/5 text-slate-400 group-hover:border-white/20"
                  }`}
                >
                  {stage.num}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Section 1: 0% scroll (Center) ── */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-5 backdrop-blur-md shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="tracking-widest uppercase text-[11px] font-semibold">
              AI & GENAI SYSTEMS ENGINEER
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            {personal.name}
          </h1>

          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-cyan-200 tracking-wide max-w-2xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            &ldquo;{personal.headline}&rdquo;
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-300/90 font-mono tracking-wide max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Agentic Pipelines • Deterministic RAG • Scalable ML Microservices
          </p>

          {/* Tech tags preview */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg">
            {["LangGraph", "FastAPI", "FAISS", "Clinical BERT", "Playwright", "Docker"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/40 border border-white/10 text-cyan-300 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-slate-200 backdrop-blur-md shadow-lg">
            <span>Scroll down to inspect systems</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          </div>
        </motion.div>

        {/* ── Section 2: 30% scroll (Left aligned) - Agentic AI & Reasoning ── */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 sm:px-12 lg:px-24 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-4 backdrop-blur-md shadow-lg">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wider uppercase text-[11px] font-semibold">DECISION & REASONING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Autonomous Agents & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">
              Multi-Agent Swarms
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Beyond superficial prompt wrappers. Architecting stateful LangGraph workflows, multi-step tool execution loops, and autonomous stealth web scraping with resilient error-handling.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["LangChain & LangGraph", "Agent Tool Use", "Self-Correction Loops", "Playwright Evasion", "OpenRouter Vision"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Section 3: 60% scroll (Right aligned) - Production RAG & ML Plumbing ── */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col justify-center items-end text-right px-6 sm:px-12 lg:px-24 ml-auto max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-4 backdrop-blur-md shadow-lg">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wider uppercase text-[11px] font-semibold">RELIABLE PLUMBING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Deterministic RAG & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300">
              Applied ML Systems
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Strict microservice decoupling with FastAPI. High-throughput FAISS vector indexes, Mem0 conversational memory, Clinical BERT biomedical parsing, and DBSCAN unsupervised price positioning.
          </p>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            {["FastAPI Microservices", "FAISS Vector Store", "Clinical BERT & MPNet", "Scikit-Learn (DBSCAN)", "Redis & PostgreSQL"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-blue-950/60 border border-blue-500/40 text-sky-300 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Section 4: 85%-98% scroll (Center transition) ── */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-4 backdrop-blur-md shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wider uppercase text-[11px] font-semibold">ENGINEERING ARCHITECTURES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Featured Repositories
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-200 max-w-md font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Scroll down — systems engineered for constraint and scale
          </p>

          <div className="mt-6 flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <span>Scroll into projects</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

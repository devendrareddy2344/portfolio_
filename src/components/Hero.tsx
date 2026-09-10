"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, ShieldCheck, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

// Dynamically import 3D Canvas with ssr disabled
const AgentCanvas3D = dynamic(() => import("./AgentCanvas3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center bg-[#070b14]/60 rounded-2xl border border-cyan-500/20">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        Loading Agent Visualizer...
      </div>
    </div>
  ),
});

export const Hero = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column: Identity & Positioning */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>2025 B.Tech CS (AI & DS) • 8.4 CGPA</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                Autonomous Systems • RAG • Applied ML
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
                {personal.headline.split("decide,")[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                  decide,
                </span>
                {personal.headline.split("decide,")[1]}
              </h1>
            </div>

            {/* Subline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              {personal.subline}
            </p>

            {/* Micro value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-100 block">Agentic Flow Architect</span>
                  Beyond wrappers — strict verification loops & multi-step tool execution.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-100 block">Production RAG & ML</span>
                  Deterministic grounding, FAISS memory & microservice decoupling.
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-200"
              >
                <span>See the work</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href="#resumes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-cyan-400/60 hover:text-white transition-all duration-200"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-[#0a66c2] hover:border-slate-700 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column: 3D Interactive Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <AgentCanvas3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Layers, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { ProjectArchFlow } from "./ProjectArchFlow";
import { GithubIcon } from "@/components/Icons";
import { sound } from "@/lib/sound";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => {
        sound.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-500 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.08), transparent 45%)`,
        }}
      />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 relative z-10">
        
        {/* Left Column: Project Description & Meta */}
        <div className="flex-1 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 font-semibold">
              0{index + 1} // ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {project.oneLiner}
          </p>

          {/* Problem & Constraint solved */}
          <div className="p-4 rounded-2xl bg-[#090e1a]/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-1.5 backdrop-blur-md">
            <div className="font-semibold text-cyan-400 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>The Constraint & Problem Solved:</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{project.problemSolved}</p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2 pt-1">
            {project.keyHighlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-light">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techTags.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900/90 text-slate-300 border border-slate-800/90 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Code Link Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-all duration-300 shadow-lg group/btn hover:shadow-cyan-500/20"
          >
            <GithubIcon className="w-4 h-4 text-slate-400 group-hover/btn:text-cyan-400 transition-colors" />
            <span>View Repository</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/btn:text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Interactive Architecture Flow Visualizer with Inference Simulator */}
      <div className="mt-8 pt-6 border-t border-slate-800/70">
        <ProjectArchFlow steps={project.architectureSteps} projectId={project.id} />
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      {/* Atmospheric glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-4 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-widest uppercase text-[11px]">4 FEATURED PRODUCTION SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Systems Engineered for Scale &amp; Constraint
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            Real repositories selected for algorithmic rigor, multi-stage agent workflows, and clean decoupled microservice architectures. Sourced directly from GitHub.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

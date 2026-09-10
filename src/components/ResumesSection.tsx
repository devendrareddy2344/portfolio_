"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, Download, CheckCircle, Brain, Cpu, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const ResumesSection = () => {
  const { resumes } = PORTFOLIO_DATA;

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-6 h-6 text-cyan-400" />;
      case 1:
        return <Cpu className="w-6 h-6 text-sky-400" />;
      case 2:
        return <FileText className="w-6 h-6 text-indigo-400" />;
      case 3:
        return <Sparkles className="w-6 h-6 text-cyan-300" />;
      default:
        return <FileText className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getGradient = (index: number) => {
    if (index === 0) {
      return "bg-gradient-to-b from-[#0a1529]/95 to-[#070d1a]/95 border-cyan-500/40 hover:border-cyan-400 shadow-lg shadow-cyan-950/30";
    }
    if (index === 1) {
      return "bg-gradient-to-b from-[#081224]/95 to-[#060b17]/95 border-sky-500/30 hover:border-sky-400/70 shadow-lg shadow-sky-950/20";
    }
    return "bg-[#080d19]/90 border-slate-800/90 hover:border-cyan-500/40";
  };

  return (
    <section id="resumes" className="py-20 relative bg-[#050811]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Download className="w-3.5 h-3.5" />
            <span>SPECIALIZED RESUMES • DIRECT DOWNLOAD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Targeted Resumes for AI, ML & ATS Portals
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Download the specialized AI Engineer resume, the Applied Machine Learning resume, or the automated ATS-compatible format.
          </p>
        </div>

        {/* 4 Resume Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {resumes.map((resume, idx) => (
            <motion.div
              key={resume.filename}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-7 rounded-2xl border transition-all duration-300 backdrop-blur-sm flex flex-col justify-between ${getGradient(
                idx
              )}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/90 text-cyan-300 border border-slate-800">
                    {resume.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-1.5">
                  {resume.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {resume.subtitle}
                </p>

                <div className="space-y-2 text-xs text-slate-300 mb-6 border-t border-slate-800/80 pt-4">
                  {idx === 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Highlights Agentic reasoning, RAG architectures & LangGraph</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Focused on production microservices & multimodal LLM systems</span>
                      </div>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>Highlights PyTorch, Scikit-learn, clustering & predictive models</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>Applied ML, computer vision & data pipeline engineering</span>
                      </div>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Single-column linear layout optimized for ATS screening</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Ideal for Workday, Greenhouse, Lever, and Taleo</span>
                      </div>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Signal cyan executive layout matching portfolio aesthetic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Best for direct outreach, LinkedIn DMs, and recruiters</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Direct Download Button */}
              <a
                href={resume.url}
                download={resume.filename}
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  idx === 0
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20"
                    : idx === 1
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-100 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50 shadow-md"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download {resume.title} (PDF)</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

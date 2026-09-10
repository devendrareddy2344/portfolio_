"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const Experience = () => {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TRACK RECORD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Practical industry contributions in autonomous pipelines, conversational intelligence, and applied ML.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050811] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-400/50" />

              <div className="p-6 rounded-xl bg-[#080d19]/80 border border-slate-800/80 group-hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-cyan-400">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  {exp.contributions.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

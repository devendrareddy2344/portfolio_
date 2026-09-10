"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Layout, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const Skills = () => {
  const { skills } = PORTFOLIO_DATA;

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 1:
        return <Cpu className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Database className="w-4 h-4 text-indigo-400" />;
      case 3:
        return <Layout className="w-4 h-4 text-emerald-400" />;
      default:
        return <Brain className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#040711]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Skills Grouped by Architectural Domain
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Not an unorganized tag cloud — a structured competency breakdown grounded in real codebases and verified upskilling tracks.
          </p>
        </div>

        {/* 4 Category Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl bg-[#080d19]/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(catIdx)}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-100">
                    {category.category}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                  {category.badge}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const isUpskilling = skill.level === "upskilling";

                  return (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                        isUpskilling
                          ? "bg-amber-950/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-900/90 text-slate-200 border border-slate-800 hover:border-cyan-500/50 hover:text-white"
                      }`}
                    >
                      <span>{skill.name}</span>
                      {isUpskilling && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-sans font-semibold">
                          Upskilling
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const Education = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Education
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Formal rigorous grounding in computer science, machine learning algorithms, and mathematical computation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#080d19]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {edu.period}
                  </span>
                  {edu.grade && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      <Award className="w-3.5 h-3.5" />
                      {edu.grade}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 leading-snug">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{edu.institution}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

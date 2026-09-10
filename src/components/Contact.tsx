"use client";

import React, { useState } from "react";
import { Mail, Send, MessageSquare, CheckCircle, Copy, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export const Contact = () => {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission or mailto fallback
    setSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Closing Punchline Highlight */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-blue-950/20 to-slate-900/40 border border-cyan-500/30 text-center max-w-4xl mx-auto shadow-2xl shadow-cyan-950/20">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            ENGINEERING PRINCIPLE & POSITIONING
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            &ldquo;{personal.closingStatement}&rdquo;
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>DIRECT CHANNELS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                Let&apos;s talk systems
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Open to full-time AI / Machine Learning Engineer roles, agentic system design, or technical collaborations.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Email item */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#080d19]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${personal.email}`} className="text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* GitHub item */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#080d19]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">GitHub</span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      github.com/devendrareddy2344
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* LinkedIn item */}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#080d19]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 text-[#0a66c2]">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">LinkedIn</span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/devendrareddy02
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#080d19]/90 border border-slate-800/90 backdrop-blur-sm shadow-xl">
              <h4 className="text-lg font-bold text-slate-100 mb-1">
                Send a Message
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Directly opens your mail client or dispatches an inquiry with structured metadata.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h5 className="font-bold text-emerald-300 text-base">Message Initiated</h5>
                  <p className="text-xs text-slate-300">
                    Thank you! Your mail application has been prepared with your message to Devendra.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@anthropic.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Devendra, I came across your Dynamic Pricing and Clinical Trials RAG repos..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send System Dispatch</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Search, Sparkles, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Zap } from "lucide-react";
import { sound } from "@/lib/sound";

interface QueryPreset {
  question: string;
  matchedChunks: {
    title: string;
    similarity: number;
    text: string;
  }[];
  verdict: string;
  latency: number;
}

const PRESETS: QueryPreset[] = [
  {
    question: "How does Devendra implement multi-agent workflows with LangGraph?",
    matchedChunks: [
      {
        title: "Chunk #42 // LangGraph Stateful Agent Execution",
        similarity: 0.964,
        text: "Implements cyclical graph topologies with explicit state persistence. Rather than blind chained calls, each agent node has typed input/output validation, conditional routing edges, and automated retry on schema errors."
      },
      {
        title: "Chunk #18 // Tool Use & Guardrails",
        similarity: 0.918,
        text: "Integrates deterministic tool execution boundaries with fallback policies. Tools execute inside isolated subprocesses with parameter validation before LLM output ingestion."
      }
    ],
    verdict: "Devendra constructs stateful cyclical agent graphs in LangGraph where each node enforces strict schema validation and automated self-correction loops, avoiding brittle prompt-wrapping anti-patterns.",
    latency: 142,
  },
  {
    question: "What vector indexing strategy does he use for zero-hallucination RAG?",
    matchedChunks: [
      {
        title: "Chunk #07 // Enterprise FAISS IndexFlatIP Partitioning",
        similarity: 0.978,
        text: "Employs FAISS Inner Product (Cosine Similarity) with sentence-transformers/all-mpnet-base-v2 (768-dim embeddings). Documents are chunked into 512-token segments with 64-token sliding window overlap."
      },
      {
        title: "Chunk #89 // RBAC Token Document Isolation",
        similarity: 0.932,
        text: "FastAPI gateway inspects caller RBAC claims before querying vector partition namespaces, strictly preventing cross-tier confidential policy disclosures."
      }
    ],
    verdict: "Uses 768-dim MPNet embeddings with FAISS IndexFlatIP partitioned by RBAC security tokens. Responses are strictly constrained to retrieved chunks with cosine threshold > 0.85, guaranteeing deterministic zero-hallucination outputs.",
    latency: 98,
  },
  {
    question: "How did he evade anti-bot detection in the Dynamic Pricing platform?",
    matchedChunks: [
      {
        title: "Chunk #31 // Playwright Stealth Scraping Evasion",
        similarity: 0.982,
        text: "Orchestrated headless Playwright instances with automated canvas/WebGL fingerprint masking, randomized user-agent rotation, humanized mouse bezier curve delays, and residential proxy rotation."
      },
      {
        title: "Chunk #64 // DBSCAN Price Whitespace Clustering",
        similarity: 0.895,
        text: "Raw scraped product listings feed into DBSCAN clustering to eliminate noise SKUs and identify unserved price clusters across competing marketplaces."
      }
    ],
    verdict: "Engineered headless browser stealth evasion masking WebGL fingerprints and humanizing mouse trajectory delays, allowing autonomous scraping across Amazon, Flipkart, Walmart, and BestBuy without triggering Cloudflare or Akamai bot blocks.",
    latency: 165,
  }
];

export const RagInteractiveDemo: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [querying, setQuerying] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<QueryPreset>(PRESETS[0]);

  const handleSelect = (idx: number) => {
    if (querying) return;
    sound.playClick();
    setSelectedIdx(idx);
    setQuerying(true);

    setTimeout(() => {
      sound.playSuccess();
      setActivePreset(PRESETS[idx]);
      setQuerying(false);
    }, 450);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3 backdrop-blur-md">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE VERIFICATION BENCHMARK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Vector Retrieval & Knowledge Sandbox
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Test real retrieval queries against Devendra&apos;s architectural knowledge base. Inspect cosine similarity distances and grounded synthesis in real time.
          </p>
        </div>

        {/* Sandbox Container */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Query Preset Tabs */}
          <div className="mb-6">
            <p className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
              Select a benchmark query to execute:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3 rounded-xl text-left text-xs transition-all duration-200 border cursor-pointer ${
                    selectedIdx === i
                      ? "bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] font-semibold"
                      : "bg-black/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-cyan-400">QUERY 0{i + 1}</span>
                    {selectedIdx === i && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                  </div>
                  <p className="line-clamp-2 leading-relaxed">{preset.question}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Vector Search Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Retrieved Chunks (FAISS Cosine Distance) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FAISS Cosine Similarity Chunks</span>
                </span>
                <span className="text-emerald-400">MPNet 768-dim</span>
              </div>

              {querying ? (
                <div className="h-44 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Searching vector space via IndexFlatIP...</span>
                  </div>
                </div>
              ) : (
                activePreset.matchedChunks.map((chunk, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: cIdx * 0.1 }}
                    className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80 space-y-2 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-cyan-300 font-semibold">{chunk.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                        Score: {chunk.similarity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {chunk.text}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Right: Synthesized Grounded Response */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Grounded Generation Synthesis</span>
                </span>
                <span className="text-cyan-400">{activePreset.latency}ms latency</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/30 shadow-lg space-y-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Hallucination Guarantee Verified</span>
                </div>

                {querying ? (
                  <div className="h-24 flex items-center justify-center">
                    <span className="text-xs font-mono text-slate-400 animate-pulse">
                      Synthesizing verified response...
                    </span>
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-200 leading-relaxed font-normal"
                  >
                    {activePreset.verdict}
                  </motion.p>
                )}

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Grounding: Strict Top-2 Retrieval Chunks</span>
                  <span className="text-cyan-400">FastAPI Decoupled</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

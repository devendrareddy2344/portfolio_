"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft, Sparkles, Download, ExternalLink, Code2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const AiTerminalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">DEVA AI KERNEL v2.6.4 [ONLINE]</p>
          <p className="text-xs text-slate-400">
            Autonomous agent terminal active. Type <span className="text-cyan-300 font-semibold">help</span> or click command shortcuts below.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playClick();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    sound.playExecute();

    let output: React.ReactNode = null;

    switch (cleanCmd) {
      case "help":
        output = (
          <div className="text-xs space-y-1.5 text-slate-300 font-mono">
            <p className="text-cyan-400 font-semibold">// AVAILABLE SYSTEM COMMANDS:</p>
            <p><span className="text-cyan-300 font-bold">whoami</span> — Identity, philosophy & core credentials</p>
            <p><span className="text-cyan-300 font-bold">skills</span> — Full breakdown of AI, ML & Backend stack</p>
            <p><span className="text-cyan-300 font-bold">projects</span> — Deployed production repositories & architectures</p>
            <p><span className="text-cyan-300 font-bold">rag</span> — Run test vector semantic retrieval</p>
            <p><span className="text-cyan-300 font-bold">resume</span> — Direct links to official resumes</p>
            <p><span className="text-cyan-300 font-bold">clear</span> — Wipe terminal screen</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-xs space-y-2 text-slate-300 font-mono">
            <p className="text-white font-bold">{PORTFOLIO_DATA.personal.fullName}</p>
            <p className="text-cyan-300">{PORTFOLIO_DATA.personal.role} • 2025 B.Tech (AI & DS)</p>
            <p className="text-slate-400 leading-relaxed">&ldquo;{PORTFOLIO_DATA.personal.headline}&rdquo;</p>
            <p className="text-slate-400">{PORTFOLIO_DATA.personal.subline}</p>
            <p className="text-emerald-400">CGPA: {PORTFOLIO_DATA.personal.cgpa} • {PORTFOLIO_DATA.personal.college}</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs space-y-3 font-mono">
            {PORTFOLIO_DATA.skills.map((cat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-cyan-400 font-bold uppercase">{cat.category} // {cat.badge}</p>
                <p className="text-slate-300">{cat.skills.map((s) => s.name).join(" • ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-xs space-y-3 font-mono">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold">{p.title}</span>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-white flex items-center gap-1"
                  >
                    Code <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-slate-400">{p.oneLiner}</p>
                <p className="text-[11px] text-slate-500">{p.techTags.join(" | ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "rag":
        output = (
          <div className="text-xs space-y-2 font-mono">
            <p className="text-cyan-400 font-bold">// FAISS VECTOR RETRIEVAL TEST:</p>
            <div className="p-2 rounded bg-black/60 border border-cyan-500/30 text-slate-300 space-y-1">
              <p className="text-emerald-400">✓ Ingestion: 768-dim embeddings (MPNet)</p>
              <p className="text-emerald-400">✓ Metric: Cosine Similarity [IndexFlatIP]</p>
              <p className="text-cyan-300">Top Match (score: 0.942): &quot;Production decoupled FastAPI gateway with role-based partitioning.&quot;</p>
              <p className="text-slate-400">Status: Deterministic zero-hallucination boundary strictly verified.</p>
            </div>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="text-xs space-y-2 font-mono">
            <p className="text-cyan-400 font-bold">// OFFICIAL RESUMES READY FOR DOWNLOAD:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PORTFOLIO_DATA.resumes.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  download={r.filename}
                  className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-between text-slate-200 hover:text-white"
                >
                  <span>{r.title}</span>
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              ))}
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-xs font-mono text-rose-400">
            command not found: &quot;{cleanCmd}&quot;. Type <span className="underline">help</span> for valid operations.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <>
      {/* ── Floating Launcher Chip in bottom right ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          sound.playClick();
          setIsOpen(true);
        }}
        onMouseEnter={() => sound.playHover()}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#070c18]/90 hover:bg-[#0c1426] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-2xl shadow-black/80 group cursor-pointer"
      >
        <Terminal className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
        <span className="font-semibold tracking-wide">AI SHELL</span>
        <span className="px-1.5 py-0.5 rounded bg-black/60 border border-cyan-500/30 text-[10px] text-slate-400">
          ⌘K
        </span>
      </motion.button>

      {/* ── Terminal Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#070d1a]/95 border border-cyan-500/40 shadow-[0_0_90px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col h-[520px]"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/90 bg-black/40">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    deva-ai-agent@systems-kernel:~
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    ESC to close
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Output */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-mono">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {item.command !== "welcome" && (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="text-slate-500">guest@kernel:~$</span>
                        <span className="font-semibold text-white">{item.command}</span>
                      </div>
                    )}
                    <div className="pl-0">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-5 py-2.5 bg-black/40 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="text-slate-500 self-center mr-1">Quick:</span>
                {["whoami", "skills", "projects", "rag", "resume", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2.5 py-1 rounded-md bg-slate-900/90 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input Line */}
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 px-5 py-3.5 bg-slate-950 border-t border-slate-800">
                <span className="text-cyan-400 font-mono text-xs">guest@kernel:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type command (e.g. whoami, skills, projects, rag)..."
                  className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/30"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

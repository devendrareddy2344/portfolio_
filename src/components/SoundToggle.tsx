"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";

export const SoundToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(sound.isEnabled());
  }, []);

  const handleToggle = () => {
    const nextState = sound.toggle();
    setEnabled(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => sound.playHover()}
      title={enabled ? "Mute interactive audio FX" : "Enable interactive audio FX"}
      className={`relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border cursor-pointer ${
        enabled
          ? "bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
      } ${className}`}
    >
      {enabled ? (
        <>
          <div className="flex items-center gap-0.5 h-3 w-3 justify-center">
            <span className="w-0.5 h-3 bg-cyan-400 animate-pulse rounded-full" />
            <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-75 rounded-full" />
            <span className="w-0.5 h-3.5 bg-cyan-400 animate-pulse delay-150 rounded-full" />
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase">FX ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] tracking-wider uppercase">FX OFF</span>
        </>
      )}
    </button>
  );
};

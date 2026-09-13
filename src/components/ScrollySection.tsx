"use client";

import React, { useRef } from "react";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { Overlay } from "./Overlay";

/**
 * ScrollySection defines the hero scrolltrack (400vh) that drives the
 * 3D canvas frame scrubbing and displays the synchronized tech parallax overlay.
 */
export const ScrollySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="hero" ref={containerRef} className="relative w-full overflow-x-clip h-[150svh] md:h-[175vh]">
      {/* Canvas is pinned in the background */}
      <ScrollyCanvas containerRef={containerRef} />

      {/* Parallax tech overlay active during the 400vh hero scroll */}
      <Overlay containerRef={containerRef} />
    </div>
  );
};

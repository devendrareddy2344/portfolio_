"use client";

import React, { useRef, useEffect, useCallback, RefObject } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 75;

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(2, "0");
  return `/sequence/frame_${padded}_delay-0.067s.png`;
}

interface Props {
  containerRef: RefObject<HTMLElement | null>;
}

export const ScrollyCanvas: React.FC<Props> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── object-fit: cover draw ────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img?.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return;

    // True cover calculation: scale so the image completely fills canvas
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Preload all frames ────────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      images[i] = img;
      img.onload = () => {
        loadedCount++;
        if (i === 0) drawFrame(0);
        if (loadedCount === TOTAL_FRAMES) drawFrame(currentFrameRef.current);
      };
      img.src = getFrameSrc(i);
    }
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Scroll → frame ────────────────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const frameIndex = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)))
    );
    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    // Fixed viewport background: stays active behind the entire page
    <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ background: "#03111e" }}
      />
    </div>
  );
};

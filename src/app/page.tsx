import React from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollySection } from "@/components/ScrollySection";
import { Projects } from "@/components/Projects";
import { RagInteractiveDemo } from "@/components/RagInteractiveDemo";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { ResumesSection } from "@/components/ResumesSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AiTerminalModal } from "@/components/AiTerminalModal";

export default function Home() {
  return (
    <main id="home" className="min-h-screen flex flex-col bg-transparent relative">
      {/* Fixed Navbar (z-50) */}
      <Navbar />

      {/* ── Scrollytelling hero: 400vh track scrubs the fixed canvas sequence ── */}
      <ScrollySection />

      {/* ── Content flows over the fixed canvas background (z-20) ── */}
      <div className="relative z-20 bg-[#050811]/75 backdrop-blur-[3px] border-t border-cyan-500/20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <Projects />
        <RagInteractiveDemo />
        <Experience />
        <Skills />
        <Education />
        <ResumesSection />
        <Contact />
        <Footer />
      </div>

      {/* Interactive AI Agent Terminal Modal (Ctrl+K / Cmd+K) */}
      <AiTerminalModal />
    </main>
  );
}

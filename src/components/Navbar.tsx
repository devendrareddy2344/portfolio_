"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, FileDown, Menu, X } from "lucide-react";
import { SoundToggle } from "./SoundToggle";
import { sound } from "@/lib/sound";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Resumes", href: "#resumes" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const triggerTerminal = () => {
    sound.playClick();
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050811]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Identity: Click always scrolls smoothly to top/home */}
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="flex items-center gap-2.5 group cursor-pointer"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                  Devendra Reddy
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  AI Systems
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => sound.playHover()}
                onClick={(e) => {
                  if (link.href === "#home") {
                    handleScrollToTop(e);
                  } else {
                    sound.playClick();
                  }
                }}
                className="text-xs font-medium text-slate-300 hover:text-cyan-300 tracking-wide transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}

            {/* Quick Terminal Trigger Button */}
            <button
              onClick={triggerTerminal}
              onMouseEnter={() => sound.playHover()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Shell</span>
              <kbd className="text-[10px] text-slate-500 bg-black/40 px-1 rounded">⌘K</kbd>
            </button>

            {/* Audio Toggle */}
            <SoundToggle />

            {/* Resumes CTA */}
            <a
              href="#resumes"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-md shadow-cyan-500/20"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resumes</span>
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <SoundToggle />
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl bg-[#090d18] border border-slate-800 shadow-2xl space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href === "#home") {
                    handleScrollToTop(e);
                  } else {
                    sound.playClick();
                  }
                }}
                className="block py-1.5 px-3 rounded text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-cyan-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerTerminal();
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
              >
                <Terminal className="w-3.5 h-3.5" />
                Launch AI Shell (⌘K)
              </button>
              <a
                href="/resumes/V_Devendra_AI_Engineer.pdf"
                download="V_Devendra_AI_Engineer.pdf"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-semibold text-slate-950"
              >
                <FileDown className="w-3.5 h-3.5" />
                Download AI Engineer Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

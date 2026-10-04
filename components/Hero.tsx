"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Download,
  FolderSearch,
  LayoutGrid,
  Mail,
} from "lucide-react";
import { cvPath, profile } from "@/data/portfolio";
import HeroTerminal from "./HeroTerminal";
import SecurityStatus from "./SecurityStatus";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* HUD corner frame */}
      <div aria-hidden className="pointer-events-none absolute inset-4 hidden lg:block">
        <span className="absolute left-0 top-16 h-5 w-5 border-l-2 border-t-2 border-cyan-400/40" />
        <span className="absolute right-0 top-16 h-5 w-5 border-r-2 border-t-2 border-cyan-400/40" />
        <span className="absolute bottom-10 left-0 h-5 w-5 border-b-2 border-l-2 border-cyan-400/40" />
        <span className="absolute bottom-10 right-0 h-5 w-5 border-b-2 border-r-2 border-cyan-400/40" />
      </div>
      <p
        aria-hidden
        className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.4em] text-slate-700 xl:block"
      >
        SECURE_CHANNEL // PORTFOLIO_v1.0
      </p>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-32">
        {/* Left — identity */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1.5 font-mono text-[11px] text-cyan-300">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60"
                aria-hidden
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400"
                aria-hidden
              />
            </span>
            SOC // PORTFOLIO — GIZA, EGYPT
          </p>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Youssef Mohamed
            <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Abdelmaksoud
            </span>
          </h1>

          <p className="mt-5 font-mono text-sm text-cyan-300 sm:text-base">
            <span className="text-cyan-600">&gt;</span> {profile.title}
            <span
              className="ml-1 inline-block h-[1em] w-[8px] translate-y-[2px] animate-blink bg-cyan-400"
              aria-hidden
            />
          </p>

          <p className="mt-4 font-display text-xl text-slate-300 sm:text-2xl">
            {profile.tagline
              .split(".")
              .filter((word) => word.length > 0)
              .map((word, i, arr) => (
                <span key={i}>
                  {word.trim()}
                  <span className="text-cyan-400">.</span>
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-mono text-sm text-cyan-200 shadow-glow-sm transition hover:border-cyan-300/70 hover:bg-cyan-400/15 hover:shadow-glow"
            >
              <FolderSearch className="h-4 w-4" aria-hidden />
              View Experience
            </a>
            <a
              href="#skills"
              className="inline-flex items-center gap-2 rounded-md border border-cyan-400/25 bg-transparent px-5 py-3 font-mono text-sm text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/10"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Explore Skills
            </a>
            <a
              href={cvPath}
              download
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 py-3 font-mono text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 py-3 font-mono text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right — SOC panels */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="space-y-4"
        >
          <HeroTerminal />
          <SecurityStatus />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-500 transition hover:text-cyan-300 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}

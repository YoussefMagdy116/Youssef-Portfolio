"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-teal-500/[0.04] blur-3xl"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div id="experience-title">
          <SectionHeading
            index="02"
            label="EXPERIENCE"
            title="Operations Log"
            description="Work history presented as SOC event records — select an entry to expand its full log."
          />
        </div>

        <ol className="space-y-5">
          {experiences.map((item, i) => {
            const isOpen = openId === item.id;
            const panelId = `exp-panel-${item.id}`;
            return (
              <li key={item.id}>
                <Reveal delay={i * 0.06}>
                  <article
                    className={`glass scanfx relative overflow-hidden rounded-lg border-l-2 transition-colors ${
                      isOpen
                        ? "border-l-cyan-400/70"
                        : "border-l-cyan-400/20 hover:border-l-cyan-400/50"
                    }`}
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
                          {item.event}
                        </span>
                        <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                          {item.domain}
                        </span>
                        <span className="ml-auto font-mono text-xs text-slate-500">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-100">
                        {item.company}
                      </h3>
                      <p className="mt-1.5 font-mono text-sm text-slate-300">
                        <span className="text-cyan-500">ROLE //</span>{" "}
                        {item.role}
                      </p>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
                        {item.summary}
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="mt-5 inline-flex items-center gap-1.5 rounded font-mono text-xs text-cyan-300 transition hover:text-cyan-200"
                      >
                        {isOpen ? "HIDE LOG DETAILS" : "VIEW LOG DETAILS"}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={panelId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-5 space-y-2 border-t border-dashed border-white/10 pt-5">
                              {item.responsibilities.map((line) => (
                                <li
                                  key={line}
                                  className="flex gap-2.5 text-sm leading-relaxed text-slate-300"
                                >
                                  <span
                                    className="shrink-0 font-mono text-cyan-500"
                                    aria-hidden
                                  >
                                    ▸
                                  </span>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { contact, profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="contact-title">
          <SectionHeading
            index="07"
            label="CONTACT"
            title="Open Channel"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-slate-300">
                {contact.message}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                {profile.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-xs leading-relaxed text-slate-500">
                <span className="text-cyan-500">&gt;_</span> Typical response
                window: 24–48 hours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-3">
              <li>
                <div className="glass group flex items-center gap-4 rounded-lg p-4 transition-colors hover:border-cyan-400/30">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                      EMAIL
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="block truncate font-mono text-sm text-slate-200 transition hover:text-cyan-300"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-400" aria-hidden />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden />
                    )}
                  </button>
                </div>
              </li>

              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-4 rounded-lg p-4 transition-colors hover:border-cyan-400/30"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <Linkedin className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                      LINKEDIN
                    </p>
                    <span className="block truncate font-mono text-sm text-slate-200 transition group-hover:text-cyan-300">
                      {contact.linkedin.replace("https://www.", "")}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                    aria-hidden
                  />
                </a>
              </li>

              <li>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-4 rounded-lg p-4 transition-colors hover:border-cyan-400/30"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <Github className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                      GITHUB
                    </p>
                    <span className="block truncate font-mono text-sm text-slate-200 transition group-hover:text-cyan-300">
                      {contact.github.replace("https://", "")}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                    aria-hidden
                  />
                </a>
              </li>

              <li>
                <div className="glass flex items-center gap-4 rounded-lg p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                      LOCATION
                    </p>
                    <p className="font-mono text-sm text-slate-200">
                      {contact.location}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

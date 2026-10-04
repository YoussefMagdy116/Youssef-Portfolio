import { Network, Radar, Server, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/portfolio";

const PILLARS = [
  {
    icon: Radar,
    title: "Security Operations",
    text: "SOC-style monitoring, alert triage, threat detection, and incident investigation using SIEM tooling.",
  },
  {
    icon: Network,
    title: "Networking",
    text: "VLANs, segmentation, routing, and troubleshooting across switches, firewalls, and wireless links.",
  },
  {
    icon: Server,
    title: "Systems Administration",
    text: "Active Directory, Windows Server, access control, backups, and day-to-day infrastructure operations.",
  },
  {
    icon: Wrench,
    title: "Infrastructure Support",
    text: "Firewalls, surveillance systems, diskless deployments, and reliable IT operations for real environments.",
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="about-title">
          <SectionHeading
            index="01"
            label="ABOUT"
            title="Mission Profile"
            description={profile.summary}
          />
        </div>

        <Reveal>
          <p className="mb-8 max-w-2xl font-mono text-xs leading-relaxed text-slate-500">
            <span className="text-cyan-500">&gt;_</span> One profile, four
            connected disciplines — security operations built on top of real
            networking and infrastructure experience.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <article className="glass group relative h-full overflow-hidden rounded-lg p-6 transition-colors hover:border-cyan-400/30">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-400/50 opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-400/50 opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <pillar.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-100">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {pillar.text}
                </p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-slate-600">
                  {"MODULE_" + String(i + 1).padStart(2, "0") + " // ACTIVE"}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5 font-mono text-xs text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
                aria-hidden
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden
              />
            </span>
            STATUS: Actively developing cybersecurity expertise — continuous
            learning in progress.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import {
  Network,
  Radar,
  ScanLine,
  Server,
  ShieldHalf,
  Terminal,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SkillGraph from "./SkillGraph";
import { skillClusters } from "@/data/portfolio";

const CLUSTER_ICONS: Record<string, typeof Radar> = {
  secops: Radar,
  siem: ScanLine,
  netdef: ShieldHalf,
  networking: Network,
  sysadmin: Server,
  automation: Terminal,
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="skills-title">
          <SectionHeading
            index="03"
            label="SKILLS"
            title="Capability Matrix"
            description="Skills organized into technology clusters — no invented percentages, just the toolset and where it operates."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillClusters.map((cluster, i) => {
            const Icon = CLUSTER_ICONS[cluster.id] ?? Radar;
            return (
              <Reveal key={cluster.id} delay={i * 0.06}>
                <article className="glass group h-full rounded-lg p-6 transition-colors hover:border-cyan-400/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                      CLUSTER_{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-100">
                    {cluster.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${cluster.title} skills`}>
                    {cluster.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300 transition-colors group-hover:border-cyan-400/20"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <SkillGraph />
        </Reveal>
      </div>
    </section>
  );
}

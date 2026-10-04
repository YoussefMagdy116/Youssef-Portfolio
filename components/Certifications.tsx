import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certifications, education } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="certifications-title">
          <SectionHeading
            index="05"
            label="CREDENTIALS"
            title="Verified Credentials"
            description="Academic background and completed training programs."
          />
        </div>

        <Reveal>
          <article className="glass scanfx relative mb-6 overflow-hidden rounded-lg p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                <GraduationCap className="h-7 w-7" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-100">
                  {education.school}
                </h3>
                <p className="mt-1 font-mono text-sm text-slate-300">
                  {education.degree}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500">
                  {education.period}
                </span>
                <span className="rounded border border-emerald-400/30 bg-emerald-400/5 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                  COMPLETED
                </span>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.ref} delay={i * 0.08}>
              <article className="glass group relative h-full overflow-hidden rounded-lg p-6 transition-colors hover:border-cyan-400/30">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-cyan-400/25 bg-cyan-400/5 text-cyan-300">
                    <Award className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-emerald-400/30 bg-emerald-400/5 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    VERIFIED
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-slate-100">
                  {cert.name}
                </h3>
                <p className="mt-2 font-mono text-xs text-slate-400">
                  {cert.issuer}
                </p>
                <p className="mt-5 border-t border-dashed border-white/10 pt-4 font-mono text-[11px] text-cyan-400/80">
                  REF // {cert.ref}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

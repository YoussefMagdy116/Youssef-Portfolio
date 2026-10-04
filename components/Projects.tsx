import { FileText, Github } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects, type ProjectStatus } from "@/data/portfolio";

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> = {
  planned: {
    label: "PLANNED",
    className: "border-amber-400/30 bg-amber-400/5 text-amber-300",
  },
  "in-progress": {
    label: "IN PROGRESS",
    className: "border-cyan-400/30 bg-cyan-400/5 text-cyan-300",
  },
  complete: {
    label: "DEPLOYED",
    className: "border-emerald-400/30 bg-emerald-400/5 text-emerald-300",
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div id="projects-title">
          <SectionHeading
            index="04"
            label="PROJECTS / LABS"
            title="Lab Archive"
            description="Case files reserved for upcoming lab write-ups — hands-on build logs for SIEM, AD, segmentation, automation, and detection work. Content is added as each project is documented."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => {
            const status = STATUS_STYLES[project.status];
            return (
              <Reveal key={project.id} delay={(i % 3) * 0.07}>
                <article className="glass scanfx group relative flex h-full flex-col overflow-hidden rounded-lg p-6 transition-colors hover:border-cyan-400/30">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/80">
                      {project.caseFile}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-slate-100">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  {project.architecture ? (
                    <p className="mt-3 font-mono text-xs text-slate-500">
                      ARCH: {project.architecture}
                    </p>
                  ) : null}

                  {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {project.screenshots.map((src) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={src}
                          src={src}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          className="rounded border border-white/10"
                        />
                      ))}
                    </div>
                  ) : null}

                  <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-4 border-t border-dashed border-white/10 pt-4">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300 transition hover:text-cyan-200"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden />
                        GitHub
                      </a>
                    ) : (
                      <span
                        aria-disabled
                        title="Add a GitHub URL in data/portfolio.ts"
                        className="inline-flex cursor-not-allowed items-center gap-1.5 font-mono text-xs text-slate-600"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden />
                        GITHUB // PENDING
                      </span>
                    )}
                    {project.details ? (
                      <a
                        href={project.details}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-300 transition hover:text-cyan-200"
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        Details
                      </a>
                    ) : (
                      <span
                        aria-disabled
                        title="Add a details-page URL in data/portfolio.ts"
                        className="inline-flex cursor-not-allowed items-center gap-1.5 font-mono text-xs text-slate-600"
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden />
                        DETAILS // PENDING
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

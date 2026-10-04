import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <p className="font-mono text-xs tracking-[0.25em] text-cyan-400">
          [ {index} ] // {label}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          {title}
        </h2>
        <div
          aria-hidden
          className="mt-4 h-px w-40 bg-gradient-to-r from-cyan-400/70 via-cyan-400/20 to-transparent"
        />
        {description ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

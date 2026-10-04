import { Radar } from "lucide-react";

type Status = { label: string; value: string; tone: "green" | "cyan" };

const ROWS: Status[] = [
  { label: "Identity", value: "VERIFIED", tone: "green" },
  { label: "Network", value: "MONITORED", tone: "cyan" },
  { label: "Threat Level", value: "LOW", tone: "green" },
  { label: "SOC Link", value: "ACTIVE", tone: "cyan" },
  { label: "SIEM", value: "ONLINE", tone: "cyan" },
];

const toneClasses: Record<Status["tone"], string> = {
  green: "text-emerald-300",
  cyan: "text-cyan-300",
};

const dotClasses: Record<Status["tone"], string> = {
  green: "bg-emerald-400",
  cyan: "bg-cyan-400",
};

/**
 * Decorative SOC-style status panel. Purely visual — it does not
 * display real security data.
 */
export default function SecurityStatus() {
  return (
    <div className="glass scanfx relative overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <p className="font-mono text-[11px] tracking-[0.2em] text-slate-400">
          SYSTEM STATUS
        </p>
        <Radar className="h-3.5 w-3.5 text-cyan-400/70" aria-hidden />
      </div>

      <div className="relative flex items-stretch">
        <ul className="flex-1 space-y-2.5 p-4 font-mono text-xs">
          {ROWS.map((row) => (
            <li key={row.label} className="flex items-baseline">
              <span className="text-slate-400">{row.label}</span>
              <span
                aria-hidden
                className="mx-2 flex-1 -translate-y-[3px] border-b border-dotted border-slate-600/50"
              />
              <span
                className={`inline-flex items-center gap-1.5 ${toneClasses[row.tone]}`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dotClasses[row.tone]}`}
                    aria-hidden
                  />
                  <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotClasses[row.tone]}`}
                    aria-hidden
                  />
                </span>
                {row.value}
              </span>
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className="hidden w-24 shrink-0 items-center justify-center border-l border-white/5 sm:flex"
        >
          <div className="relative h-16 w-16 rounded-full border border-cyan-400/25">
            <div
              className="absolute inset-1 rounded-full border border-cyan-400/15"
            />
            <div
              className="absolute inset-0 rounded-full animate-radar"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg 300deg, rgba(34,211,238,0.35) 360deg)",
              }}
            />
            <span className="absolute left-1/2 top-[22%] h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" />
            <span className="absolute left-[30%] top-1/2 h-1 w-1 rounded-full bg-cyan-400/80" />
          </div>
        </div>
      </div>

      <p className="border-t border-white/5 px-4 py-2 font-mono text-[10px] text-slate-600">
        Simulated status display — no live security data
      </p>
    </div>
  );
}

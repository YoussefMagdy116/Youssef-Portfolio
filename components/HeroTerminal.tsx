"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Line = { kind: "cmd" | "out"; text: string };

const SCRIPT: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: ["Youssef Mohamed Abdelmaksoud"] },
  { cmd: "role", out: ["Junior Cybersecurity Analyst"] },
  { cmd: "focus", out: ["SOC | SIEM | Networking | Incident Response"] },
  { cmd: "status", out: ["Monitoring threats..."] },
];

const STATIC_LINES: Line[] = SCRIPT.flatMap((s) => [
  { kind: "cmd" as const, text: s.cmd },
  ...s.out.map((o) => ({ kind: "out" as const, text: o })),
]);

/**
 * Decorative, frontend-only simulated terminal. Nothing is executed —
 * it loops over a fixed script of commands and outputs.
 */
export default function HeroTerminal() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function run() {
      while (!cancelled) {
        setDone([]);
        setTyping("");
        await wait(500);
        for (const step of SCRIPT) {
          if (cancelled) return;
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return;
            setTyping(step.cmd.slice(0, i));
            await wait(45 + Math.random() * 55);
          }
          await wait(250);
          if (cancelled) return;
          setTyping("");
          setDone((d) => [...d, { kind: "cmd", text: step.cmd }]);
          for (const out of step.out) {
            await wait(230);
            if (cancelled) return;
            setDone((d) => [...d, { kind: "out", text: out }]);
          }
          await wait(650);
        }
        await wait(2800);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  const lines: Line[] = reduce
    ? STATIC_LINES
    : [
        ...done,
        ...(typing ? ([{ kind: "cmd", text: typing }] as Line[]) : []),
      ];

  return (
    <div className="glass scanfx relative overflow-hidden rounded-lg">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"
          aria-hidden
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[#28c840]"
          aria-hidden
        />
        <span className="ml-2 font-mono text-[11px] text-slate-500">
          you@soc — simulated
        </span>
      </div>
      <div
        className="h-[17.5rem] space-y-1.5 overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
        aria-label="Animated simulated terminal introducing Youssef"
      >
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          const isTypingLine = !reduce && isLast && typing.length > 0;
          return (
            <div key={i} className="flex items-baseline gap-2">
              {line.kind === "cmd" ? (
                <span className="shrink-0 text-cyan-500">
                  visitor@soc:~$
                </span>
              ) : null}
              <span
                className={
                  line.kind === "cmd" ? "text-cyan-200" : "text-slate-300"
                }
              >
                {line.text}
                {isTypingLine || (!reduce && isLast && !typing) ? (
                  <span
                    className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-cyan-400"
                    aria-hidden
                  />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

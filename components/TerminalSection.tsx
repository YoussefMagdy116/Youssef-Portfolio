"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { terminalCommands, terminalIntro } from "@/data/portfolio";

type Entry = { kind: "input" | "output"; text: string };

const PROMPT = "visitor@portfolio:~$";

export default function TerminalSection() {
  const [entries, setEntries] = useState<Entry[]>(
    terminalIntro.map((text) => ({ kind: "output" as const, text }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();
    const next: Entry[] = [{ kind: "input", text: raw }];

    if (command.length === 0) {
      // no-op enter — just re-echo the prompt
    } else if (command === "clear") {
      setEntries([]);
      setInput("");
      return;
    } else if (command in terminalCommands) {
      next.push(
        ...terminalCommands[command].map(
          (text) => ({ kind: "output" as const, text })
        )
      );
    } else {
      next.push({
        kind: "output",
        text: `command not found: ${command} — type 'help' to list commands.`,
      });
    }

    setEntries((prev) => [...prev, ...next]);
    if (command.length > 0) {
      setHistory((prev) => [raw.trim(), ...prev].slice(0, 20));
    }
    setHistoryIndex(null);
    setInput("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runCommand(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex - 1;
      if (nextIndex < 0) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] ?? "");
      }
    }
  };

  return (
    <section id="terminal" aria-labelledby="terminal-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div id="terminal-title">
          <SectionHeading
            index="06"
            label="TERMINAL ACCESS"
            title="Interactive Shell"
            description="A safe, frontend-only simulated terminal — predefined commands only, nothing is executed."
          />
        </div>

        <Reveal>
          <div className="glass overflow-hidden rounded-lg">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-2 font-mono text-[11px] text-slate-500">
                visitor@portfolio: ~ (simulated)
              </span>
            </div>

            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="h-80 cursor-text space-y-1.5 overflow-y-auto bg-black/40 p-4 font-mono text-[13px] leading-relaxed"
            >
              <div aria-live="polite" aria-label="Terminal output">
                {entries.map((entry, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    {entry.kind === "input" ? (
                      <span className="shrink-0 text-cyan-500">{PROMPT}</span>
                    ) : null}
                    <span
                      className={
                        entry.kind === "input"
                          ? "text-cyan-200"
                          : "text-slate-300"
                      }
                    >
                      {entry.text}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={onSubmit} className="flex items-baseline gap-2 pt-1">
                <label htmlFor="terminal-input" className="shrink-0 text-cyan-500">
                  {PROMPT}
                </label>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input — try 'help'"
                  className="w-full min-w-0 flex-1 bg-transparent text-cyan-100 caret-cyan-400 outline-none"
                />
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

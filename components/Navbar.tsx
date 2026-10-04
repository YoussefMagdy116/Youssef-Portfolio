"use client";

import { useEffect, useState } from "react";
import { Download, Menu, ShieldCheck, X } from "lucide-react";
import { cvPath, navLinks } from "@/data/portfolio";

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/5 bg-[rgba(4,7,13,0.82)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className="group flex items-center gap-2"
          aria-label="Back to top — Youssef Mohamed Abdelmaksoud"
        >
          <ShieldCheck
            className="h-6 w-6 text-cyan-400 transition group-hover:text-cyan-300"
            aria-hidden
          />
          <span className="font-display text-base font-semibold tracking-tight text-slate-100">
            Youssef<span className="text-cyan-400">.sec</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-md px-3 py-2 font-mono text-[13px] transition-colors ${
                      isActive
                        ? "text-cyan-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`mr-1 text-[10px] ${
                        isActive ? "text-cyan-500" : "text-slate-600"
                      }`}
                    >
                      {String(i).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cvPath}
            download
            className="hidden items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-2 font-mono text-xs text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-400/10 lg:inline-flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            CV.pdf
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/5 bg-[rgba(4,7,13,0.96)] backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`block rounded-md px-3 py-2.5 font-mono text-sm transition-colors ${
                    active === link.href
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="mr-2 text-[10px] text-slate-600">
                    {String(i).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={cvPath}
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/5 px-3 py-2.5 font-mono text-sm text-cyan-300"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

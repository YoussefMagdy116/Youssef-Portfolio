import { ShieldCheck } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" aria-hidden />
          <div>
            <p className="font-display text-sm font-semibold text-slate-200">
              {profile.name}
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              © {new Date().getFullYear()} — {profile.location}
            </p>
          </div>
        </div>

        <p className="max-w-sm font-mono text-[10px] leading-relaxed text-slate-600">
          SOC-style visuals on this site are simulated for presentation only —
          no live security data is displayed.
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[11px] text-slate-500 transition hover:text-cyan-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

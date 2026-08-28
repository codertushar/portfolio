"use client";

import { useEffect, useState } from "react";
import { scrollToSelector } from "@/lib/lenisSingleton";

const LINKS = [
  { label: "Journey", href: "#journey" },
  { label: "Impact", href: "#impact" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToSelector(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 md:px-10 ${
        solid ? "bg-ink-950/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <button
        onClick={() => go("#top")}
        className="font-display text-sm tracking-tightest text-bone-100 hover:text-signal-violet transition-colors"
      >
        TK<span className="text-signal-violet">.</span>
      </button>

      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => go(l.href)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-300 hover:text-bone-100 transition-colors"
          >
            {l.label}
          </button>
        ))}
        <a
          href="/Tushar-Khanna-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-bone-100/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-100 hover:border-signal-violet hover:text-signal-violet transition-colors"
        >
          Resume
        </a>
      </nav>

      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col gap-1.5 md:hidden"
      >
        <span
          className={`h-px w-6 bg-bone-100 transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-bone-100 transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-1 bg-ink-950/95 p-6 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="py-3 text-left font-mono text-sm uppercase tracking-[0.18em] text-bone-300 hover:text-bone-100 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href="/Tushar-Khanna-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 font-mono text-sm uppercase tracking-[0.18em] text-signal-violet"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}

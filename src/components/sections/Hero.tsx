"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { profile, socials } from "@/lib/content";
import { scrollToSelector } from "@/lib/lenisSingleton";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4, defaults: { ease: "power3.out" } });
      tl.from("[data-hero-kicker]", { opacity: 0, y: 16, duration: 0.7 })
        .from("[data-hero-line]", { opacity: 0, y: 60, duration: 1, stagger: 0.12 }, "-=0.4")
        .from("[data-hero-sub]", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from("[data-hero-scroll]", { opacity: 0, duration: 0.6 }, "-=0.2");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pt-32"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <p
          data-hero-kicker
          className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-signal-violet"
        >
          {profile.location} · {profile.years} years in software
        </p>

        <h1 className="font-display font-medium leading-[0.94] text-bone-100">
          <span data-hero-line className="block text-[13vw] tracking-tightest md:text-[8vw]">
            Tushar
          </span>
          <span
            data-hero-line
            className="block text-[13vw] tracking-tightest text-transparent md:text-[8vw]"
            style={{ WebkitTextStroke: "1.5px rgba(246,245,242,0.9)" }}
          >
            Khanna
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl font-sans text-base leading-relaxed text-bone-300 md:text-lg"
        >
          {profile.summary}
        </p>

        <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToSelector("#journey")}
            className="rounded-full bg-bone-100 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-950 transition-transform hover:scale-[1.03]"
          >
            See the journey
          </button>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.18em] text-bone-400 hover:text-signal-violet transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="mx-auto flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-500"
      >
        <span className="h-8 w-px animate-pulse bg-bone-500/60" />
        Scroll
      </div>
    </section>
  );
}

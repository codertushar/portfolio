"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skill-card]", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="relative bg-ink-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-sm uppercase tracking-[0.35em] text-bone-500">
            What I bring
          </h2>
          <span className="font-mono text-xs text-bone-500">{skills.length} areas</span>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skills.map((s) => (
            <div
              key={s.category}
              data-skill-card
              className="group rounded-2xl border border-bone-100/10 p-8 transition-colors hover:border-signal-violet/40"
            >
              <h3 className="font-display text-2xl text-bone-100">{s.category}</h3>
              <p className="mt-2 font-sans text-sm text-bone-400">{s.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-bone-100/10 px-3 py-1.5 font-mono text-[11px] text-bone-300 transition-colors group-hover:border-bone-100/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

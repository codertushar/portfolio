"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function parseValue(value: string) {
  const match = value.match(/[\d.]+/);
  const number = match ? parseFloat(match[0]) : 0;
  const prefix = value.split(match?.[0] ?? "")[0] ?? "";
  const suffix = value.slice((prefix + (match?.[0] ?? "")).length);
  return { number, prefix, suffix };
}

export default function Impact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-metric]");
      items.forEach((el, i) => {
        const valueEl = el.querySelector<HTMLElement>("[data-metric-value]");
        const raw = el.dataset.metric || "0";
        const { number, prefix, suffix } = parseValue(raw);
        const counter = { value: 0 };

        gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          defaults: { ease: "power3.out" },
        })
          .from(el, { opacity: 0, y: 40, duration: 0.7, delay: i * 0.08 })
          .to(
            counter,
            {
              value: number,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                if (!valueEl) return;
                const display = Number.isInteger(number)
                  ? Math.round(counter.value)
                  : counter.value.toFixed(0);
                valueEl.textContent = `${prefix}${display}${suffix}`;
              },
            },
            "-=0.4"
          );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={root} className="relative bg-ink-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-sm uppercase tracking-[0.35em] text-bone-500">
          In numbers
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {metrics.map((m) => (
            <div key={m.label} data-metric={m.value} className="border-t border-bone-100/10 pt-6">
              <p
                data-metric-value
                className="font-display text-4xl text-bone-100 tabular-nums md:text-5xl"
              >
                0
              </p>
              <p className="mt-2 font-sans text-sm text-bone-300">{m.label}</p>
              <p className="mt-1 font-sans text-xs text-bone-500">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

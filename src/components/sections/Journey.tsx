"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/lib/content";
import { setScene } from "@/lib/sceneStore";
import { useLowPower } from "@/lib/useLowPower";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ChapterBody({ chapter }: { chapter: (typeof chapters)[number] }) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
      <div>
        <p
          className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: chapter.color }}
        >
          {chapter.year}
        </p>
        <h3 className="mt-3 font-display text-4xl leading-[1.02] text-bone-100 md:text-5xl">
          {chapter.role}
        </h3>
        <p className="mt-2 font-sans text-lg text-bone-300">
          {chapter.company} · {chapter.location}
        </p>
        <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-bone-400 md:text-base">
          {chapter.summary}
        </p>
      </div>
      <ul className="flex flex-col justify-center gap-4 border-t border-bone-100/10 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
        {chapter.points.map((point, i) => (
          <li key={i} className="flex gap-3 font-sans text-sm leading-relaxed text-bone-300 md:text-base">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: chapter.color }} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useLowPower();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || reducedMotion) return;

    const ctx = gsap.context(() => {
      const activeRef = { current: 0 };
      const n = chapters.length;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: pinRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const total = self.progress * (n - 1);
          const nearest = Math.round(total);

          panelRefs.current.forEach((el, i) => {
            if (!el) return;
            const delta = total - i;
            const absDelta = Math.abs(delta);
            // Steep falloff: panels are fully readable near their own beat and
            // clear out of the way quickly, so adjacent chapters don't ghost
            // into each other mid-scroll.
            const opacity = Math.max(0, 1 - Math.pow(absDelta * 1.8, 1.4));
            el.style.opacity = String(opacity);
            el.style.transform = `translateY(${delta * 46}px)`;
            el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
          });

          if (nearest !== activeRef.current) {
            activeRef.current = nearest;
            setActiveIndex(nearest);
          }

          setScene({
            color: chapters[nearest].color,
            distort: 0.26 + nearest * 0.03,
            speed: 1 + nearest * 0.16,
            cameraZ: 6.4 - nearest * 0.28,
          });
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="journey" className="relative mx-auto max-w-6xl px-6 py-32 md:px-10">
        <SectionHeading />
        <div className="mt-16 flex flex-col gap-20">
          {chapters.map((chapter) => (
            <ChapterBody key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{ height: `${chapters.length * 130}vh` }}
      className="relative"
    >
      <div ref={pinRef} className="relative h-screen overflow-hidden px-6 md:px-10">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center">
          <SectionHeading />

          <div className="mt-10 flex gap-2">
            {chapters.map((c, i) => (
              <div
                key={c.id}
                className="h-1 flex-1 overflow-hidden rounded-full bg-bone-100/10"
              >
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: i <= activeIndex ? "100%" : "0%",
                    background: c.color,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="relative mt-10 h-[52vh] md:h-[46vh]">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <ChapterBody chapter={chapter} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-sm uppercase tracking-[0.35em] text-bone-500">
        The journey
      </h2>
      <span className="font-mono text-xs text-bone-500">01 — 04</span>
    </div>
  );
}

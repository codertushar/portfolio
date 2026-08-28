"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(counter, {
      value: 100,
      duration: reduceMotion ? 0.3 : 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value));
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const el = rootRef.current;
    if (!el) {
      setHidden(true);
      return;
    }
    gsap.to(el, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      delay: 0.15,
      onComplete: () => setHidden(true),
    });
  }, [done]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
    >
      <div className="flex items-baseline gap-3 font-display text-bone-100">
        <span className="text-sm tracking-[0.3em] text-bone-400">TK</span>
        <span ref={counterRef} className="text-4xl tabular-nums">
          0
        </span>
        <span className="text-sm text-bone-400">%</span>
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-500">
        loading the journey
      </p>
    </div>
  );
}

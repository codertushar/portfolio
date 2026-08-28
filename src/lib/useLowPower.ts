"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether to run the "light" tier: fewer particles, lower DPR,
 * simpler motion. Covers reduced-motion users, touch devices on small
 * screens, and machines with few cores — all of which struggle most with a
 * continuously-rendering WebGL canvas.
 */
export function useLowPower() {
  const [lowPower, setLowPower] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    const fewCores = (navigator.hardwareConcurrency || 8) <= 4;

    setReducedMotion(motionQuery.matches);
    setLowPower(motionQuery.matches || (coarse && narrow) || fewCores);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      setLowPower(e.matches || (coarse && narrow) || fewCores);
    };
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  return { lowPower, reducedMotion };
}

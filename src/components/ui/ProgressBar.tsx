"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const progress = scrollable > 0 ? h.scrollTop / scrollable : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-bone-100/5">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-signal-cyan via-signal-violet to-signal-rose"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

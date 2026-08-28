"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, socials } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <section id="contact" ref={root} className="relative bg-ink-950 px-6 pb-10 pt-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p data-contact-reveal className="font-mono text-xs uppercase tracking-[0.35em] text-signal-violet">
          Let's talk
        </p>
        <h2
          data-contact-reveal
          className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] text-bone-100 md:text-6xl"
        >
          Building something ambitious with AI and the web? I'd like to hear about it.
        </h2>

        <div data-contact-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-bone-100 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-950 transition-transform hover:scale-[1.03]"
          >
            {profile.email}
          </a>
          <a
            href="/Tushar-Khanna-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-bone-100/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bone-100 hover:border-signal-violet hover:text-signal-violet transition-colors"
          >
            Download resume
          </a>
        </div>

        <div
          data-contact-reveal
          className="mt-20 flex flex-col gap-6 border-t border-bone-100/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex gap-6">
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
          <p className="font-mono text-xs text-bone-600">
            © {year} {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}

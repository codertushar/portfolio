"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const KIND_LABEL: Record<Project["kind"], string> = {
  product: "Product",
  oss: "Open source",
  tool: "Tool",
};

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: y * -6,
      rotateY: x * 8,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-project-card
      className={`group relative flex flex-col justify-between rounded-2xl border border-bone-100/10 bg-gradient-to-b from-bone-100/[0.03] to-transparent p-8 transition-colors hover:border-signal-violet/40 ${
        large ? "md:col-span-2 md:p-10" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-500">
            {KIND_LABEL[project.kind]}
          </span>
          <span className="font-mono text-bone-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>
        <h3 className={`mt-4 font-display text-bone-100 ${large ? "text-4xl" : "text-2xl"}`}>
          {project.name}
        </h3>
        <p className="mt-1 font-sans text-sm text-signal-violet/90">{project.tagline}</p>
        <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-bone-400">
          {project.description}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-bone-100/10 px-3 py-1 font-mono text-[10px] text-bone-400"
          >
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project-card]", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = projects;

  return (
    <section id="projects" ref={root} className="relative bg-ink-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-sm uppercase tracking-[0.35em] text-bone-500">
            Selected work
          </h2>
          <span className="font-mono text-xs text-bone-500">{projects.length} projects</span>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ProjectCard project={featured} large />
          {rest.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

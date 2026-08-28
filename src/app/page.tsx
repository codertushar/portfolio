"use client";

import dynamic from "next/dynamic";
import { useLowPower } from "@/lib/useLowPower";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Impact from "@/components/sections/Impact";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

export default function Home() {
  const { lowPower } = useLowPower();

  return (
    <main className="relative">
      <Scene lowPower={lowPower} />
      <div className="relative z-10">
        <Hero />
        <Journey />
        <Impact />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}

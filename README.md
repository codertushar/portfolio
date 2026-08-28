# tushar-khanna-portfolio

A scroll-driven, WebGL-backed portfolio. Full rebuild — replaces the old
Create React App resume site with a single long-form page that tells the
career story as you scroll, instead of a static list of jobs.

**Live concept:** a fixed 3D scene sits behind the page; scroll position
drives its color, distortion, camera and rotation as you move through each
chapter of the "journey" timeline, then the page settles into a more
conventional (but still animated) layout for skills, projects and contact.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **React Three Fiber** / **drei** / **three** for the WebGL scene
- **GSAP** + **ScrollTrigger** for scroll-scrubbed animation
- **Lenis** for smooth/inertia scrolling

## Structure

```
src/
  app/                 # Next.js App Router entry (layout, page, metadata, globals.css)
  components/
    canvas/Scene.tsx    # the R3F canvas — centerpiece, orbiters, lights, camera rig
    sections/           # Hero, Journey, Impact, Skills, Projects, Contact
    ui/                 # Nav, ProgressBar, Preloader
    SmoothScroller.tsx  # Lenis + GSAP ScrollTrigger wiring
  lib/
    content.ts          # all copy — experience, skills, projects, metrics
    sceneStore.ts        # module-level store the 3D scene reads every frame
    useLowPower.ts       # reduced-motion / low-end-device detection
    lenisSingleton.ts    # exposes the active Lenis instance for nav "scroll to"
```

Content lives in one place (`src/lib/content.ts`) — that's the file to edit
for new roles, projects, or numbers.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deployment

Built for **Vercel** — import the repo, framework auto-detects as Next.js,
no config needed. `public/Tushar-Khanna-Resume.pdf` is served at
`/Tushar-Khanna-Resume.pdf`.

## Accessibility / performance notes

- Respects `prefers-reduced-motion`: the Journey section falls back to a
  plain stacked layout (no pinning/scrub) and Lenis smooth-scroll is skipped.
- A `lowPower` tier (touch + narrow screens, or `hardwareConcurrency <= 4`)
  reduces particle count and canvas DPR.
- No external runtime assets (fonts are self-hosted via `next/font`, the 3D
  scene is fully procedural — no glTF/HDR downloads).

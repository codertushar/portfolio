// Central content model for the site, sourced from Tushar's resume and public GitHub work.
// Keep copy here, not scattered in components, so it's one place to edit.

export const profile = {
  name: "Tushar Khanna",
  role: "Technical Lead, Full-stack & Applied AI",
  location: "Mohali, Punjab, India",
  years: 14,
  email: "hellotusharkhanna@gmail.com",
  github: "https://github.com/codertushar",
  linkedin: "https://www.linkedin.com/in/khannatushar",
  resumeHref: "/Tushar-Khanna-Resume.pdf",
  summary:
    "Fourteen years building enterprise web products, the last six leading frontend and platform architecture for an HCM suite used by 200+ customers. Currently shipping AI into that product: a tool-calling assistant with an intent orchestrator and AI-driven translation, plus an AI-assisted delivery cycle running across the team.",
};

export type Chapter = {
  id: string;
  year: string;
  company: string;
  role: string;
  location: string;
  color: string; // theme accent for this chapter, drives the 3D scene + UI
  summary: string;
  points: string[];
};

// Chronological order: the arc builds toward "now".
export const chapters: Chapter[] = [
  {
    id: "infosys",
    year: "2012–2016",
    company: "Infosys",
    role: "Senior System Engineer",
    location: "Chennai",
    color: "#5eead4",
    summary:
      "Started as an intern building a J2ME mobile app, then spent four years shipping and supporting enterprise Java web applications.",
    points: [
      "Requirement analysis straight from functional-spec documents, then design and coding",
      "Ran client demos and gathered requirements for new enhancements",
      "Owned unit testing and release handoff with the release team",
      "Two Star Awards for production-support performance",
    ],
  },
  {
    id: "trantor",
    year: "2016–2017",
    company: "Trantor",
    role: "Senior Software Engineer",
    location: "Chandigarh",
    color: "#818cf8",
    summary:
      "Built the frontend for an energy platform: real-time maps and data visualisation on top of a live event backend.",
    points: [
      "D3.js and Chart.js dashboards visualising consumption history and bill predictions",
      "Real-time Google Maps location listener tracking customer incident acknowledgements",
      "Full user auth/authorization plus role-based CRUD for users and programs",
      "Translated UX designs into production code end to end",
    ],
  },
  {
    id: "basware",
    year: "2017–2019",
    company: "Basware",
    role: "Senior Software Engineer",
    location: "Chandigarh",
    color: "#fbbf24",
    summary:
      "Built a configurable Angular component library from the ground up and moved it from v1.x to v8.x, documented and tested properly.",
    points: [
      "Configurable components: datepicker, popover, modal, multiselect, email input",
      "Component demos and docs via Storybook as a living UI explorer",
      "Introduced Jest unit testing, measurably cutting production defects",
      "Worked directly with product owners and designers to shape component behaviour",
    ],
  },
  {
    id: "catalystone",
    year: "2020–Present",
    company: "CatalystOne Solutions",
    role: "Technical Lead",
    location: "Mohali",
    color: "#a78bfa",
    summary:
      "Leading frontend and platform architecture for an HCM suite used by 200+ customers, now shipping AI directly into the product.",
    points: [
      "In-product AI assistant: an orchestrator that resolves intent and calls tools across internal APIs, so employees complete HR actions without leaving the conversation",
      "AI translation: an Azure OpenAI capability replacing a manual localisation workflow with on-demand multi-language content",
      "Led the Angular to React migration and rebuilt the information architecture with async-loaded submenus, ~50% faster perceived load",
      "Scaled a shared design system to 70+ components across four teams, moved onto a Single-SPA microfrontend architecture",
      "Built React analytics dashboards against GraphQL APIs, tuning rendering for large HR datasets",
      "Runs an AI-assisted delivery cycle: from reviewing requirements to writing and reviewing code, tests and docs",
      "Mentors senior engineers and owns frontend engineering standards org-wide",
    ],
  },
];

export type Metric = { label: string; value: string; detail: string };

export const metrics: Metric[] = [
  { value: "14", label: "years in software", detail: "from J2ME intern to technical lead" },
  { value: "200+", label: "customers served", detail: "on the HCM suite CatalystOne ships" },
  { value: "70+", label: "components", detail: "in the shared design system, across 4 teams" },
  { value: "~50%", label: "faster perceived load", detail: "after the Angular to React rebuild" },
];

export type Skill = { category: string; blurb: string; items: string[] };

export const skills: Skill[] = [
  {
    category: "AI engineering",
    blurb: "Shipping LLM features into a real product, not just prototypes",
    items: [
      "LLM application design",
      "Agent & tool orchestration",
      "Prompt engineering",
      "Azure OpenAI",
      "AI-assisted development",
    ],
  },
  {
    category: "Frontend",
    blurb: "13+ years across every major era of JS frameworks",
    items: [
      "React & TypeScript",
      "Angular 1.x → 15",
      "Zustand",
      "Microfrontends (Single-SPA)",
      "Design systems",
      "Performance",
    ],
  },
  {
    category: "Backend & data",
    blurb: "Comfortable owning a feature end to end",
    items: ["REST & GraphQL API design", "Event-sourced services", "Graph-backed services"],
  },
  {
    category: "Practice",
    blurb: "The scaffolding that makes shipping repeatable",
    items: ["System design", "Technical leadership & mentoring", "Jest", "CI/CD", "Agile delivery"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  href: string;
  kind: "product" | "oss" | "tool";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "GaadiWise",
    tagline: "AI-driven car buying, for the Indian market",
    description:
      "A guided questionnaire pairs with generative AI to recommend vehicles by fit, not just filters: side-by-side comparisons, ownership-cost estimates and a 3D catalog of cars people actually cross-shop in India.",
    stack: ["React 19", "TypeScript", "Tailwind", "Vite", "Node/Express", "Gemini AI"],
    href: "https://github.com/codertushar/GaadiWise",
    kind: "product",
    featured: true,
  },
  {
    name: "MotorcycleWise",
    tagline: "GaadiWise's sibling, for two-wheelers",
    description:
      "The same AI-matching approach as GaadiWise, tuned for Indian motorcycle and scooter buyers: a 20+ bike catalog, side-by-side comparisons, an ownership-cost calculator and segment-specific buyer guides.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Gemini AI"],
    href: "https://github.com/codertushar/MotorcycleWise",
    kind: "product",
  },
  {
    name: "InterviewPrep",
    tagline: "Personalized interview prep, one roadmap at a time",
    description:
      "An onboarding flow builds a custom study roadmap by role and stack, backed by a filterable DSA question bank, system design topics and progress tracking.",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind"],
    href: "https://github.com/codertushar/InterviewPrep",
    kind: "product",
  },
  {
    name: "frontend-resources",
    tagline: "crackfrontend.in, a daily companion for frontend mastery",
    description:
      "An actively maintained knowledge base of DSA study plans, JS internals, design patterns, system design write-ups and machine-coding challenges, built for engineers prepping for interviews.",
    stack: ["Markdown", "Docs-as-code"],
    href: "https://github.com/codertushar/frontend-resources",
    kind: "tool",
  },
];

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

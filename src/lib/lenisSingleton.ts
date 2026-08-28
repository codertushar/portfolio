import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToSelector(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

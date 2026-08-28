// A tiny module-level store the 3D scene reads every frame.
//
// Deliberately NOT React state: scroll-driven values change on every tick and
// funnelling them through setState would re-render the whole tree 60x/sec.
// GSAP ScrollTrigger callbacks mutate this object directly; <Scene/> lerps
// toward it inside useFrame for smooth, damped motion.

export type SceneTarget = {
  color: string;
  distort: number;
  speed: number;
  cameraZ: number;
  tilt: number;
};

export const sceneTarget: SceneTarget = {
  color: "#a78bfa",
  distort: 0.32,
  speed: 1,
  cameraZ: 6.2,
  tilt: 0,
};

export function setScene(partial: Partial<SceneTarget>) {
  Object.assign(sceneTarget, partial);
}

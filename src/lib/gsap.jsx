// Import the UMD dist builds so Jest (which doesn't transform node_modules) can parse them.
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tests run in jsdom without layout — skip real animation there.
export const isTest = process.env.NODE_ENV === 'test';

export { gsap, ScrollTrigger };

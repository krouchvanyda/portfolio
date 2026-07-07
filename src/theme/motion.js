// ─────────────────────────────────────────────────────────────────────────────
// motion.js — AppAnimationMotion: shared Framer Motion tokens.
//
// One place for the easing curve, spring presets, and interaction/reveal recipes
// so every component animates with the same feel (instead of re-declaring
// `{ type: 'spring', stiffness: 400, damping: 20 }` in each file).
//
//   import { AppAnimationMotion } from './motion';
//   <motion.div transition={AppAnimationMotion.spring} />
//   <motion.a {...AppAnimationMotion.lift} />
// ─────────────────────────────────────────────────────────────────────────────

// Entrance/reveal easing curve (a soft ease-out).
const ease = [0.22, 1, 0.36, 1];

// Spring presets, from snappy → gentle.
const spring = { type: 'spring', stiffness: 400, damping: 20 };      // buttons, nav links, small controls
const springSoft = { type: 'spring', stiffness: 300, damping: 22 };  // cards, back-to-top (larger elements)
const springPanel = { type: 'spring', stiffness: 260, damping: 24 }; // the chat panel pop-in

export const AppAnimationMotion = {
  ease,
  spring,
  springSoft,
  springPanel,

  // Hover = lift, tap = shrink. Spread onto a motion element: `{...lift}`.
  lift: { whileHover: { y: -3 }, whileTap: { scale: 0.96 }, transition: spring },

  // Scroll-reveal states — spread as inline targets:
  //   initial={reveal.hidden} whileInView={reveal.show}
  // (inline objects, not variant labels, so whileInView resolves through MUI Box).
  reveal: {
    hidden: { opacity: 0, y: 38 },
    show: { opacity: 1, y: 0 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// sx.js — shared MUI `sx` style objects.
//
// These are the raw style recipes reused across the app. They read the
// CSS-variable theme tokens defined in `src/index.css` (e.g. var(--grad),
// var(--surface)), so they automatically follow the light/dark toggle.
//
// Two ways they're consumed:
//   1. Directly:      <Box sx={someSx} />
//   2. Via ui.jsx:    the wrapper components in `src/theme/ui.jsx` bake these
//                     in so you write <GradButton>…</GradButton> instead.
// Prefer the ui.jsx components in markup; import from here only when you need
// to spread/override a recipe inline. Colours come from AppColors (colors.js).
// ─────────────────────────────────────────────────────────────────────────────

import { AppColors } from './colors';

// Clips the brand gradient into text (transparent fill). Use on a span/heading
// to make a word render in the gradient. → powers <GradText>.
export const gradText = {
  background: AppColors.grad,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

// Primary gradient pill button (filled). → powers <GradButton>.
// Used for main CTAs: "View my work", "Let's talk", the contact email, etc.
export const btnSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  borderRadius: '999px',
  px: '28px',
  py: '14px',
  fontWeight: 600,
  fontSize: '0.95rem',
  lineHeight: 1.2,
  textTransform: 'none',
  color: AppColors.btnText,
  background: AppColors.grad,
  cursor: 'pointer',
  border: 'none',
  boxShadow: '0 10px 30px -12px rgba(99,102,241,0.7)',
  transition: 'filter .25s ease, box-shadow .25s ease',
  '&:hover': { filter: 'brightness(1.08)', boxShadow: '0 16px 40px -12px rgba(99,102,241,0.9)' },
};

// Secondary "ghost" pill button (transparent, bordered). → powers <GhostButton>.
// Used for lower-emphasis actions like "Get in touch".
export const btnGhostSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  borderRadius: '999px',
  px: '28px',
  py: '14px',
  fontWeight: 600,
  fontSize: '0.95rem',
  lineHeight: 1.2,
  textTransform: 'none',
  color: AppColors.text,
  background: 'transparent',
  cursor: 'pointer',
  border: `1px solid ${AppColors.border}`,
  transition: 'background .2s ease, border-color .2s ease',
  '&:hover': { background: AppColors.surface, borderColor: AppColors.borderHover },
};

// Small rounded "chip"/tag pill for tech labels. → powers <Tag>.
// Used for skill tags, project tech tags, the About badges.
export const chipSx = {
  display: 'inline-block',
  borderRadius: '999px',
  px: '12px',
  py: '5px',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: AppColors.muted,
  background: AppColors.surface,
  border: `1px solid ${AppColors.border}`,
  whiteSpace: 'nowrap',
};

// Translucent "glass" panel fill + hairline border (the card/nav surface look).
// Spread onto any Box you want to sit on the frosted surface.
export const surfaceSx = {
  background: AppColors.surface,
  border: `1px solid ${AppColors.border}`,
};

// Solid soft-panel fill + hairline border (the non-glass "inset" surface look).
// → powers <Panel>. Used for the About avatar card, the Skills icon tiles, and
// the skill-bar tracks. Set radius/size/layout via `sx`.
export const panelSx = {
  background: AppColors.bgSoft,
  border: `1px solid ${AppColors.border}`,
};

// Small uppercase, letter-spaced label above section headings. → powers <Eyebrow>.
// e.g. "About me", "What I do", "Selected work".
export const eyebrowSx = {
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  color: AppColors.accent2,
};

// Big section heading (Space Grotesk, fluid clamp size). → powers <SectionTitle>.
export const secTitleSx = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  fontSize: 'clamp(1.9rem, 4vw, 3rem)',
};

// Muted sub-text/description under a section heading. → powers <SectionSub>.
export const secSubSx = {
  mt: 2,
  fontSize: '1.05rem',
  color: AppColors.muted,
};

// Display-typeface heading base (Space Grotesk). → powers <Heading>.
// Used for card titles, the hero h1/h2, the logo, stat numbers. Callers set the
// size/weight/level via `sx` + `component`; this just locks in the font family.
export const displaySx = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 600,
  letterSpacing: '-0.01em',
};

// Muted body paragraph text. → powers <Text>.
// Used for card descriptions, the About copy, the hero tagline. Override
// spacing/size inline via `sx` (e.g. mt, fontSize).
export const textSx = {
  fontSize: '0.95rem',
  color: AppColors.muted,
};

// Vertical rhythm for a page <section> (responsive top/bottom padding).
// → powers <Section>.
export const sectionSx = {
  position: 'relative',
  py: { xs: '80px', sm: '110px' },
};

// Centered content column with a max width + side gutters. → powers <Container>.
export const containerSx = {
  width: '100%',
  maxWidth: '1160px',
  mx: 'auto',
  px: '24px',
};

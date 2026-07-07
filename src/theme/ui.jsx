// ─────────────────────────────────────────────────────────────────────────────
// ui.jsx — reusable presentational components (the app's little "design kit").
//
// Each component wraps an MUI element (Box/Typography) with a shared style
// recipe from `sx.js`, so screens read cleanly:
//     <Section id="work"><Container>…</Container></Section>
// instead of repeating long `sx={{ … }}` objects everywhere.
//
// Every component accepts an `sx` prop that MERGES over its defaults (spread
// last), plus forwards other props (href, onClick, id, …) to the root element.
// Styling comes from the CSS-variable theme tokens, so all of these follow the
// light/dark toggle automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AppColors } from './colors';
import { AppAnimationMotion } from './motion';
import {
  btnGhostSx,
  btnSx,
  chipSx,
  containerSx,
  displaySx,
  eyebrowSx,
  gradText,
  panelSx,
  secSubSx,
  secTitleSx,
  sectionSx,
  textSx,
} from './sx';

// Shared spring hover/tap used by the animated buttons (from AppAnimationMotion).
const lift = AppAnimationMotion.lift;

// ── Primitive ─────────────────────────────────────────────────────────────────

// The app's base box. A thin pass-through over MUI's <Box> so every layout
// element goes through one component (use instead of importing Box directly).
// Forwards ref + all props (component, sx, motion props, …) unchanged.
export const AppBox = forwardRef(function AppBox(props, ref) {
  return <Box ref={ref} {...props} />;
});

// ── Layout ──────────────────────────────────────────────────────────────────

// Full-width page <section> with responsive vertical padding.
// Pass `id` (used by the nav anchors + scroll-spy). Wrap the inner content in
// <Container> for the centered column.
export function Section({ children, sx, ...props }) {
  return (
    <AppBox component="section" sx={{ ...sectionSx, ...sx }} {...props}>
      {children}
    </AppBox>
  );
}

// Centered content column (max-width 1160px + side gutters). Goes inside <Section>.
export function Container({ children, sx, ...props }) {
  return (
    <AppBox sx={{ ...containerSx, ...sx }} {...props}>
      {children}
    </AppBox>
  );
}

// ── AppText ────────────────────────────────────────────────────────────────

// Small uppercase label above a heading, e.g. "Selected work".
export function Eyebrow({ children, sx }) {
  return <AppText sx={{ ...eyebrowSx, ...sx }}>{children}</AppText>;
}

// Big section heading (renders an <h2>).
export function SectionTitle({ children, sx }) {
  return (
    <AppText component="h2" sx={{ ...secTitleSx, ...sx }}>
      {children}
    </AppText>
  );
}

// Muted descriptive line under a section heading.
export function SectionSub({ children, sx }) {
  return <AppText sx={{ ...secSubSx, ...sx }}>{children}</AppText>;
}

// Heading in the display typeface (Space Grotesk). Defaults to an <h3>; pass
// `component` for another level/element (e.g. motion.h1) and set the size/weight
// via `sx`. Used for card titles, hero headings, the logo, stat numbers.
export function Heading({ children, sx, component = 'h3', ...props }) {
  return (
    <AppText component={component} sx={{ ...displaySx, ...sx }} {...props}>
      {children}
    </AppText>
  );
}

// Muted body paragraph (card copy, About text, hero tagline). Tweak
// spacing/size inline via `sx`; pass `component` (e.g. motion.p) when animating.
export function AppText({ children, sx, ...props }) {
  return (
    <Typography sx={{ ...textSx, ...sx }} {...props}>
      {children}
    </Typography>
  );
}

// Renders its text in the brand gradient (gradient-clipped text). Defaults to a
// <span>; pass `component` to change the element.
export function GradText({ children, sx, component = 'span' }) {
  return (
    <AppBox component={component} sx={{ ...gradText, ...sx }}>
      {children}
    </AppBox>
  );
}

// Small rounded tech-tag/chip pill (skill tags, project tags, About badges).
export function Tag({ children, sx }) {
  return (
    <AppBox component="span" sx={{ ...chipSx, ...sx }}>
      {children}
    </AppBox>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

// Emoji/symbol glyph rendered as an inline icon — a <span> with consistent
// line-height so it sits centred next to text. Pass the glyph as children and
// its size via `size` (any font-size value). Decorative by default (aria-hidden);
// pass aria-label to make it meaningful to screen readers.
export function AppIcon({ children, size, sx, ...props }) {
  return (
    <AppBox
      component="span"
      aria-hidden
      sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, ...(size && { fontSize: size }), ...sx }}
      {...props}
    >
      {children}
    </AppBox>
  );
}

// ── Cards ─────────────────────────────────────────────────────────────────────

// Static frosted panel — soft background + hairline border, no animation. The
// non-interactive counterpart to <HoverCard>. Set radius/size/layout via `sx`.
export function Panel({ children, sx, ...props }) {
  return (
    <AppBox sx={{ ...panelSx, ...sx }} {...props}>
      {children}
    </AppBox>
  );
}

// Frosted surface card that lifts on hover and presses on tap (Framer Motion).
// Used by the Skills and Project cards.
//   • hoverShadow — the glow shown on hover (differs per card)
//   • tap         — scale on click (0.98–0.99)
//   • sx          — merged over defaults; add nested "&:hover .child" rules here
export function HoverCard({ children, sx, hoverShadow = '0 24px 60px -30px rgba(99,102,241,0.6)', tap = 0.99, ...props }) {
  return (
    <AppBox
      component={motion.article}
      whileHover={{ y: -8 }}
      whileTap={{ scale: tap }}
      transition={AppAnimationMotion.springSoft}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        background: AppColors.surface,
        border: `1px solid ${AppColors.border}`,
        transition: 'border-color .4s, box-shadow .4s',
        '&:hover': { borderColor: 'rgba(129,140,248,0.4)', boxShadow: hoverShadow },
        ...sx,
      }}
      {...props}
    >
      {children}
    </AppBox>
  );
}

// ── Buttons (animated links) ──────────────────────────────────────────────────

// Primary gradient pill link with a spring hover/tap. Renders an <a>, so pass
// `href` (and optionally `onClick`). Used for main CTAs.
export function GradButton({ children, sx, ...props }) {
  return (
    <AppBox component={motion.a} {...lift} sx={{ ...btnSx, ...sx }} {...props}>
      {children}
    </AppBox>
  );
}

// Secondary "ghost" (outlined) pill link — same behaviour, lower emphasis.
export function GhostButton({ children, sx, ...props }) {
  return (
    <AppBox component={motion.a} {...lift} sx={{ ...btnGhostSx, ...sx }} {...props}>
      {children}
    </AppBox>
  );
}

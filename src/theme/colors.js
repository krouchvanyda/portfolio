// ─────────────────────────────────────────────────────────────────────────────
// colors.js — AppColors: the one place every colour is named.
//
// Most values point at the CSS variables in `src/index.css`, so reading a colour
// through AppColors still follows the light/dark toggle automatically. The few
// fixed hues (hero blobs, the "online" dot) are intentionally the same in both
// themes.
//
// Use instead of scattering raw 'var(--…)' / hex strings around the app:
//     import { AppColors } from './colors';
//     sx={{ color: AppColors.muted, background: AppColors.grad }}
// ─────────────────────────────────────────────────────────────────────────────

export const AppColors = {
  // Surfaces & structure (theme tokens)
  bg: 'var(--bg)',
  bgSoft: 'var(--bg-soft)',
  surface: 'var(--surface)',
  border: 'var(--border)',
  borderHover: 'rgba(129,140,248,0.5)', // lit indigo edge on hover/focus
  navBg: 'var(--nav-bg)',
  overlayBg: 'var(--overlay-bg)',
  chipSolid: 'var(--chip-solid)',
  gridLine: 'var(--grid-line)',

  // Text
  text: 'var(--text)',
  muted: 'var(--muted)',
  btnText: 'var(--btn-text)', // readable text on the gradient fill

  // Brand accents & gradient (theme tokens)
  accent1: 'var(--accent-1)',
  accent2: 'var(--accent-2)',
  accent3: 'var(--accent-3)',
  grad: 'var(--grad)',

  // Fixed hues — identical in light & dark
  blobIndigo: '#6366f1',
  blobCyan: '#22d3ee',
  blobPink: '#ec4899',
  online: '#34d399', // status "Online" / "Available" dot
};

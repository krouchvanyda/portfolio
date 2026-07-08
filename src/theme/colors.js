// ─────────────────────────────────────────────────────────────────────────────
// colors.js — AppColors: the one place every colour is named.
//
// Values are FIXED literals (hex / rgba), taken from the dark theme. Because they
// are hard-coded they do NOT follow the light/dark toggle — they render the same
// in both themes. (To make a colour theme-aware again, set it back to a
// 'var(--…)' token defined in src/index.css.)
//
// Use instead of scattering raw hex strings around the app:
//     import { AppColors } from './colors';
//     sx={{ color: AppColors.muted, background: AppColors.grad }}
// ─────────────────────────────────────────────────────────────────────────────

export const AppColors = {
  // Surfaces & structure
  bg: '#07070c',
  bgSoft: '#0e0e18',
  surface: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.09)',
  borderHover: 'rgba(129,140,248,0.5)', // lit indigo edge on hover/focus
  navBg: 'rgba(9,9,16,0.72)',
  overlayBg: 'rgba(9,9,16,0.96)',
  chipSolid: 'rgba(9,9,16,0.7)',
  gridLine: 'rgba(255,255,255,0.028)',

  // Text
  text: '#ecedf3',
  muted: '#9aa0b4',
  btnText: '#0a0a12', // readable text on the gradient fill

  // Brand accents & gradient
  accent1: '#6366f1',
  accent2: '#22d3ee',
  accent3: '#ec4899',
  grad: 'linear-gradient(120deg, #818cf8, #22d3ee 55%, #ec4899)',

  // Effects
  selection: 'rgba(129,140,248,0.35)', // text-highlight background
  spotlight: 'rgba(99,102,241,0.12)',  // cursor spotlight / skill-card glow
  ringHoverTint: 'rgba(129,140,248,0.08)', // cursor ring hover fill
  online: '#34d399', // status "Online" / "Available" dot

  // Hero blob hues
  blobIndigo: '#6366f1',
  blobCyan: '#22d3ee',
  blobPink: '#ec4899',

  // Basic palette — plain named colours to reach for
  white: '#ffffff',
  black: '#000000',
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  green: '#22c55e',
  blue: '#3b82f6',
  indigo: '#6366f1',
  purple: '#a855f7',
  pink: '#ec4899',
};

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* storage unavailable */
  }
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  // Toggle with an expanding circular reveal (View Transitions API),
  // falling back to the CSS cross-fade where it isn't supported.
  const toggle = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canReveal =
      typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

    if (!canReveal || reduce) {
      setTheme(next);
      return;
    }

    // Origin of the reveal — the click point (or top-right fallback).
    const x = event && event.clientX != null ? event.clientX : window.innerWidth - 40;
    const y = event && event.clientY != null ? event.clientY : 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.setAttribute('data-theme', next);
    });

    transition.ready
      .then(() =>
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 560,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      )
      .catch(() => {
        /* transition interrupted — theme already applied */
      });
  };

  return [theme, toggle];
}

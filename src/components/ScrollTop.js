import { useEffect, useState } from 'react';

const R = 22;
const C = 2 * Math.PI * R;

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      setVisible(el.scrollTop > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      className={`scrolltop ${visible ? 'scrolltop--show' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg className="scrolltop__ring" viewBox="0 0 52 52" width="52" height="52" aria-hidden="true">
        <defs>
          <linearGradient id="scrolltop-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--accent-1)' }} />
            <stop offset="55%" style={{ stopColor: 'var(--accent-2)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent-3)' }} />
          </linearGradient>
        </defs>
        <circle className="scrolltop__track" cx="26" cy="26" r={R} />
        <circle
          className="scrolltop__prog"
          cx="26"
          cy="26"
          r={R}
          stroke="url(#scrolltop-grad)"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <span className="scrolltop__arrow">↑</span>
    </button>
  );
}

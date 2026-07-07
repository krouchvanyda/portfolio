import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const R = 18;
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
    <motion.button
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.8 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="group fixed bottom-[28px] right-[28px] z-[90] grid h-[44px] w-[44px] place-items-center rounded-full border border-[var(--border)] bg-[var(--nav-bg)] text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md hover:shadow-[0_16px_40px_-12px_rgba(99,102,241,0.7)]"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
        <defs>
          <linearGradient id="scrolltop-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--accent-1))' }} />
            <stop offset="55%" style={{ stopColor: 'rgb(var(--accent-2))' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--accent-3))' }} />
          </linearGradient>
        </defs>
        <circle className="fill-none stroke-[var(--border)] [stroke-width:2.5]" cx="22" cy="22" r={R} />
        <circle
          className="fill-none [stroke-linecap:round] [stroke-width:2.5] [transition:stroke-dashoffset_0.15s_linear]"
          cx="22"
          cy="22"
          r={R}
          stroke="url(#scrolltop-grad)"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <span className="relative text-[1rem] leading-none animate-arrowbob group-hover:[animation-duration:0.8s]">↑</span>
    </motion.button>
  );
}

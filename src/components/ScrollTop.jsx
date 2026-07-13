import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppBox, AppIcon } from '../theme/ui';
import { AppColors } from '../theme/colors';
import { AppAnimationMotion } from '../theme/motion';

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
    <AppBox
      component={motion.button}
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.8 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={AppAnimationMotion.springSoft}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      sx={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 90,
        width: 44,
        height: 44,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        border: `1px solid ${AppColors.border}`,
        background: AppColors.navBg,
        color: AppColors.text,
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px -12px rgba(0,0,0,0.5)',
        '&:hover': { boxShadow: '0 16px 40px -12px rgba(99,102,241,0.7)' },
        '&:hover .arrow': { animationDuration: '0.8s' },
      }}
    >
      <AppBox component="svg" viewBox="0 0 44 44" width="44" height="44" aria-hidden sx={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="scrolltop-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: AppColors.accent1 }} />
            <stop offset="55%" style={{ stopColor: AppColors.accent2 }} />
            <stop offset="100%" style={{ stopColor: AppColors.accent3 }} />
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r={R} fill="none" stroke={AppColors.border} strokeWidth="2.5" />
        <circle
          cx="22"
          cy="22"
          r={R}
          fill="none"
          stroke="url(#scrolltop-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: 'stroke-dashoffset 0.15s linear' }}
        />
      </AppBox>
      <AppIcon className="arrow" size="1rem" sx={{ position: 'relative', animation: 'arrowbob 1.6s ease-in-out infinite' }}>↑</AppIcon>
    </AppBox>
  );
}

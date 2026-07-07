import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';
import { AppBox, GradButton, GradText } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const isDark = theme === 'dark';
  return (
    <AppBox
      component={motion.button}
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      sx={{ display: 'inline-flex', alignItems: 'center', border: 'none', background: 'none', p: 0, cursor: 'pointer' }}
    >
      <AppBox sx={{ width: 52, height: 28, borderRadius: '999px', display: 'flex', alignItems: 'center', p: '3px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <AppBox
          sx={{
            width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center',
            fontSize: '0.8rem', lineHeight: 1, background: 'var(--bg-soft)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            transition: 'transform .5s cubic-bezier(0.34,1.56,0.64,1)',
            transform: isDark ? 'none' : 'translateX(24px) rotate(360deg)',
          }}
        >
          {isDark ? '🌙' : '☀️'}
        </AppBox>
      </AppBox>
    </AppBox>
  );
}

function NavLink({ href, label, active, onClick, big }) {
  return (
    <AppBox
      component={motion.a}
      href={href}
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={AppAnimationMotion.spring}
      sx={{
        position: 'relative',
        fontWeight: 500,
        color: active ? 'var(--text)' : 'var(--muted)',
        transition: 'color .2s',
        '&:hover': { color: 'var(--text)' },
        ...(big
          ? { fontSize: '1.15rem', py: 1.5, borderBottom: '1px solid var(--border)', display: 'block' }
          : { fontSize: '0.95rem' }),
        '&::after': big
          ? {}
          : {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '-6px',
              height: '2px',
              borderRadius: '2px',
              background: 'var(--grad)',
              width: active ? '100%' : 0,
              transition: 'width .28s ease',
            },
        '&:hover::after': big ? {} : { width: '100%' },
      }}
    >
      {label}
    </AppBox>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <AppBox
      component={motion.header}
      initial={{ opacity: 0, y: '-120%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: AppAnimationMotion.ease }}
      sx={{ position: 'fixed', inset: '0 0 auto 0', zIndex: 100 }}
    >
      <AppBox
        sx={{
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid transparent',
          transition: 'max-width .45s cubic-bezier(0.22,1,0.36,1), margin .45s, padding .35s, background .35s, border-color .35s, box-shadow .35s, border-radius .45s',
          ...(scrolled
            ? {
                maxWidth: '1050px',
                mt: '12px',
                px: '16px',
                py: '11px',
                pl: { md: '22px' },
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(16px)',
                borderColor: 'var(--border)',
                borderRadius: '999px',
                boxShadow: '0 14px 44px -20px rgba(2,6,23,0.55)',
              }
            : { maxWidth: '1160px', px: '24px', py: '18px', borderRadius: 0 }),
        }}
      >
        <AppBox
          component="a"
          href="#home"
          onClick={() => setOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.3rem', fontWeight: 700 }}
        >
          <AppBox component="span" sx={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--grad)', boxShadow: '0 0 14px 2px rgba(99,102,241,0.8)', animation: 'logopulse 2.4s ease-in-out infinite' }} />
          dalia<GradText>.dev</GradText>
        </AppBox>

        <Stack direction="row" alignItems="center" spacing={1.75}>
          <Stack direction="row" alignItems="center" spacing={3.75} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {LINKS.map((l) => (
              <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
            ))}
            <GradButton href="#contact" sx={{ px: '18px', py: '9px', fontSize: '0.85rem' }}>
              Let's talk
            </GradButton>
          </Stack>

          <ThemeToggle />

          <AppBox
            component="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: '5px', background: 'none', border: 'none', p: '6px', cursor: 'pointer' }}
          >
            {[0, 1, 2].map((i) => (
              <AppBox
                key={i}
                component="span"
                sx={{
                  width: 26, height: 2, borderRadius: '2px', background: 'var(--text)',
                  transition: 'transform .3s ease, opacity .3s ease',
                  ...(open && i === 0 && { transform: 'translateY(7px) rotate(45deg)' }),
                  ...(open && i === 1 && { opacity: 0 }),
                  ...(open && i === 2 && { transform: 'translateY(-7px) rotate(-45deg)' }),
                }}
              />
            ))}
          </AppBox>
        </Stack>
      </AppBox>

      {/* Mobile menu */}
      <AppBox
        component="nav"
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
          position: 'fixed',
          inset: '0 0 0 auto',
          width: 'min(78vw, 320px)',
          p: 5,
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid var(--border)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {LINKS.map((l) => (
          <NavLink key={l.href} {...l} big active={activeId === l.href.slice(1)} onClick={() => setOpen(false)} />
        ))}
        <GradButton href="#contact" onClick={() => setOpen(false)} sx={{ mt: 2 }}>
          Let's talk
        </GradButton>
      </AppBox>
    </AppBox>
  );
}

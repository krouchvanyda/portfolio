import { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PROFILE } from '../data';
import useTypewriter from '../hooks/useTypewriter';
import { AppBox, AppText, GradButton, GhostButton, GradText, Heading } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const itemV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: AppAnimationMotion.ease } },
};

function Counter({ value }) {
  const to = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(reduce ? value : `0${suffix}`);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: AppAnimationMotion.ease,
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix, value, reduce]);

  return <span ref={ref}>{display}</span>;
}

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const blobsY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const blob = { position: 'absolute', borderRadius: '50%', filter: 'blur(70px)', opacity: 'var(--blob-opacity)' };

  return (
    <AppBox
      ref={heroRef}
      component="section"
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        px: '24px',
        pt: '120px',
        pb: '80px',
      }}
    >
      <AppBox component={motion.div} style={{ y: blobsY }} sx={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden>
        <AppBox sx={{ ...blob, width: 460, height: 460, background: '#6366f1', top: -120, left: -60, animation: 'floata 14s ease-in-out infinite' }} />
        <AppBox sx={{ ...blob, width: 380, height: 380, background: '#22d3ee', top: '20%', right: -80, animation: 'floatb 17s ease-in-out infinite' }} />
        <AppBox sx={{ ...blob, width: 340, height: 340, background: '#ec4899', bottom: -100, left: '30%', animation: 'floatc 20s ease-in-out infinite' }} />
      </AppBox>

      <AppBox
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      <AppBox
        component={motion.div}
        style={{ y: contentY, opacity: contentOpacity }}
        variants={containerV}
        initial="hidden"
        animate="show"
        sx={{ position: 'relative', zIndex: 2, maxWidth: 820 }}
      >
        <AppBox component={motion.div} variants={itemV}>
          <AppBox component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '9px', borderRadius: '999px', px: 2, py: '7px', mb: 3.5, fontSize: '0.85rem', color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <AppBox component="span" sx={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', animation: 'statusping 2s ease-out infinite' }} />
            Available for new projects
          </AppBox>
        </AppBox>

        <Heading component={motion.h1} variants={itemV} sx={{ fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', fontSize: 'clamp(2.6rem,7vw,5rem)' }}>
          Hi, I'm <GradText>{PROFILE.name}</GradText>
        </Heading>

        <Heading component={motion.h2} variants={itemV} sx={{ mt: 1.25, minHeight: '1.3em', letterSpacing: '-0.02em', fontSize: 'clamp(1.5rem,4vw,2.6rem)' }}>
          <GradText>{typed}</GradText>
          <AppBox component="span" sx={{ display: 'inline-block', width: '3px', height: '1em', ml: '4px', verticalAlign: '-0.12em', background: 'var(--accent-2)', animation: 'blink 1s step-end infinite' }} />
        </Heading>

        <AppText component={motion.p} variants={itemV} sx={{ mx: 'auto', mt: '26px', maxWidth: 620, fontSize: '1.15rem' }}>
          {PROFILE.tagline}
        </AppText>

        <AppBox component={motion.div} variants={itemV}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: '38px' }}>
            <GradButton href="#work">View my work</GradButton>
            <GhostButton href="#contact">Get in touch</GhostButton>
          </Stack>
        </AppBox>

        <AppBox component={motion.div} variants={itemV}>
          <Stack direction="row" spacing={{ xs: 3.75, sm: 6 }} justifyContent="center" flexWrap="wrap" sx={{ mt: 8 }}>
            {PROFILE.stats.map((s) => (
              <AppBox key={s.label} sx={{ display: 'flex', flexDirection: 'column' }}>
                <GradText sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '2.2rem', fontWeight: 700 }}>
                  <Counter value={s.value} />
                </GradText>
                <AppBox component="span" sx={{ mt: '2px', fontSize: '0.85rem', color: 'var(--muted)' }}>{s.label}</AppBox>
              </AppBox>
            ))}
          </Stack>
        </AppBox>
      </AppBox>

      <AppBox component="a" href="#about" aria-label="Scroll down" sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <AppBox sx={{ position: 'relative', display: 'block', width: 24, height: 40, borderRadius: '14px', border: '2px solid var(--border)' }}>
          <AppBox component="span" sx={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', width: 4, height: 8, borderRadius: '2px', background: 'var(--accent-2)', animation: 'scrolldot 1.8s ease-in-out infinite' }} />
        </AppBox>
      </AppBox>
    </AppBox>
  );
}

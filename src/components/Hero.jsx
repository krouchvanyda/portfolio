import { useEffect, useRef } from 'react';
import { PROFILE } from '../data';
import useTypewriter from '../hooks/useTypewriter';
import { gsap, isTest, prefersReduced } from '../lib/gsap';

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const blobsRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || isTest || prefersReduced()) return undefined;

    const ctx = gsap.context(() => {
      // Entrance stagger
      gsap.from(contentRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1,
      });

      // Count-up on the stat numbers
      contentRef.current.querySelectorAll('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.fromTo(
          obj,
          { v: 0 },
          {
            v: to,
            duration: 1.4,
            ease: 'power3.out',
            delay: 0.5,
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          }
        );
      });

      // Scroll parallax — blobs drift down, content lifts, both fade out
      const scroll = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 };
      gsap.to(blobsRef.current, { yPercent: 35, ease: 'none', scrollTrigger: scroll });
      gsap.to(contentRef.current, { yPercent: -8, opacity: 0.6, ease: 'none', scrollTrigger: scroll });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-[120px] text-center"
    >
      {/* animated blobs */}
      <div ref={blobsRef} className="absolute inset-0 z-0" aria-hidden="true">
        <span className="absolute -left-[60px] -top-[120px] h-[460px] w-[460px] rounded-full bg-[#6366f1] opacity-[var(--blob-opacity)] blur-[70px] animate-floata" />
        <span className="absolute -right-[80px] top-[20%] h-[380px] w-[380px] rounded-full bg-[#22d3ee] opacity-[var(--blob-opacity)] blur-[70px] animate-floatb" />
        <span className="absolute -bottom-[100px] left-[30%] h-[340px] w-[340px] rounded-full bg-[#ec4899] opacity-[var(--blob-opacity)] blur-[70px] animate-floatc" />
      </div>
      <div className="hero-grid" aria-hidden="true" />

      <div ref={contentRef} className="relative z-[2] max-w-[820px]">
        <p className="surface mb-7 inline-flex items-center gap-[9px] rounded-full px-4 py-[7px] text-[0.85rem] text-muted">
          <span className="h-2 w-2 rounded-full bg-[#34d399] animate-statusping" /> Available for new projects
        </p>

        <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-bold">
          Hi, I'm <span className="text-grad">{PROFILE.name}</span>
        </h1>

        <h2 className="mt-2.5 min-h-[1.3em] text-[clamp(1.5rem,4vw,2.6rem)] font-semibold">
          <span className="text-grad">{typed}</span>
          <span className="ml-1 inline-block h-[1em] w-[3px] align-[-0.12em] bg-accent2 animate-blink" />
        </h2>

        <p className="mx-auto mt-[26px] max-w-[620px] text-[1.15rem] text-muted">{PROFILE.tagline}</p>

        <div className="mt-[38px] flex flex-wrap justify-center gap-4 max-[560px]:flex-col">
          <a href="#work" className="btn max-[560px]:justify-center">View my work</a>
          <a href="#contact" className="btn-ghost max-[560px]:justify-center">Get in touch</a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-12 max-[560px]:gap-[30px]">
          {PROFILE.stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="text-grad font-display text-[2.2rem] font-bold"
                data-count={parseInt(s.value, 10)}
                data-suffix={s.value.replace(/[0-9]/g, '')}
              >
                {s.value}
              </span>
              <span className="mt-0.5 text-[0.85rem] text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-[30px] left-1/2 z-[2] -translate-x-1/2"
        aria-label="Scroll down"
      >
        <span className="relative block h-10 w-6 rounded-[14px] border-2 border-[var(--border)]">
          <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded bg-accent2 animate-scrolldot" />
        </span>
      </a>
    </section>
  );
}

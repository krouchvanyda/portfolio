import { useEffect, useRef } from 'react';
import { SKILLS } from '../data';
import { gsap, isTest, prefersReduced } from '../lib/gsap';

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const bar = barRef.current;
    if (!el) return undefined;
    if (isTest || prefersReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      if (bar) bar.style.width = `${skill.level}%`;
      return undefined;
    }
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top 90%', once: true };
      gsap.fromTo(
        el,
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: index * 0.12, scrollTrigger: st }
      );
      gsap.fromTo(
        bar,
        { width: '0%' },
        { width: `${skill.level}%`, duration: 1.2, ease: 'power3.out', delay: index * 0.12 + 0.2, scrollTrigger: st }
      );
    }, el);
    return () => ctx.revert();
  }, [index, skill.level]);

  return (
    <article
      ref={ref}
      className="surface group relative overflow-hidden rounded-[20px] p-8 opacity-0 transition-[transform,border-color,box-shadow] duration-[400ms] hover:-translate-y-2 hover:border-[rgba(129,140,248,0.4)] hover:shadow-[0_24px_60px_-30px_rgba(99,102,241,0.6)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 grid h-[60px] w-[60px] place-items-center rounded-2xl border border-[var(--border)] bg-soft text-[1.8rem]">
          {skill.icon}
        </div>
        <h3 className="text-[1.25rem] font-semibold">{skill.title}</h3>
        <p className="mt-3 min-h-[72px] text-[0.95rem] text-muted">{skill.blurb}</p>

        <div className="mt-5 h-[7px] overflow-hidden rounded-full border border-[var(--border)] bg-soft">
          <span ref={barRef} className="block h-full rounded-full bg-[image:var(--grad)]" style={{ width: 0 }} />
        </div>
        <span className="mt-1.5 block text-right text-[0.8rem] font-semibold text-muted">{skill.level}%</span>

        <div className="mt-[18px] flex flex-wrap gap-2">
          {skill.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-[110px] max-[560px]:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="mx-auto mb-[60px] max-w-[620px] text-center">
          <p className="eyebrow mb-3.5">What I do</p>
          <h2 className="sec-title">
            My <span className="text-grad">core skills</span>
          </h2>
          <p className="sec-sub">
            Three platforms, one obsession — shipping fast, beautiful, reliable software.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

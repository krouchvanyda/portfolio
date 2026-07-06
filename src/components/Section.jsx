import { useEffect, useRef } from 'react';
import { gsap, isTest, prefersReduced } from '../lib/gsap';

// Scroll-triggered reveal powered by GSAP ScrollTrigger.
export default function Reveal({ children, className = '', as: Tag = 'div', delay = 0, y = 38 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (isTest || prefersReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: delay / 1000,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

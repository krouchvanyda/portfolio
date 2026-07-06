import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, input, textarea, .skill-card, .project, .theme-toggle';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    // Only on precise-pointer, hover-capable devices, and not with reduced motion.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    document.body.classList.add('has-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (spotRef.current) {
        spotRef.current.style.setProperty('--mx', `${mx}px`);
        spotRef.current.style.setProperty('--my', `${my}px`);
      }
    };

    const over = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        ringRef.current?.classList.add('cursor__ring--hover');
      }
    };
    const out = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        ringRef.current?.classList.remove('cursor__ring--hover');
      }
    };
    const down = () => ringRef.current?.classList.add('cursor__ring--down');
    const up = () => ringRef.current?.classList.remove('cursor__ring--down');

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mouseout', out, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={spotRef} className="cursor-spotlight" aria-hidden="true" />
      <div ref={ringRef} className="cursor__ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor__dot" aria-hidden="true" />
    </>
  );
}

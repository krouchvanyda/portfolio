import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme';

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
    <button
      className="inline-flex cursor-pointer items-center border-0 bg-transparent p-0"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="surface flex h-7 w-[52px] items-center rounded-full p-[3px]">
        <span
          className={`grid h-[22px] w-[22px] place-items-center rounded-full bg-soft text-[0.8rem] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark ? '' : 'translate-x-[24px] rotate-[360deg]'
          }`}
        >
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}

function NavLink({ href, label, active, onClick, big }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative font-medium transition-colors hover:text-ink ${
        active ? 'text-ink' : 'text-muted'
      } ${big ? 'border-b border-[var(--border)] py-3 text-[1.15rem]' : 'text-[0.95rem]'}`}
    >
      {label}
      {!big && (
        <span
          className={`absolute -bottom-1.5 left-0 h-0.5 rounded bg-[image:var(--grad)] transition-all duration-300 group-hover:w-full ${
            active ? 'w-full' : 'w-0'
          }`}
        />
      )}
    </a>
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
    <header className="fixed inset-x-0 top-0 z-[100] animate-navdrop">
      <div
        className={`mx-auto flex items-center justify-between border transition-[max-width,margin,padding,background,border-color,box-shadow,border-radius] duration-500 ${
          scrolled
            ? 'mt-3 max-w-[1050px] rounded-full border-[var(--border)] bg-[var(--nav-bg)] px-4 py-[11px] shadow-[0_14px_44px_-20px_rgba(2,6,23,0.55)] backdrop-blur-xl md:pl-[22px]'
            : 'max-w-[1160px] rounded-none border-transparent px-6 py-[18px]'
        }`}
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2 font-display text-[1.3rem] font-bold transition-transform hover:-translate-y-px"
        >
          <span className="h-[11px] w-[11px] rounded-full bg-[image:var(--grad)] shadow-[0_0_14px_2px_rgba(99,102,241,0.8)] animate-logopulse group-hover:shadow-[0_0_18px_4px_rgba(99,102,241,0.9)]" />
          dalia<span className="text-grad">.dev</span>
        </a>

        <div className="flex items-center gap-3.5">
          <nav className="hidden items-center gap-[30px] md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
            ))}
            <a href="#contact" className="btn !px-[18px] !py-[9px] !text-[0.85rem]">
              Let's talk
            </a>
          </nav>

          <ThemeToggle />

          <button
            className="flex flex-col gap-[5px] p-1.5 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-0.5 w-[26px] rounded bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-[26px] rounded bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-[26px] rounded bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <nav
        className={`fixed inset-y-0 right-0 flex w-[min(78vw,320px)] flex-col justify-center gap-6 border-l border-[var(--border)] bg-[var(--overlay-bg)] p-10 backdrop-blur-xl transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {LINKS.map((l) => (
          <NavLink key={l.href} {...l} big active={activeId === l.href.slice(1)} onClick={() => setOpen(false)} />
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="btn mt-4 justify-center">
          Let's talk
        </a>
      </nav>
    </header>
  );
}

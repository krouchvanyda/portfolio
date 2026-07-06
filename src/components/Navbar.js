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
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={`theme-toggle__track ${isDark ? '' : 'theme-toggle__track--light'}`}>
        <span className="theme-toggle__thumb">{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-dot" />
          dalia<span className="grad-text">.dev</span>
        </a>

        <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--sm nav__cta" onClick={() => setOpen(false)}>
            Let's talk
          </a>
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <button
            className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

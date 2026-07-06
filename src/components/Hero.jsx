import { PROFILE } from '../data';
import useTypewriter from '../hooks/useTypewriter';

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles);

  return (
    <section id="home" className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow fade-up">
          <span className="hero__status" /> Available for new projects
        </p>

        <h1 className="hero__title fade-up delay-1">
          Hi, I'm <span className="grad-text">{PROFILE.name}</span>
        </h1>

        <h2 className="hero__role fade-up delay-2">
          <span className="grad-text">{typed}</span>
          <span className="hero__caret" />
        </h2>

        <p className="hero__tagline fade-up delay-3">{PROFILE.tagline}</p>

        <div className="hero__actions fade-up delay-4">
          <a href="#work" className="btn">View my work</a>
          <a href="#contact" className="btn btn--ghost">Get in touch</a>
        </div>

        <div className="hero__stats fade-up delay-5">
          {PROFILE.stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value grad-text">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__mouse"><span /></span>
      </a>
    </section>
  );
}

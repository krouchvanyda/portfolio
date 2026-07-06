import { PROFILE } from '../data';
import Reveal from './Section';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <Reveal className="about__visual">
          <div className="about__card">
            <div className="about__avatar">👩‍💻</div>
            <div className="about__glow" />
            <div className="about__badges">
              <span className="chip">React Native</span>
              <span className="chip">Flutter</span>
              <span className="chip">ReactJS</span>
            </div>
          </div>
        </Reveal>

        <div className="about__text">
          <Reveal>
            <p className="section__eyebrow">About me</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section__title">
              Building products people <span className="grad-text">love to use</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="about__body">
              I'm a senior developer specialising in mobile and frontend engineering. I turn ideas
              into polished, production-ready apps — with a strong focus on clean architecture,
              performance, and delightful micro-interactions.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="about__body">
              Whether it's a cross-platform app in React Native or Flutter, or a responsive web app
              in ReactJS, I care about the details that make software feel effortless.
            </p>
          </Reveal>
          <Reveal delay={320} className="about__meta">
            <div>
              <span className="about__meta-label">Location</span>
              <span className="about__meta-value">{PROFILE.location}</span>
            </div>
            <div>
              <span className="about__meta-label">Focus</span>
              <span className="about__meta-value">Mobile · Frontend · UI/UX</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

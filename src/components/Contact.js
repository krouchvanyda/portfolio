import { PROFILE } from '../data';
import Reveal from './Section';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="contact">
          <div className="contact__glow" />
          <p className="section__eyebrow">Get in touch</p>
          <h2 className="section__title">
            Let's build something <span className="grad-text">amazing</span>
          </h2>
          <p className="section__sub">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <a href={`mailto:${PROFILE.email}`} className="btn btn--lg">
            {PROFILE.email}
          </a>

          <div className="contact__socials">
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={PROFILE.socials.dribbble} target="_blank" rel="noreferrer">Dribbble</a>
          </div>
        </Reveal>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {PROFILE.name}. Crafted with React.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  );
}

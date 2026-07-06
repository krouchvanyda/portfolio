import { SKILLS } from '../data';
import useReveal from '../hooks/useReveal';
import Reveal from './Section';

function SkillCard({ skill, index }) {
  const [ref, visible] = useReveal();
  return (
    <article
      ref={ref}
      className={`skill-card reveal ${visible ? 'reveal--in' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="skill-card__icon">{skill.icon}</div>
      <h3 className="skill-card__title">{skill.title}</h3>
      <p className="skill-card__blurb">{skill.blurb}</p>

      <div className="skill-card__bar">
        <span
          className="skill-card__fill"
          style={{ width: visible ? `${skill.level}%` : '0%' }}
        />
      </div>
      <span className="skill-card__level">{skill.level}%</span>

      <div className="skill-card__tags">
        {skill.tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="section__eyebrow">What I do</p>
          <h2 className="section__title">
            My <span className="grad-text">core skills</span>
          </h2>
          <p className="section__sub">
            Three platforms, one obsession — shipping fast, beautiful, reliable software.
          </p>
        </Reveal>

        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

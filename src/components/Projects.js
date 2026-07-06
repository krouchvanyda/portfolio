import { PROJECTS } from '../data';
import useReveal from '../hooks/useReveal';
import Reveal from './Section';

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  return (
    <article
      ref={ref}
      className={`project reveal ${visible ? 'reveal--in' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="project__thumb" style={{ background: project.accent }}>
        <span className="project__platform">{project.platform}</span>
        <span className="project__shine" />
      </div>
      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__desc">{project.description}</p>
        <div className="project__tags">
          {project.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <span className="project__link">
          View case study <span className="project__arrow">→</span>
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="section__eyebrow">Selected work</p>
          <h2 className="section__title">
            Featured <span className="grad-text">projects</span>
          </h2>
          <p className="section__sub">
            A few things I've built across mobile and web. Every project shipped to real users.
          </p>
        </Reveal>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

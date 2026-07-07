import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import Reveal from './Section';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 100}>
      <motion.article
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="surface group relative flex h-full flex-col overflow-hidden rounded-[20px] transition-[border-color,box-shadow] duration-[400ms] hover:border-[rgba(129,140,248,0.4)] hover:shadow-[0_30px_70px_-35px_rgba(99,102,241,0.7)]"
      >
        <div className="relative flex h-[170px] items-end overflow-hidden p-[18px]" style={{ background: project.accent }}>
          <span className="relative z-[2] rounded-full bg-black/30 px-3 py-[5px] text-[0.78rem] font-semibold text-white backdrop-blur-md">
            {project.platform}
          </span>
          <span className="pointer-events-none absolute left-[-60%] top-0 h-full w-[40%] -skew-x-[20deg] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.4),transparent)] transition-[left] duration-700 group-hover:left-[130%]" />
        </div>
        <div className="p-6">
          <h3 className="text-[1.3rem] font-semibold">{project.title}</h3>
          <p className="mt-2.5 text-[0.95rem] text-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-accent2">
            View case study
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative py-[110px] max-[560px]:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <Reveal className="mx-auto mb-[60px] max-w-[620px] text-center">
          <p className="eyebrow mb-3.5">Selected work</p>
          <h2 className="sec-title">
            Featured <span className="text-grad">projects</span>
          </h2>
          <p className="sec-sub">
            A few things I've built across mobile and web. Every project shipped to real users.
          </p>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[26px]">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

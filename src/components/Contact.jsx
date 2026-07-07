import { motion } from 'framer-motion';
import { PROFILE } from '../data';
import Reveal from './Section';

const spring = { type: 'spring', stiffness: 400, damping: 20 };

export default function Contact() {
  return (
    <section id="contact" className="relative py-[110px] max-[560px]:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-soft px-10 py-20 text-center max-[560px]:px-[22px] max-[560px]:py-14">
          <div className="absolute -top-[40%] left-1/2 h-full w-[60%] -translate-x-1/2 bg-[image:var(--grad)] opacity-[0.28] blur-[120px]" />
          <p className="eyebrow relative z-[2]">Get in touch</p>
          <h2 className="sec-title relative z-[2]">
            Let's build something <span className="text-grad">amazing</span>
          </h2>
          <p className="sec-sub relative z-[2]">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <motion.a
            href={`mailto:${PROFILE.email}`}
            className="btn relative z-[2] mt-[34px] !px-10 !py-[18px] !text-[1.05rem]"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={spring}
          >
            {PROFILE.email}
          </motion.a>

          <div className="relative z-[2] mt-[34px] flex justify-center gap-7">
            {[
              ['GitHub', PROFILE.socials.github],
              ['LinkedIn', PROFILE.socials.linkedin],
              ['Dribbble', PROFILE.socials.dribbble],
            ].map(([label, href]) => (
              <motion.a
                key={label}
                className="font-medium text-muted transition-colors hover:text-ink"
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                transition={spring}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-[70px] flex max-w-[1160px] flex-wrap items-center justify-center gap-3 border-t border-[var(--border)] px-6 pt-[30px] text-center text-[0.88rem] text-muted">
        <span>© {new Date().getFullYear()} {PROFILE.name}. Crafted with React.</span>
      </footer>
    </section>
  );
}

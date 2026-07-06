import { PROFILE } from '../data';
import Reveal from './Section';

export default function About() {
  return (
    <section id="about" className="relative py-[110px] max-[560px]:py-20">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[70px]">
        <Reveal>
          <div className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[28px] border border-[var(--border)] bg-soft lg:max-w-none">
            <div className="absolute h-[70%] w-[70%] rounded-full bg-[image:var(--grad)] opacity-40 blur-[60px] animate-spinslow" />
            <div className="relative z-[2] text-[6rem]">👩‍💻</div>
            <div className="absolute bottom-5 z-[2] flex flex-wrap justify-center gap-2 px-5">
              <span className="chip !bg-[var(--chip-solid)] backdrop-blur-md">React Native</span>
              <span className="chip !bg-[var(--chip-solid)] backdrop-blur-md">Flutter</span>
              <span className="chip !bg-[var(--chip-solid)] backdrop-blur-md">ReactJS</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-3.5">About me</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-title">
              Building products people <span className="text-grad">love to use</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-[18px] text-[1.05rem] text-muted">
              I'm a senior developer specialising in mobile and frontend engineering. I turn ideas
              into polished, production-ready apps — with a strong focus on clean architecture,
              performance, and delightful micro-interactions.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-[18px] text-[1.05rem] text-muted">
              Whether it's a cross-platform app in React Native or Flutter, or a responsive web app
              in ReactJS, I care about the details that make software feel effortless.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-[30px] flex flex-wrap gap-[50px]">
              <div>
                <span className="mb-1 block text-[0.78rem] uppercase tracking-[0.15em] text-accent2">Location</span>
                <span className="font-semibold">{PROFILE.location}</span>
              </div>
              <div>
                <span className="mb-1 block text-[0.78rem] uppercase tracking-[0.15em] text-accent2">Focus</span>
                <span className="font-semibold">Mobile · Frontend · UI/UX</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

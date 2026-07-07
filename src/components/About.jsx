import { PROFILE } from '../data';
import Reveal from './Section';
import { AppBox, AppIcon, AppText, Eyebrow, GradText, Panel, Section, SectionTitle, Tag } from '../theme/ui';

function Meta({ label, value }) {
  return (
    <AppBox>
      <AppBox component="span" sx={{ display: 'block', mb: 0.5, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-2)' }}>
        {label}
      </AppBox>
      <AppBox component="span" sx={{ fontWeight: 600 }}>{value}</AppBox>
    </AppBox>
  );
}

export default function About() {
  return (
    <Section id="about">
      <AppBox
        sx={{
          maxWidth: '1160px',
          mx: 'auto',
          px: '24px',
          display: 'grid',
          alignItems: 'center',
          gap: { xs: '40px', lg: '70px' },
          gridTemplateColumns: { xs: '1fr', lg: '0.85fr 1.15fr' },
        }}
      >
        <Reveal>
          <Panel
            sx={{
              position: 'relative',
              aspectRatio: '1',
              width: '100%',
              maxWidth: { xs: 360, lg: 'none' },
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '28px',
            }}
          >
            <AppBox sx={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '50%', background: 'var(--grad)', filter: 'blur(60px)', opacity: 0.4, animation: 'spinslow 18s linear infinite' }} />
            <AppIcon size="6rem" sx={{ position: 'relative', zIndex: 2 }}>👩‍💻</AppIcon>
            <AppBox sx={{ position: 'absolute', bottom: 20, zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, px: 2.5 }}>
              {['React Native', 'Flutter', 'ReactJS'].map((t) => (
                <Tag key={t} sx={{ background: 'var(--chip-solid)', backdropFilter: 'blur(8px)' }}>{t}</Tag>
              ))}
            </AppBox>
          </Panel>
        </Reveal>

        <AppBox>
          <Reveal><Eyebrow sx={{ mb: 1.75 }}>About me</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <SectionTitle>Building products people <GradText>love to use</GradText></SectionTitle>
          </Reveal>
          <Reveal delay={0.16}>
            <AppText sx={{ mt: '18px', fontSize: '1.05rem' }}>
              I'm a senior developer specialising in mobile and frontend engineering. I turn ideas into
              polished, production-ready apps — with a strong focus on clean architecture, performance,
              and delightful micro-interactions.
            </AppText>
          </Reveal>
          <Reveal delay={0.24}>
            <AppText sx={{ mt: '18px', fontSize: '1.05rem' }}>
              Whether it's a cross-platform app in React Native or Flutter, or a responsive web app in
              ReactJS, I care about the details that make software feel effortless.
            </AppText>
          </Reveal>
          <Reveal delay={0.32} sx={{ mt: '30px', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
            <Meta label="Location" value={PROFILE.location} />
            <Meta label="Focus" value="Mobile · Frontend · UI/UX" />
          </Reveal>
        </AppBox>
      </AppBox>
    </Section>
  );
}

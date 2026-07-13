import { PROJECTS } from '../data';
import Reveal from './Section';
import { AppBox, AppIcon, AppText, Container, Eyebrow, GradText, Heading, HoverCard, Section, SectionSub, SectionTitle, Tag } from '../theme/ui';
import { AppColors } from '../theme/colors';

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <HoverCard
        tap={0.98}
        hoverShadow="0 30px 70px -35px rgba(99,102,241,0.7)"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '&:hover .shine': { left: '130%' },
          '&:hover .arrow': { transform: 'translateX(6px)' },
        }}
      >
        <AppBox sx={{ position: 'relative', height: 170, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', p: '18px', background: project.accent }}>
          <AppBox component="span" sx={{ position: 'relative', zIndex: 2, borderRadius: '999px', px: 1.5, py: '5px', fontSize: '0.78rem', fontWeight: 600, color: '#fff', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}>
            {project.platform}
          </AppBox>
          <AppBox className="shine" sx={{ position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%', transform: 'skewX(-20deg)', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent)', transition: 'left .7s ease' }} />
        </AppBox>
        <AppBox sx={{ p: 3 }}>
          <Heading sx={{ fontSize: '1.3rem' }}>{project.title}</Heading>
          <AppText sx={{ mt: 1.25 }}>{project.description}</AppText>
          <AppBox sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </AppBox>
          <AppBox component="span" sx={{ mt: 2.5, display: 'inline-flex', alignItems: 'center', gap: 1, fontSize: '0.92rem', fontWeight: 600, color: AppColors.accent2 }}>
            View case study
            <AppIcon className="arrow" sx={{ transition: 'transform .3s ease' }}>→</AppIcon>
          </AppBox>
        </AppBox>
      </HoverCard>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="work">
      <Container>
        <Reveal sx={{ maxWidth: 620, mx: 'auto', mb: '60px', textAlign: 'center' }}>
          <Eyebrow sx={{ mb: 1.75 }}>Selected work</Eyebrow>
          <SectionTitle>Featured <GradText>projects</GradText></SectionTitle>
          <SectionSub>A few things I've built across mobile and web. Every project shipped to real users.</SectionSub>
        </Reveal>

        <AppBox sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '26px' }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </AppBox>
      </Container>
    </Section>
  );
}

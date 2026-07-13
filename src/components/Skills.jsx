import { motion } from 'framer-motion';
import { SKILLS } from '../data';
import Reveal from './Section';
import { AppBox, AppIcon, AppText, Container, Eyebrow, GradText, Heading, HoverCard, Panel, Section, SectionSub, SectionTitle, Tag } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';
import { AppColors } from '../theme/colors';

function SkillCard({ skill, index }) {
  return (
    <Reveal delay={index * 0.12}>
      <HoverCard sx={{ p: 4, '&:hover .skill-glow': { opacity: 1 } }}>
        <AppBox className="skill-glow" sx={{ pointerEvents: 'none', position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .4s', background: `radial-gradient(400px circle at 50% 0%, ${AppColors.spotlight}, transparent 60%)` }} />
        <AppBox sx={{ position: 'relative' }}>
          <Panel sx={{ mb: 2.5, width: 60, height: 60, display: 'grid', placeItems: 'center', borderRadius: '16px' }}>
            <AppIcon size="1.8rem">{skill.icon}</AppIcon>
          </Panel>
          <Heading sx={{ fontSize: '1.25rem' }}>{skill.title}</Heading>
          <AppText sx={{ mt: 1.5, minHeight: 72 }}>{skill.blurb}</AppText>

          <Panel sx={{ mt: 2.5, height: 7, overflow: 'hidden', borderRadius: '999px' }}>
            <AppBox
              component={motion.div}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: AppAnimationMotion.ease, delay: 0.2 }}
              sx={{ height: '100%', borderRadius: '999px', background: AppColors.grad }}
            />
          </Panel>
          <AppBox component="span" sx={{ mt: 0.75, display: 'block', textAlign: 'right', fontSize: '0.8rem', fontWeight: 600, color: AppColors.muted }}>{skill.level}%</AppBox>

          <AppBox sx={{ mt: '18px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skill.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </AppBox>
        </AppBox>
      </HoverCard>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Reveal sx={{ maxWidth: 620, mx: 'auto', mb: '60px', textAlign: 'center' }}>
          <Eyebrow sx={{ mb: 1.75 }}>What I do</Eyebrow>
          <SectionTitle>My <GradText>core skills</GradText></SectionTitle>
          <SectionSub>Three platforms, one obsession — shipping fast, beautiful, reliable software.</SectionSub>
        </Reveal>

        <AppBox sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} />
          ))}
        </AppBox>
      </Container>
    </Section>
  );
}

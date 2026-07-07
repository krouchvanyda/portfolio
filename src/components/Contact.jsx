import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { PROFILE } from '../data';
import Reveal from './Section';
import { AppBox, Container, Eyebrow, GradButton, GradText, Section, SectionSub, SectionTitle } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Reveal
          sx={{
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            borderRadius: '32px',
            px: { xs: '22px', sm: 5 },
            py: { xs: '56px', sm: 10 },
            background: 'var(--bg-soft)',
            border: '1px solid var(--border)',
          }}
        >
          <AppBox sx={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '100%', background: 'var(--grad)', filter: 'blur(120px)', opacity: 0.28 }} />
          <AppBox sx={{ position: 'relative', zIndex: 2 }}>
            <Eyebrow>Get in touch</Eyebrow>
            <SectionTitle sx={{ mt: 1 }}>Let's build something <GradText>amazing</GradText></SectionTitle>
            <SectionSub sx={{ mx: 'auto', maxWidth: 520 }}>
              Have a project in mind or just want to say hi? My inbox is always open.
            </SectionSub>

            <GradButton href={`mailto:${PROFILE.email}`} sx={{ mt: '34px', px: 5, py: '18px', fontSize: '1.05rem' }}>
              {PROFILE.email}
            </GradButton>

            <Stack direction="row" spacing={3.5} justifyContent="center" sx={{ mt: '34px' }}>
              {[
                ['GitHub', PROFILE.socials.github],
                ['LinkedIn', PROFILE.socials.linkedin],
                ['Dribbble', PROFILE.socials.dribbble],
              ].map(([label, href]) => (
                <AppBox
                  key={label}
                  component={motion.a}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  transition={AppAnimationMotion.spring}
                  sx={{ fontWeight: 500, color: 'var(--muted)', transition: 'color .2s', '&:hover': { color: 'var(--text)' } }}
                >
                  {label}
                </AppBox>
              ))}
            </Stack>
          </AppBox>
        </Reveal>
      </Container>

      <AppBox component="footer" sx={{ maxWidth: '1160px', mx: 'auto', mt: '70px', px: '24px', pt: '30px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem' }}>
        <span>© {new Date().getFullYear()} {PROFILE.name}. Crafted with React.</span>
      </AppBox>
    </Section>
  );
}

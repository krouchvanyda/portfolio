import { motion } from 'framer-motion';
import { AppBox } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';

// Scroll-triggered reveal powered by Framer Motion (whileInView).
export default function Reveal({ children, sx, delay = 0, component = 'div' }) {
  return (
    <AppBox
      component={motion[component] || motion.div}
      sx={sx}
      initial={AppAnimationMotion.reveal.hidden}
      whileInView={AppAnimationMotion.reveal.show}
      // `once` is intentionally omitted (defaults to false) so the reveal REPLAYS
      // every time the element scrolls back into view. Add `once: true` to make it
      // animate a single time and never re-trigger.
      // `margin` shrinks the viewport 80px at the bottom, so the reveal starts
      // slightly before the element is fully on screen.
      //viewport={{ once: true, margin: '0px 0px -80px 0px' }} // it work only first time( once: true,)
      viewport={{ margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, ease: AppAnimationMotion.ease, delay }}
    >
      {children}
    </AppBox>
  );
}

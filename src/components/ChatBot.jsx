import { useEffect, useRef, useState } from 'react';
import { InputBase } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { PROFILE, SKILLS, PROJECTS } from '../data';
import { AppBox, AppIcon } from '../theme/ui';
import { AppAnimationMotion } from '../theme/motion';

const WELCOME = {
  role: 'bot',
  content:
    "Hi! 👋 I'm Dalia's assistant. Ask me about her skills, projects, experience, or how to get in touch.",
};

const SUGGESTIONS = ['What can Dalia build?', 'Her mobile work', 'See projects', 'How to hire her'];

// Simple keyword matcher — grounded in the site's own data.
function getAnswer(raw) {
  const q = raw.toLowerCase();
  const has = (...words) => words.some((w) => q.includes(w));

  if (has('hi', 'hello', 'hey', 'yo ')) return "Hey there! 😊 Ask me about Dalia's skills, projects, experience, or how to reach her.";
  if (has('thank', 'thanks', 'cheers')) return "You're welcome! Anything else you'd like to know about Dalia?";
  if (has('react native', 'reactnative', 'rn ')) { const s = SKILLS[0]; return `React Native is one of Dalia's core skills. ${s.blurb} Tools: ${s.tags.join(', ')}.`; }
  if (has('flutter', 'dart')) { const s = SKILLS[1]; return `${s.blurb} Tools: ${s.tags.join(', ')}.`; }
  if (has('react', 'frontend', 'web', 'next')) { const s = SKILLS[2]; return `On the web, ${s.blurb} Tools: ${s.tags.join(', ')}.`; }
  if (has('mobile', 'app', 'ios', 'android')) return 'Dalia builds cross-platform mobile apps in React Native and Flutter — native performance with smooth, considered animation.';
  if (has('skill', 'tech', 'stack', 'tool', 'build', 'do you', 'she do', 'expert')) return `Dalia specialises in three areas: ${SKILLS.map((s) => s.title.replace(/^.*— /, '')).join(', ')}. Ask about any of them for detail!`;
  if (has('project', 'work', 'portfolio', 'built', 'case')) { const list = PROJECTS.map((p) => `• ${p.title} (${p.platform})`).join('\n'); return `Here are some things Dalia has shipped:\n${list}\nScroll to the Work section to see more.`; }
  if (has('experience', 'year', 'senior', 'long', 'background')) return `Dalia is a ${PROFILE.role} with ${PROFILE.stats[0].value} years of experience and ${PROFILE.stats[1].value} projects shipped.`;
  if (has('animation', 'motion', 'smooth', 'fps', '60')) return "Motion is Dalia's thing — she cares about smooth 60fps animations and micro-interactions that make apps feel alive.";
  if (has('hire', 'contact', 'email', 'reach', 'available', 'work with', 'get in touch', 'talk')) return `Dalia is ${PROFILE.location.toLowerCase()} and open to new projects. Reach her at ${PROFILE.email} — or use the Contact section below.`;
  if (has('location', 'where', 'remote', 'based', 'country')) return `Dalia works remotely — ${PROFILE.location}.`;
  if (has('name', 'who')) return `This is the portfolio of ${PROFILE.name}, a ${PROFILE.role}.`;
  return `I'm not sure about that one 🤔 — try asking about her skills, projects, experience, or contact. You can also email her directly at ${PROFILE.email}.`;
}

const bubbleBase = {
  maxWidth: '84%',
  borderRadius: '16px',
  px: 1.75,
  py: 1.25,
  fontSize: '0.9rem',
  lineHeight: 1.5,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo?.({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text) => {
    const t = text.trim();
    if (!t || typing) return;
    setMessages((m) => [...m, { role: 'user', content: t }]);
    setInput('');
    setTyping(true);
    const answer = getAnswer(t);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'bot', content: answer }]);
    }, 600);
  };

  return (
    <>
      <AppBox
        component={motion.button}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        animate={{ rotate: open ? 90 : 0 }}
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={AppAnimationMotion.spring}
        sx={{ position: 'fixed', bottom: 86, right: 28, zIndex: 95, width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'var(--grad)', boxShadow: '0 14px 34px -10px rgba(99,102,241,0.8)' }}
      >
        <AppIcon size="1.15rem">{open ? '✕' : '💬'}</AppIcon>
        {!open && <AppBox component="span" sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--accent-1)', animation: 'chatpulse 2s ease-out infinite' }} />}
      </AppBox>

      <AnimatePresence>
        {open && (
          <AppBox
            component={motion.div}
            key="chat-panel"
            role="dialog"
            aria-label="Dalia's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={AppAnimationMotion.springPanel}
            sx={{ position: 'fixed', bottom: 146, right: 28, zIndex: 95, display: 'flex', flexDirection: 'column', width: 'min(90vw, 320px)', height: 'min(66vh, 470px)', overflow: 'hidden', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg-soft)', boxShadow: '0 30px 70px -25px rgba(0,0,0,0.6)' }}
          >
            <AppBox sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: '15px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
              <AppBox sx={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: '12px', background: 'var(--grad)', fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--btn-text)' }}>DS</AppBox>
              <AppBox>
                <AppBox sx={{ fontSize: '0.95rem', fontWeight: 600 }}>Dalia's Assistant</AppBox>
                <AppBox sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.75rem', color: 'var(--muted)' }}>
                  <AppBox component="span" sx={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399' }} /> Online
                </AppBox>
              </AppBox>
              <AppBox component="button" onClick={() => setOpen(false)} aria-label="Close" sx={{ ml: 'auto', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '8px', p: 0.75, color: 'var(--muted)', transition: 'color .2s, background .2s', '&:hover': { background: 'var(--surface)', color: 'var(--text)' } }}>✕</AppBox>
            </AppBox>

            <AppBox ref={bodyRef} sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {messages.map((m, i) => (
                <AppBox
                  key={i}
                  component={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{
                    ...bubbleBase,
                    ...(m.role === 'user'
                      ? { alignSelf: 'flex-end', borderBottomRightRadius: '5px', background: 'var(--grad)', color: 'var(--btn-text)' }
                      : { alignSelf: 'flex-start', borderBottomLeftRadius: '5px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }),
                  }}
                >
                  {m.content}
                </AppBox>
              ))}

              {typing && (
                <AppBox sx={{ ...bubbleBase, alignSelf: 'flex-start', borderBottomLeftRadius: '5px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <AppBox component="span" sx={{ display: 'inline-flex', gap: 0.5, py: 0.5 }}>
                    {[0, 0.15, 0.3].map((d) => (
                      <AppBox key={d} component="span" sx={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--muted)', animation: 'chatbounce 1.2s infinite ease-in-out', animationDelay: `${d}s` }} />
                    ))}
                  </AppBox>
                </AppBox>
              )}

              {messages.length <= 1 && !typing && (
                <AppBox sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {SUGGESTIONS.map((s) => (
                    <AppBox
                      key={s}
                      component={motion.button}
                      onClick={() => send(s)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={AppAnimationMotion.spring}
                      sx={{ borderRadius: '999px', px: '13px', py: 1, fontSize: '0.8rem', cursor: 'pointer', color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border)', transition: 'border-color .2s', '&:hover': { borderColor: 'rgba(129,140,248,0.5)' } }}
                    >
                      {s}
                    </AppBox>
                  ))}
                </AppBox>
              )}
            </AppBox>

            <AppBox component="form" onSubmit={(e) => { e.preventDefault(); send(input); }} sx={{ display: 'flex', gap: 1, p: 1.5, borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
              <InputBase
                inputRef={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                sx={{ flex: 1, borderRadius: '999px', border: '1px solid var(--border)', background: 'var(--bg-soft)', px: '15px', py: '4px', fontSize: '0.9rem', color: 'var(--text)', transition: 'border-color .2s', '&.Mui-focused': { borderColor: 'rgba(129,140,248,0.6)' } }}
              />
              <AppBox
                component={motion.button}
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                transition={AppAnimationMotion.spring}
                sx={{ width: 40, height: 40, flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'var(--grad)', color: 'var(--btn-text)', '&:disabled': { opacity: 0.45, cursor: 'default' } }}
              >
                ➤
              </AppBox>
            </AppBox>
          </AppBox>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROFILE, SKILLS, PROJECTS } from '../data';

const WELCOME = {
  role: 'bot',
  content:
    "Hi! 👋 I'm Dalia's assistant. Ask me about her skills, projects, experience, or how to get in touch.",
};

const SUGGESTIONS = [
  'What can Dalia build?',
  'Her mobile work',
  'See projects',
  'How to hire her',
];

// Simple keyword matcher — grounded in the site's own data.
function getAnswer(raw) {
  const q = raw.toLowerCase();
  const has = (...words) => words.some((w) => q.includes(w));

  if (has('hi', 'hello', 'hey', 'yo ')) {
    return "Hey there! 😊 Ask me about Dalia's skills, projects, experience, or how to reach her.";
  }
  if (has('thank', 'thanks', 'cheers')) {
    return "You're welcome! Anything else you'd like to know about Dalia?";
  }
  if (has('react native', 'reactnative', 'rn ')) {
    const s = SKILLS[0];
    return `React Native is one of Dalia's core skills. ${s.blurb} Tools: ${s.tags.join(', ')}.`;
  }
  if (has('flutter', 'dart')) {
    const s = SKILLS[1];
    return `${s.blurb} Tools: ${s.tags.join(', ')}.`;
  }
  if (has('react', 'frontend', 'web', 'next')) {
    const s = SKILLS[2];
    return `On the web, ${s.blurb} Tools: ${s.tags.join(', ')}.`;
  }
  if (has('mobile', 'app', 'ios', 'android')) {
    return 'Dalia builds cross-platform mobile apps in React Native and Flutter — native performance with smooth, considered animation.';
  }
  if (has('skill', 'tech', 'stack', 'tool', 'build', 'do you', 'she do', 'expert')) {
    return `Dalia specialises in three areas: ${SKILLS.map((s) => s.title.replace(/^.*— /, '')).join(', ')}. Ask about any of them for detail!`;
  }
  if (has('project', 'work', 'portfolio', 'built', 'case')) {
    const list = PROJECTS.map((p) => `• ${p.title} (${p.platform})`).join('\n');
    return `Here are some things Dalia has shipped:\n${list}\nScroll to the Work section to see more.`;
  }
  if (has('experience', 'year', 'senior', 'long', 'background')) {
    return `Dalia is a ${PROFILE.role} with ${PROFILE.stats[0].value} years of experience and ${PROFILE.stats[1].value} projects shipped.`;
  }
  if (has('animation', 'motion', 'smooth', 'fps', '60')) {
    return 'Motion is Dalia\'s thing — she cares about smooth 60fps animations and micro-interactions that make apps feel alive.';
  }
  if (has('hire', 'contact', 'email', 'reach', 'available', 'work with', 'get in touch', 'talk')) {
    return `Dalia is ${PROFILE.location.toLowerCase()} and open to new projects. Reach her at ${PROFILE.email} — or use the Contact section below.`;
  }
  if (has('location', 'where', 'remote', 'based', 'country')) {
    return `Dalia works remotely — ${PROFILE.location}.`;
  }
  if (has('name', 'who')) {
    return `This is the portfolio of ${PROFILE.name}, a ${PROFILE.role}.`;
  }
  return `I'm not sure about that one 🤔 — try asking about her skills, projects, experience, or contact. You can also email her directly at ${PROFILE.email}.`;
}

const bubbleBase = 'max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-normal whitespace-pre-line break-words animate-bubblein';

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
      <motion.button
        className="fixed bottom-[86px] right-[28px] z-[95] grid h-12 w-12 cursor-pointer place-items-center rounded-full border-0 bg-[image:var(--grad)] shadow-[0_14px_34px_-10px_rgba(99,102,241,0.8)]"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        animate={{ rotate: open ? 90 : 0 }}
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <span className="text-[1.15rem] leading-none">{open ? '✕' : '💬'}</span>
        {!open && <span className="absolute inset-0 rounded-full border-2 border-accent1 animate-chatpulse" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            className="fixed bottom-[146px] right-[28px] z-[95] flex h-[min(66vh,470px)] w-[min(90vw,320px)] flex-col overflow-hidden rounded-[20px] border border-[var(--border)] bg-soft shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)]"
            role="dialog"
            aria-label="Dalia's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-[15px]">
          <div className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-[image:var(--grad)] font-display text-[0.9rem] font-bold text-btntext">
            DS
          </div>
          <div>
            <div className="text-[0.95rem] font-semibold">Dalia's Assistant</div>
            <div className="flex items-center gap-1.5 text-[0.75rem] text-muted">
              <span className="h-[7px] w-[7px] rounded-full bg-[#34d399]" /> Online
            </div>
          </div>
          <button
            className="ml-auto cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-[var(--surface)] hover:text-ink"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === 'user'
                  ? `${bubbleBase} self-end rounded-br-[5px] bg-[image:var(--grad)] text-btntext`
                  : `${bubbleBase} self-start rounded-bl-[5px] border border-[var(--border)] bg-[var(--surface)] text-ink`
              }
            >
              {m.content}
            </div>
          ))}

          {typing && (
            <div className={`${bubbleBase} self-start rounded-bl-[5px] border border-[var(--border)] bg-[var(--surface)] text-ink`}>
              <span className="inline-flex gap-1 py-0.5">
                <span className="h-[7px] w-[7px] rounded-full bg-muted animate-chatbounce" />
                <span className="h-[7px] w-[7px] rounded-full bg-muted animate-chatbounce [animation-delay:0.15s]" />
                <span className="h-[7px] w-[7px] rounded-full bg-muted animate-chatbounce [animation-delay:0.3s]" />
              </span>
            </div>
          )}

          {messages.length <= 1 && !typing && (
            <div className="mt-1 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => send(s)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] px-[13px] py-2 text-[0.8rem] text-ink transition-colors hover:border-[rgba(129,140,248,0.5)]"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <form
          className="flex gap-2 border-t border-[var(--border)] bg-[var(--surface)] p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            className="flex-1 rounded-full border border-[var(--border)] bg-soft px-[15px] py-[11px] text-[0.9rem] text-ink outline-none transition-colors focus:border-[rgba(129,140,248,0.6)]"
          />
          <motion.button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[image:var(--grad)] text-btntext transition-opacity disabled:cursor-default disabled:opacity-45"
          >
            ➤
          </motion.button>
        </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

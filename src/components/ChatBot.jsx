import { useEffect, useRef, useState } from 'react';
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
      <button
        className={`chat-fab ${open ? 'chat-fab--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <span className="chat-fab__icon">{open ? '✕' : '💬'}</span>
        {!open && <span className="chat-fab__pulse" />}
      </button>

      <div className={`chat-panel ${open ? 'chat-panel--open' : ''}`} role="dialog" aria-label="Dalia's assistant">
        <div className="chat-head">
          <div className="chat-avatar">DS</div>
          <div>
            <div className="chat-title">Dalia's Assistant</div>
            <div className="chat-status"><span className="chat-status__dot" /> Online</div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble chat-bubble--${m.role}`}>
              {m.content}
            </div>
          ))}

          {typing && (
            <div className="chat-bubble chat-bubble--bot">
              <span className="chat-typing"><span /><span /><span /></span>
            </div>
          )}

          {messages.length <= 1 && !typing && (
            <div className="chat-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat-input"
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
          />
          <button type="submit" aria-label="Send" disabled={!input.trim()}>➤</button>
        </form>
      </div>
    </>
  );
}

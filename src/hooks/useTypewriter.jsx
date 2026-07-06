import { useEffect, useState } from 'react';

// Cycles through phrases with a type / delete animation.
export default function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === current) {
      delay = pause;
    } else if (deleting && text === '') {
      delay = 400;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

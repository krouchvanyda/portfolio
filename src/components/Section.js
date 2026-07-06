import useReveal from '../hooks/useReveal';

// Wrapper that fades its children up when scrolled into view.
export default function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

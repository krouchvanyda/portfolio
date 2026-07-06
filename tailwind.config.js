/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Channel triplets defined in index.css (:root + [data-theme='light'])
        page: 'rgb(var(--bg) / <alpha-value>)',
        soft: 'rgb(var(--bg-soft) / <alpha-value>)',
        ink: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent1: 'rgb(var(--accent-1) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        accent3: 'rgb(var(--accent-3) / <alpha-value>)',
        btntext: 'rgb(var(--btn-text) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        logopulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.25)', opacity: '0.7' },
        },
        statusping: {
          '0%': { boxShadow: '0 0 0 0 rgba(52,211,153,0.6)' },
          '70%': { boxShadow: '0 0 0 8px rgba(52,211,153,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(52,211,153,0)' },
        },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        scrolldot: {
          '0%': { opacity: '0', top: '8px' },
          '40%': { opacity: '1' },
          '80%': { opacity: '0', top: '22px' },
          '100%': { opacity: '0' },
        },
        floata: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,50px) scale(1.1)' },
        },
        floatb: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-50px,40px) scale(1.15)' },
        },
        floatc: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-40px) scale(1.08)' },
        },
        navdrop: {
          from: { opacity: '0', transform: 'translateY(-120%)' },
          to: { opacity: '1', transform: 'none' },
        },
        arrowbob: {
          '0%, 100%': { transform: 'translateY(1px)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        chatpulse: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        bubblein: { from: { opacity: '0', transform: 'translateY(8px)' } },
        chatbounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-5px)', opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        logopulse: 'logopulse 2.4s ease-in-out infinite',
        statusping: 'statusping 2s ease-out infinite',
        spinslow: 'spinslow 18s linear infinite',
        scrolldot: 'scrolldot 1.8s ease-in-out infinite',
        floata: 'floata 14s ease-in-out infinite',
        floatb: 'floatb 17s ease-in-out infinite',
        floatc: 'floatc 20s ease-in-out infinite',
        navdrop: 'navdrop 0.75s cubic-bezier(0.22,1,0.36,1) both',
        arrowbob: 'arrowbob 1.6s ease-in-out infinite',
        chatpulse: 'chatpulse 2s ease-out infinite',
        bubblein: 'bubblein 0.32s cubic-bezier(0.22,1,0.36,1)',
        chatbounce: 'chatbounce 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

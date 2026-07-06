// Central content — edit here to update the whole site.
export const PROFILE = {
  name: 'Dalia Sanchez',
  role: 'Senior Mobile & Frontend Developer',
  roles: [
    'Senior Mobile Developer',
    'React Native Engineer',
    'Flutter Developer',
    'Frontend Developer',
  ],
  tagline:
    'I craft fast, beautiful cross-platform apps and web experiences — from pixel-perfect UI to smooth 60fps animations.',
  email: 'hello@dalia.sanchez.com',
  location: 'Available worldwide · Remote',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    dribbble: 'https://dribbble.com/',
  },
  stats: [
    { value: '6+', label: 'Years Experience' },
    { value: '32+', label: 'Projects Shipped' },
    { value: '3', label: 'Core Platforms' },
  ],
};

export const SKILLS = [
  {
    icon: '📱',
    title: 'Mobile — React Native',
    level: 95,
    blurb:
      'Cross-platform iOS & Android apps with native performance, custom animations (Reanimated), and clean architecture.',
    tags: ['React Native', 'Expo', 'Reanimated', 'TypeScript', 'Redux'],
  },
  {
    icon: '🐦',
    title: 'Mobile — Flutter',
    level: 90,
    blurb:
      'Elegant Flutter apps with expressive UI, custom painters, and buttery-smooth motion using a single codebase.',
    tags: ['Flutter', 'Dart', 'Bloc', 'Riverpod', 'Material 3'],
  },
  {
    icon: '⚛️',
    title: 'Frontend — ReactJS',
    level: 93,
    blurb:
      'Modern, responsive web apps with reusable components, thoughtful state management, and delightful interactions.',
    tags: ['ReactJS', 'Next.js', 'TypeScript', 'Tailwind', 'Vite'],
  },
];

export const PROJECTS = [
  {
    title: 'Fintech Mobile App',
    platform: 'React Native',
    description:
      'A secure banking app with biometric auth, real-time transactions, and animated data visualizations.',
    tags: ['React Native', 'Reanimated', 'Firebase'],
    accent: 'linear-gradient(135deg, #6366f1, #22d3ee)',
  },
  {
    title: 'Food Delivery Platform',
    platform: 'Flutter',
    description:
      'End-to-end ordering experience with live tracking, custom map UI, and a rich menu builder.',
    tags: ['Flutter', 'Bloc', 'Google Maps'],
    accent: 'linear-gradient(135deg, #ec4899, #f59e0b)',
  },
  {
    title: 'SaaS Analytics Dashboard',
    platform: 'ReactJS',
    description:
      'Responsive dashboard with interactive charts, dark mode, and role-based access control.',
    tags: ['ReactJS', 'Next.js', 'Recharts'],
    accent: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  },
  {
    title: 'Fitness & Health Tracker',
    platform: 'React Native',
    description:
      'Cross-platform tracker with wearable sync, animated progress rings, and offline-first storage.',
    tags: ['React Native', 'Expo', 'SQLite'],
    accent: 'linear-gradient(135deg, #10b981, #3b82f6)',
  },
];

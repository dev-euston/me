import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'spell-star',
    name: 'Spell Star',
    description:
      'Spelling trainer for primary school kids. Teachers input word lists; the app reads words aloud via the Web Speech API for kids to type. Tracks results and generates per-session accuracy reports.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Web Speech API'],
    githubUrl: 'https://github.com/dev-euston/spell-star',
    liveUrl: 'https://spell.eustonlee.com',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description:
      'This site — a single-page scroll portfolio built with Vite, React, TypeScript, Tailwind CSS v4, and Framer Motion. 100% test coverage enforced via Vitest.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/dev-euston/me',
  },
]

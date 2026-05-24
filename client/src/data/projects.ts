import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'spell-trainer',
    name: 'Spell Star',
    description:
      'Spelling trainer for primary school kids. Input the word lists; the app reads words aloud via the Web Speech API for kids to type. Tracks results and generates per-session accuracy reports.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Web Speech API'],
    githubUrl: 'https://github.com/dev-euston/spelling-trainer',
    demoUrl: 'https://spell.eustonlee.com',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description:
      'This site — a single-page scroll portfolio built with Vite, React, TypeScript, Tailwind CSS v4, and Framer Motion. 100% test coverage enforced via Vitest.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/dev-euston/me',
    demoUrl: 'https://eustonlee.com',
  },
  {
    id: 'jira-code',
    name: 'Jira Code',
    description:
      'Connects your Jira backlog to your codebase. Tickets become pull requests — without leaving Jira.',
    tags: ['Next.js', 'Claude AI', 'PostgreSQL', 'GitHub API', 'Jira REST API', 'TypeScript'],
    githubUrl: 'https://github.com/dev-euston/jira-code',
    pitchUrl: '/projects/jira-code',
  },
]

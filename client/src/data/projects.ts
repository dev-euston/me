import type { Project } from '../types'

export const OWNER_NAME = 'Euston Lee'

export const projects: Project[] = [
  {
    id: 'spell-trainer',
    name: 'Spell Star',
    description:
      'Spelling trainer for primary school kids. Input the word lists; the app reads words aloud via the Web Speech API for kids to type. Tracks results and generates per-session accuracy reports.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Web Speech API'],
    githubUrl: 'https://github.com/dev-euston/spelling-trainer',
    demoUrl: 'https://spell.eustonlee.com',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description:
      'This site — a single-page scroll portfolio built with Vite, React, TypeScript, Tailwind CSS v4, and Framer Motion. 100% test coverage enforced via Vitest.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/dev-euston/me',
    demoUrl: 'https://eustonlee.com',
  },
  {
    id: 'jira-code',
    name: 'Jira Code',
    metaDescription:
      'Connects your Jira backlog to your codebase. Tickets become reviewed pull requests, automatically, without leaving Jira.',
    description:
      'Connects your Jira backlog to your codebase. Tickets become pull requests — without leaving Jira.',
    techStack: ['Next.js', 'Claude AI', 'PostgreSQL', 'GitHub API', 'Jira REST API', 'TypeScript'],
    pitchUrl: '/projects/jira-code',
    pitchDeckPath: '/pitch/jira-code.html',
    metrics: [
      { label: 'Issues Processed', value: '1,200+' },
      { label: 'Automation Rate', value: '98%' },
      { label: 'Integration Time', value: '5min' },
    ],
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
  },
  {
    id: 'mr-reviewer',
    name: 'MR Reviewer',
    metaDescription:
      'AI-powered code review triage for GitLab merge requests. Unified, persistent, and entirely under your control.',
    description:
      'AI-powered code review triage — unified, persistent, and entirely under your control.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GitLab API', 'Claude AI'],
    pitchUrl: '/projects/mr-reviewer',
    pitchDeckPath: '/pitch/mr-reviewer/index.html',
    metrics: [
      { label: 'Reviews Triaged', value: '10K+' },
      { label: 'Time Saved', value: '40%' },
      { label: 'Accuracy', value: '96%' },
    ],
  },
  {
    id: 'mission-singapore',
    name: 'Mission: Singapore',
    metaDescription:
      'Location-based adventure platform connecting tourists with local story missions, GPS-verified tasks, and Singapore discoveries.',
    description:
      'Location-based narrative adventure platform connecting tourists with locally-crafted story missions. Storytellers author branching adventures tied to real Singapore locations; players navigate stops, complete GPS-verified tasks, and discover the city through local eyes.',
    techStack: ['Mobile', 'GPS', 'AI', 'QR'],
    pitchUrl: '/projects/mission-singapore',
    pitchDeckPath: '/pitch/mission-singapore/index.html',
    metrics: [
      { label: 'Stories Published', value: '15+' },
      { label: 'Active Players', value: '2,000+' },
      { label: 'Locations', value: '50+' },
    ],
    demoUrl: 'https://ms.eustonlee.com',
  },
  {
    id: 'appraisal-helper',
    name: 'Appraisal Helper',
    metaDescription:
      'Engineering Manager tool that turns GitLab and Confluence activity into evidence-based, coaching-oriented appraisal narratives.',
    description:
      'Engineering Manager tool that pulls activity signals from GitLab and Confluence, then uses Claude AI to generate coaching-oriented appraisal narratives — grounded in real evidence.',
    techStack: ['Next.js', 'TypeScript', 'Claude AI', 'GitLab API', 'Confluence API', 'PostgreSQL'],
    pitchUrl: '/projects/appraisal-helper',
    pitchDeckPath: '/pitch/appraisal-helper/index.html',
    metrics: [
      { label: 'Managers Using', value: '100+' },
      { label: 'Time Saved/Month', value: '5hrs' },
      { label: 'Teams Supported', value: '30+' },
    ],
  },
  {
    id: 'markdown-commenter',
    name: 'Markdown Commenter',
    description:
      'Render Markdown documents alongside inline comments — Confluence-style. Select text to anchor a comment; highlights and the sidebar stay in sync. Supports comment threads, zip bundles, Mermaid diagrams, and GitLab file loading. Everything runs client-side.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/dev-euston/markdown-commenter',
    externalPitchUrl: 'https://markdown-commenter.eustonlee.com/?doc=pitchdeck',
    demoUrl: 'https://markdown-commenter.eustonlee.com',
  },
]

export function getAllTechStacks(): string[] {
  const techs = new Set<string>()
  for (const project of projects) {
    for (const tech of project.techStack) {
      techs.add(tech)
    }
  }
  return Array.from(techs).sort()
}

import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Site',
    description: 'This portfolio, built with React + Vite',
    tags: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/eustonlee/portfolio',
  },
  {
    id: 'alpha',
    name: 'Project Alpha',
    description: 'A full-stack task management app',
    tags: ['Node.js', 'PostgreSQL', 'React'],
    githubUrl: 'https://github.com/eustonlee/alpha',
    liveUrl: 'https://alpha.eustonlee.dev',
  },
  {
    id: 'beta',
    name: 'Project Beta',
    description: 'CLI tool for automating deployment workflows',
    tags: ['Go', 'Docker'],
    githubUrl: 'https://github.com/eustonlee/beta',
    liveUrl: 'https://beta.eustonlee.dev',
  },
]

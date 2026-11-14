export interface SkillCategory {
  category: string
  skills: string[]
}

/**
 * Technical skills grouped by category, derived from the technologies used across
 * `projects.ts` and `experience.ts`. Each entry has a `category` heading and the
 * list of `skills` shown beneath it in the Skills section.
 */
export const SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['PostgreSQL', 'Git', 'GitHub', 'GitLab', 'Vite', 'Vitest', 'Docker', 'Jira'],
  },
]

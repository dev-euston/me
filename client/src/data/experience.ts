import type { Experience } from '../types'

export const experience: Experience[] = [
  {
    id: 'acme',
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    startDate: 'Jan 2023',
    endDate: 'Present',
    bullets: [
      'Led migration of legacy monolith to microservices, reducing deployment time by 60%.',
      'Built internal tooling used by 50+ engineers to automate CI/CD workflows.',
      'Mentored 3 junior engineers through onboarding and code review practices.',
    ],
  },
  {
    id: 'beta-labs',
    company: 'Beta Labs',
    role: 'Software Engineer',
    startDate: 'Jun 2021',
    endDate: 'Dec 2022',
    bullets: [
      'Developed and shipped a real-time collaboration feature serving 10k daily active users.',
      'Improved test coverage from 40% to 95%, eliminating a class of regression bugs.',
      'Contributed to open-source libraries used by the engineering team.',
    ],
  },
  {
    id: 'gamma',
    company: 'Gamma Inc',
    role: 'Junior Developer',
    startDate: 'Mar 2020',
    endDate: 'May 2021',
    bullets: [
      'Built and maintained React frontend features across the product.',
      'Participated in on-call rotation and resolved production incidents.',
    ],
  },
]

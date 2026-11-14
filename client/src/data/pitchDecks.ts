export interface PitchDeck {
  id: string
  title: string
  tagline: string
  url: string
}

export const PITCH_DECKS: PitchDeck[] = [
  {
    id: 'appraisal-helper',
    title: 'Appraisal Helper',
    tagline: 'Performance review evidence aggregation',
    url: '/pitch/appraisal-helper/',
  },
  {
    id: 'jira-code',
    title: 'Jira Code',
    tagline: 'Automated code implementation from Jira tickets',
    url: '/pitch/jira-code.html',
  },
  {
    id: 'mission-singapore',
    title: 'Mission Singapore',
    tagline: 'Location-based AR exploration game',
    url: '/pitch/mission-singapore/',
  },
  {
    id: 'mr-reviewer',
    title: 'MR Reviewer',
    tagline: 'AI-powered merge request review assistant',
    url: '/pitch/mr-reviewer/',
  },
]

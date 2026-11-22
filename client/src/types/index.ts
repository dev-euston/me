export interface Project {
  id: string
  name: string
  description: string
  metaDescription?: string
  techStack: string[]
  githubUrl?: string
  pitchUrl?: string
  externalPitchUrl?: string
  demoUrl?: string
  coverImage?: string
  screenshotUrl?: string
  pitchDeckPath?: string
  metrics?: { label: string; value: string }[]
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  bullets: string[]
  achievements?: string[]
}

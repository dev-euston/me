export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  githubUrl?: string
  pitchUrl?: string
  demoUrl?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  bullets: string[]
}

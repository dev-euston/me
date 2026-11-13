import type { Project } from '../types'
import { projects } from '../data/projects'

interface AdjacentProjects {
  prev: Project | null
  next: Project | null
}

export function useAdjacentProjects(projectId: string): AdjacentProjects {
  const index = projects.findIndex((p) => p.id === projectId)
  if (index === -1 || projects.length < 2) return { prev: null, next: null }

  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}

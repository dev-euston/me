import type { Project } from '../types'

export const DEFAULT_RELATED_PROJECTS_LIMIT = 3

export function findRelatedProjects(
  currentProject: Project,
  allProjects: Project[],
  limit: number = DEFAULT_RELATED_PROJECTS_LIMIT
): Project[] {
  const currentTech = new Set(currentProject.techStack.map((t) => t.toLowerCase()))

  return allProjects
    .filter((p) => p.id !== currentProject.id)
    .map((project) => {
      const tech = new Set(project.techStack.map((t) => t.toLowerCase()))
      return { project, overlap: [...tech].filter((t) => currentTech.has(t)).length }
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ project }) => project)
}

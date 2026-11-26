import { useMemo } from 'react'
import type { Project } from '../types'
import { findRelatedProjects } from '../utils/projectUtils'

export function useRelatedProjects(currentProject: Project, allProjects: Project[]): Project[] {
  return useMemo(
    () => findRelatedProjects(currentProject, allProjects),
    [currentProject, allProjects]
  )
}

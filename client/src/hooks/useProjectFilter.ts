import { useCallback, useState } from 'react'
import type { Project } from '../types'

interface UseProjectFilterResult {
  activeTech: string | null
  setActiveTech: (tag: string | null) => void
  filteredProjects: (toFilter: Project[]) => Project[]
}

export function useProjectFilter(
  _projects?: Project[],
  externalActiveTech?: string | null
): UseProjectFilterResult {
  const [internalActiveTech, setActive] = useState<string | null>(null)

  const setActiveTech = useCallback((tag: string | null) => {
    setActive((prev) => (tag === null || tag === prev ? null : tag))
  }, [])

  const activeTech = externalActiveTech !== undefined ? externalActiveTech : internalActiveTech

  const filteredProjects = useCallback(
    (toFilter: Project[]) =>
      activeTech === null ? toFilter : toFilter.filter((p) => p.techStack.includes(activeTech)),
    [activeTech]
  )

  return { activeTech, setActiveTech, filteredProjects }
}

import { useCallback, useState } from 'react'
import type { Project } from '../types'

interface UseProjectFilterResult {
  activeTech: string | null
  setActiveTech: (tag: string | null) => void
  filteredProjects: (toFilter: Project[]) => Project[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- projects is accepted for typing only
export function useProjectFilter(_projects?: Project[]): UseProjectFilterResult {
  const [activeTech, setActive] = useState<string | null>(null)

  const setActiveTech = useCallback((tag: string | null) => {
    setActive((prev) => (tag === null || tag === prev ? null : tag))
  }, [])

  const filteredProjects = useCallback(
    (toFilter: Project[]) =>
      activeTech === null ? toFilter : toFilter.filter((p) => p.techStack.includes(activeTech)),
    [activeTech]
  )

  return { activeTech, setActiveTech, filteredProjects }
}

import { useCallback, useState } from 'react'
import type { Project } from '../types'

interface UseProjectFilterResult {
  activeFilters: Set<string>
  toggleFilter: (tech: string) => void
  clearFilters: () => void
  filteredProjects: (toFilter: Project[]) => Project[]
}

export function useProjectFilter(): UseProjectFilterResult {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const toggleFilter = useCallback((tech: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(tech)) {
        next.delete(tech)
      } else {
        next.add(tech)
      }
      return next
    })
  }, [])

  const clearFilters = useCallback(() => {
    setActiveFilters(new Set())
  }, [])

  const filteredProjects = useCallback(
    (toFilter: Project[]) =>
      activeFilters.size === 0
        ? toFilter
        : toFilter.filter((p) => p.techStack.some((t) => activeFilters.has(t))),
    [activeFilters]
  )

  return { activeFilters, toggleFilter, clearFilters, filteredProjects }
}

import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0])

  // Use a stable string key derived from the array so the effect only re-runs
  // when the section list actually changes, not on every render due to a new
  // array reference being created at the call site.
  const sectionKey = sectionIds.join(',')

  useEffect(() => {
    const ids = sectionKey.split(',')
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = new Set(
          entries.filter((e) => e.isIntersecting).map((e) => e.target.id)
        )
        const first = ids.find((id) => intersecting.has(id))
        if (first) setActiveId(first)
      },
      { threshold: 0.5 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionKey])

  return activeId
}

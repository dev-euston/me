import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface TechFilterContextValue {
  activeTech: string | null
  setActiveTech: (tech: string | null) => void
}

// eslint-disable-next-line react-refresh/only-export-components -- context, provider and hook are intentionally co-located
export const TechFilterContext = createContext<TechFilterContextValue | null>(null)

export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const value = useMemo(() => ({ activeTech, setActiveTech }), [activeTech])
  return <TechFilterContext.Provider value={value}>{children}</TechFilterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- context, provider and hook are intentionally co-located
export function useTechFilter(): TechFilterContextValue {
  const ctx = useContext(TechFilterContext)
  if (!ctx) {
    throw new Error('useTechFilter must be used within a TechFilterProvider')
  }
  return ctx
}

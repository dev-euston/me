import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ProjectFilterProps {
  techs: string[]
  activeFilters: Set<string>
  onFilterChange: (tech: string) => void
  onReset: () => void
}

const CHIP_BASE =
  'px-3 py-1 text-sm rounded-full border whitespace-nowrap transition-colors cursor-pointer'
const CHIP_ACTIVE = 'bg-accent border-accent text-white'
const CHIP_INACTIVE = 'bg-transparent border-border text-muted hover:text-text'

export function ProjectFilter({
  techs,
  activeFilters,
  onFilterChange,
  onReset,
}: ProjectFilterProps) {
  const reducedMotion = useReducedMotion()
  const transition = { duration: reducedMotion ? 0 : 0.2 }
  const chipMotion = {
    layout: true,
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition,
  }

  return (
    <div data-testid="project-filter" className="flex gap-2 mb-8 overflow-x-auto md:flex-wrap pb-2">
      <AnimatePresence>
        <motion.button
          key="__all__"
          type="button"
          data-testid="filter-chip-all"
          aria-pressed={activeFilters.size === 0}
          onClick={onReset}
          className={`${CHIP_BASE} ${activeFilters.size === 0 ? CHIP_ACTIVE : CHIP_INACTIVE}`}
          {...chipMotion}
        >
          All
        </motion.button>
        {techs.map((tech) => {
          const active = activeFilters.has(tech)
          return (
            <motion.button
              key={tech}
              type="button"
              data-testid={`filter-chip-${tech}`}
              aria-pressed={active}
              onClick={() => onFilterChange(tech)}
              className={`${CHIP_BASE} ${active ? CHIP_ACTIVE : CHIP_INACTIVE}`}
              {...chipMotion}
            >
              {tech}
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

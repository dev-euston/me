import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ProjectFilterProps {
  activeTech: string | null
  onSetActiveTech: (tech: string | null) => void
  allTags: string[]
}

const CHIP_BASE =
  'px-3 py-1 text-sm rounded-full border whitespace-nowrap transition-colors cursor-pointer'
const CHIP_ACTIVE = 'bg-accent border-accent text-white'
const CHIP_INACTIVE = 'bg-transparent border-border text-muted hover:text-text'

export function ProjectFilter({ activeTech, onSetActiveTech, allTags }: ProjectFilterProps) {
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
          aria-pressed={activeTech === null}
          onClick={() => onSetActiveTech(null)}
          className={`${CHIP_BASE} ${activeTech === null ? CHIP_ACTIVE : CHIP_INACTIVE}`}
          {...chipMotion}
        >
          All
        </motion.button>
        {allTags.map((tag) => {
          const active = activeTech === tag
          return (
            <motion.button
              key={tag}
              type="button"
              data-testid={`filter-chip-${tag}`}
              aria-pressed={active}
              onClick={() => onSetActiveTech(tag)}
              className={`${CHIP_BASE} ${active ? CHIP_ACTIVE : CHIP_INACTIVE}`}
              {...chipMotion}
            >
              {tag}
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

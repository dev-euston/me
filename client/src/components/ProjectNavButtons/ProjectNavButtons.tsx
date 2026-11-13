import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdjacentProjects } from '../../hooks/useAdjacentProjects'

interface ProjectNavButtonsProps {
  projectId: string
}

const linkClass =
  'inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 font-display font-bold'

export function ProjectNavButtons({ projectId }: ProjectNavButtonsProps) {
  const { prev, next } = useAdjacentProjects(projectId)

  if (!prev && !next) return null

  return (
    <nav
      aria-label="Project navigation"
      className="flex items-center justify-between gap-4 px-6 py-8 bg-bg"
    >
      {prev ? (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to={prev.pitchUrl ?? '/'}
            aria-label={`Navigate to ${prev.name}`}
            className={linkClass}
            style={{ color: 'var(--color-text)' }}
          >
            <span aria-hidden="true">←</span>
            <span>{prev.name}</span>
          </Link>
        </motion.div>
      ) : (
        <span />
      )}
      {next ? (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            to={next.pitchUrl ?? '/'}
            aria-label={`Navigate to ${next.name}`}
            className={linkClass}
            style={{ color: 'var(--color-text)' }}
          >
            <span>{next.name}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      ) : (
        <span />
      )}
    </nav>
  )
}

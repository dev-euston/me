import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { AvailabilityStatus } from '../../data/availability'

interface CurrentlyBuildingBadgeProps {
  currentlyBuilding?: AvailabilityStatus['currentlyBuilding'] | null
}

export function CurrentlyBuildingBadge({ currentlyBuilding }: CurrentlyBuildingBadgeProps) {
  const reducedMotion = useReducedMotion()

  if (!currentlyBuilding) return null

  const { name, link, since } = currentlyBuilding
  const className =
    'inline-flex flex-row items-center gap-2 mb-10 px-3 py-1 rounded-full border border-border text-sm text-muted'

  const content = (
    <>
      <svg
        data-testid="currently-building-icon"
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a4 4 0 0 0 5 5L21 17.6a2 2 0 0 1-2.8 2.8L12 14.2a4 4 0 0 0-5-5l2.6 2.6 2.4-2.4z" />
      </svg>
      <span>Currently building: {name}</span>
      {since && <span data-testid="currently-building-since">since {since}</span>}
    </>
  )

  const motionProps = {
    'data-testid': 'currently-building-badge',
    className,
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' as const },
  }

  if (link) {
    return (
      <motion.div {...motionProps}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-accent transition-colors"
        >
          {content}
        </a>
      </motion.div>
    )
  }

  return <motion.div {...motionProps}>{content}</motion.div>
}

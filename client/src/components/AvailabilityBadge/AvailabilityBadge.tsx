import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AVAILABILITY_STATUS } from '../../data/availability'

export function AvailabilityBadge() {
  const reducedMotion = useReducedMotion()

  if (!AVAILABILITY_STATUS.available) return null

  return (
    <motion.div
      data-testid="availability-badge"
      className="inline-flex flex-row items-center gap-2 mb-10"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
    >
      <motion.div
        data-testid="availability-dot"
        aria-hidden="true"
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: 'var(--success)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-sm text-muted">{AVAILABILITY_STATUS.label}</span>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AvailabilityBadgeProps {
  isAvailable: boolean
}

export function AvailabilityBadge({ isAvailable }: AvailabilityBadgeProps) {
  const reducedMotion = useReducedMotion()

  if (!isAvailable) return null

  return (
    <div data-testid="availability-badge" className="inline-flex items-center gap-2 mb-4">
      <motion.div
        data-testid="availability-dot"
        aria-hidden="true"
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: '#22c55e' }}
        animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity }}
      />
      <span className="text-sm text-muted">Open to opportunities</span>
    </div>
  )
}

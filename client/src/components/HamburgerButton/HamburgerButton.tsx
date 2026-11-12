import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

const lineClass = 'block h-0.5 w-6 bg-text origin-center'

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  const reduced = useReducedMotion()
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' as const }

  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      onClick={onClick}
      className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer"
    >
      <motion.span
        data-testid="hamburger-line-top"
        className={lineClass}
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={transition}
      />
      <motion.span
        data-testid="hamburger-line-middle"
        className={lineClass}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.span
        data-testid="hamburger-line-bottom"
        className={lineClass}
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={transition}
      />
    </button>
  )
}

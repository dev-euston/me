import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const staggeredVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
} satisfies Variants

interface UseStaggeredRevealResult {
  ref: React.RefObject<HTMLDivElement>
  variants: Variants
  initial: 'hidden' | 'visible'
  animate: 'hidden' | 'visible'
  transition: { delay: number }
}

export function useStaggeredReveal(index: number): UseStaggeredRevealResult {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { threshold: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()

  return {
    ref,
    variants: staggeredVariants,
    initial: prefersReducedMotion ? 'visible' : 'hidden',
    animate: inView || prefersReducedMotion ? 'visible' : 'hidden',
    transition: {
      delay: prefersReducedMotion ? 0 : index * 0.1,
    },
  }
}

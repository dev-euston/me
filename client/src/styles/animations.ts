import type { Variants } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
} satisfies Variants

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} satisfies Variants

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { PitchDeck } from '../../data/pitchDecks'

export function PitchDeckCard({ id, title, tagline, url }: PitchDeck) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      data-testid={`pitch-deck-card-${id}`}
      whileHover={reduced ? {} : { scale: 1.05 }}
      transition={reduced ? { duration: 0 } : { duration: 0.2 }}
      className="flex h-full flex-col gap-3 p-6 rounded-xl border border-border bg-bg hover:border-accent/40 transition-colors"
    >
      <h3 className="text-lg font-display font-bold text-text">{title}</h3>
      <p className="text-muted text-sm flex-1">{tagline}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-accent hover:underline"
      >
        View deck
      </a>
    </motion.div>
  )
}

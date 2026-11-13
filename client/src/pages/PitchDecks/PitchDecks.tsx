import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { PITCH_DECKS } from '../../data/pitchDecks'
import type { PitchDeck } from '../../data/pitchDecks'
import { PitchDeckCard } from '../../components/PitchDeckCard/PitchDeckCard'

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export function PitchDecksPage() {
  const reduced = useReducedMotion()

  return (
    <main className="min-h-screen bg-bg text-text py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          variants={headingVariants}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          className="text-4xl font-display font-bold mb-12"
        >
          Pitch Decks
        </motion.h1>
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {PITCH_DECKS.map((deck, index) => (
            <StaggeredDeck key={deck.id} deck={deck} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}

function StaggeredDeck({ deck, index }: { deck: PitchDeck; index: number }) {
  const { ref, variants, initial, animate, transition } = useStaggeredReveal(index)
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      data-testid={`pitch-deck-item-${index}`}
    >
      <PitchDeckCard {...deck} />
    </motion.div>
  )
}

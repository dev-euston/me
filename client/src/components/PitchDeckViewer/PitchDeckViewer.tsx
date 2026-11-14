import { useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export interface PitchDeckViewerDeck {
  path: string
  title: string
}

interface PitchDeckViewerProps {
  isOpen: boolean
  deck: PitchDeckViewerDeck | null
  onClose: () => void
  triggerRef: RefObject<HTMLElement | null>
}

export function PitchDeckViewer({ isOpen, deck, onClose, triggerRef }: PitchDeckViewerProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const visible = isOpen && deck !== null

  useFocusTrap(containerRef, visible)

  useEffect(() => {
    if (!visible) return
    const trigger = triggerRef.current
    closeRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      trigger?.focus()
    }
  }, [visible, onClose, triggerRef])

  const transition = reduced ? { duration: 0 } : { duration: 0.2 }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pitch-deck-viewer"
          data-testid="pitch-deck-viewer"
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={deck.title}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[1000] bg-[#0A0A0A]"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close pitch deck"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full border border-border bg-bg px-3 py-1 text-text hover:border-accent"
          >
            ✕
          </button>
          <iframe src={deck.path} title={deck.title} className="h-full w-full border-0" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

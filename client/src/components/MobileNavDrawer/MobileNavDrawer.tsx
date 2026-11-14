import { useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  triggerButtonRef?: RefObject<HTMLButtonElement | null>
}

const links = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Pitch Decks', href: '/pitch' },
]

export function MobileNavDrawer({ isOpen, onClose, triggerButtonRef }: MobileNavDrawerProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  useFocusTrap(containerRef, isOpen)
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' as const }

  const close = () => {
    triggerButtonRef?.current?.focus()
    onClose()
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerButtonRef?.current?.focus()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, triggerButtonRef])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            data-testid="mobile-nav-backdrop"
            className="fixed inset-0 z-[999] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={close}
          />
          <motion.div
            ref={containerRef}
            data-testid="mobile-nav-drawer"
            className="fixed top-0 right-0 z-[1000] flex h-screen w-64 flex-col gap-6 bg-bg p-8 pt-20 text-text"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={transition}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                className="text-lg text-text transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

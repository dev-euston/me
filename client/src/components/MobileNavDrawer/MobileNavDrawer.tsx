import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Pitch Decks', href: '/pitch' },
]

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const reduced = useReducedMotion()
  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' as const }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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
            onClick={onClose}
          />
          <motion.div
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
                onClick={onClose}
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

import { useRef, useState } from 'react'
import { HamburgerButton } from '../HamburgerButton/HamburgerButton'
import { MobileNavDrawer } from '../MobileNavDrawer/MobileNavDrawer'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const links = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Nav() {
  const activeSection = useActiveSection(links.map((l) => l.id))
  const scrollDirection = useScrollDirection()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between px-6 py-4',
        'backdrop-blur-sm bg-black/60 border-b border-border',
        'transition-transform duration-300',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <span className="font-display font-bold text-lg text-text">EL</span>

      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-current={activeSection === link.id ? 'page' : undefined}
            className={[
              'text-sm transition-colors hover:text-accent',
              activeSection === link.id ? 'text-accent' : 'text-muted',
            ].join(' ')}
          >
            {link.label}
          </a>
        ))}
        <a href="/pitch" className="text-sm text-muted transition-colors hover:text-accent">
          Pitch Decks
        </a>
      </div>

      <div className="md:hidden">
        <HamburgerButton
          ref={hamburgerRef}
          isOpen={isDrawerOpen}
          onClick={() => setIsDrawerOpen((open) => !open)}
        />
      </div>

      <MobileNavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        triggerButtonRef={hamburgerRef}
      />
    </nav>
  )
}

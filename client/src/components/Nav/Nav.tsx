import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const links = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Nav() {
  const activeSection = useActiveSection(links.map((l) => l.id))
  const scrollDirection = useScrollDirection()

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between px-6 py-4',
        'backdrop-blur-sm bg-black/60 border-b border-border',
        'transition-transform duration-300',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <span className="font-display font-bold text-lg text-text">EL</span>

      <div className="flex gap-8">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={[
              'text-sm transition-colors hover:text-accent',
              activeSection === link.id ? 'text-accent' : 'text-muted',
            ].join(' ')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

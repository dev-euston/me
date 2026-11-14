import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useActiveSection')
vi.mock('../../hooks/useScrollDirection')
vi.mock('../../hooks/useReducedMotion')

import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { Nav } from './Nav'

const mockUseActiveSection = vi.mocked(useActiveSection)
const mockUseScrollDirection = vi.mocked(useScrollDirection)

describe('Nav', () => {
  it('renders the monogram', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('EL')).toBeInTheDocument()
  })

  it('renders all 5 anchor links with correct hrefs', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('renders the Pitch Decks link', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Pitch Decks' })).toHaveAttribute('href', '/pitch')
  })

  it('applies text-accent to the active section link', () => {
    mockUseActiveSection.mockReturnValue('projects')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveClass('text-accent')
  })

  it('does not apply text-accent to inactive links', () => {
    mockUseActiveSection.mockReturnValue('projects')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveClass('text-accent')
  })

  it('hides nav when scroll direction is down', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('down')
    render(<Nav />)
    expect(screen.getByRole('navigation')).toHaveClass('-translate-y-full')
  })

  it('shows nav when scroll direction is up', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('navigation')).not.toHaveClass('-translate-y-full')
  })

  it('labels the navigation landmark', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('sets aria-current only on the active link', () => {
    mockUseActiveSection.mockReturnValue('projects')
    mockUseScrollDirection.mockReturnValue('up')
    const { rerender } = render(<Nav />)
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
    mockUseActiveSection.mockReturnValue('contact')
    rerender(<Nav />)
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current')
  })

  it('returns focus to the hamburger when the drawer closes', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus()
  })

  describe('mobile navigation', () => {
    beforeEach(() => {
      mockUseActiveSection.mockReturnValue('about')
      mockUseScrollDirection.mockReturnValue('up')
    })

    it('hides desktop links below md and shows hamburger only below md', () => {
      render(<Nav />)
      const desktop = screen.getByRole('link', { name: 'About' }).parentElement
      expect(desktop).toHaveClass('hidden', 'md:flex')
      expect(screen.getByRole('button', { name: 'Open menu' }).parentElement).toHaveClass(
        'md:hidden'
      )
    })

    it('does not render the drawer initially', () => {
      render(<Nav />)
      expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    })

    it('opens the drawer when the hamburger is clicked and toggles it closed', () => {
      render(<Nav />)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      expect(screen.getByTestId('mobile-nav-drawer')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
      expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    })

    it('closes the drawer when a drawer link is clicked', () => {
      render(<Nav />)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      fireEvent.click(screen.getByRole('link', { name: 'Home' }))
      expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    })

    it('closes the drawer on Escape', () => {
      render(<Nav />)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    })

    it('closes the drawer when the backdrop is clicked', () => {
      render(<Nav />)
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
      fireEvent.click(screen.getByTestId('mobile-nav-backdrop'))
      expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    })
  })
})

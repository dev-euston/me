import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useActiveSection')
vi.mock('../../hooks/useScrollDirection')

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

  it('renders all 4 anchor links with correct hrefs', () => {
    mockUseActiveSection.mockReturnValue('about')
    mockUseScrollDirection.mockReturnValue('up')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
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
})

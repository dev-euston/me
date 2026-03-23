import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { Projects } from './Projects'
import { projects } from '../../data/projects'

describe('Projects', () => {
  it('renders the section wrapper', () => {
    render(<Projects projects={projects} />)
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
  })

  it('renders 3 project cards', () => {
    render(<Projects projects={projects} />)
    expect(screen.getAllByTestId('project-card')).toHaveLength(3)
  })

  it('renders the first project name', () => {
    render(<Projects projects={projects} />)
    expect(screen.getAllByTestId('project-name')[0].textContent).toContain('Portfolio Site')
  })

  it('renders at least one tag per card', () => {
    render(<Projects projects={projects} />)
    const tags = screen.getAllByTestId('project-tag')
    expect(tags.length).toBeGreaterThanOrEqual(3)
  })

  it('renders GitHub links on all cards', () => {
    render(<Projects projects={projects} />)
    const links = screen.getAllByRole('link', { name: 'GitHub repository' })
    expect(links).toHaveLength(3)
  })

  it('does not render live demo link on first card (no liveUrl)', () => {
    render(<Projects projects={projects} />)
    const cards = screen.getAllByTestId('project-card')
    const firstCard = cards[0]
    expect(
      firstCard.querySelector('[aria-label="Live demo"]')
    ).toBeNull()
  })

  it('renders live demo link on second card (has liveUrl)', () => {
    render(<Projects projects={projects} />)
    const cards = screen.getAllByTestId('project-card')
    const secondCard = cards[1]
    expect(
      secondCard.querySelector('[aria-label="Live demo"]')
    ).toBeTruthy()
  })
})

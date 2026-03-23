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

  it('renders 2 project cards', () => {
    render(<Projects projects={projects} />)
    expect(screen.getAllByTestId('project-card')).toHaveLength(2)
  })

  it('renders the first project name', () => {
    render(<Projects projects={projects} />)
    expect(screen.getAllByTestId('project-name')[0].textContent).toContain('Spell Star')
  })

  it('renders at least one tag per card', () => {
    render(<Projects projects={projects} />)
    const tags = screen.getAllByTestId('project-tag')
    expect(tags.length).toBeGreaterThanOrEqual(2)
  })

  it('renders GitHub links on all cards', () => {
    render(<Projects projects={projects} />)
    const links = screen.getAllByRole('link', { name: 'GitHub repository' })
    expect(links).toHaveLength(2)
  })

  it('renders live demo link on both cards (Spell Star has liveUrl)', () => {
    render(<Projects projects={projects} />)
    const cards = screen.getAllByTestId('project-card')
    const firstCard = cards[0]
    const secondCard = cards[1]
    expect(firstCard.querySelector('[aria-label="Live demo"]')).toBeTruthy()
    expect(secondCard.querySelector('[aria-label="Live demo"]')).toBeTruthy()
  })
})

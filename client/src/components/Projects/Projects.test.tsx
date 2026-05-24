import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { Projects } from './Projects'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

describe('Projects', () => {
  it('renders the section wrapper', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
  })

  it('renders 3 project cards', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    expect(screen.getAllByTestId('project-card')).toHaveLength(3)
  })

  it('renders the first project name', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    expect(screen.getAllByTestId('project-name')[0].textContent).toContain('Spell Star')
  })

  it('renders at least one tag per card', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    const tags = screen.getAllByTestId('project-tag')
    expect(tags.length).toBeGreaterThanOrEqual(2)
  })

  it('renders GitHub links on all cards', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    const links = screen.getAllByRole('link', { name: 'GitHub repository' })
    expect(links).toHaveLength(3)
  })

  it('renders live demo link on all three cards', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    const cards = screen.getAllByTestId('project-card')
    expect(cards[0].querySelector('[aria-label="Live demo"]')).toBeTruthy()
    expect(cards[1].querySelector('[aria-label="Live demo"]')).toBeTruthy()
    expect(cards[2].querySelector('[aria-label="Live demo"]')).toBeTruthy()
  })

  it('renders internal liveUrl as a router Link without target attribute', () => {
    const internalProject: Project[] = [
      {
        id: 'jira-code',
        name: 'Jira Code',
        description: 'Test',
        tags: ['TypeScript'],
        githubUrl: 'https://github.com/dev-euston/jira-code',
        liveUrl: '/projects/jira-code',
      },
    ]
    render(<MemoryRouter><Projects projects={internalProject} /></MemoryRouter>)
    const link = screen.getByRole('link', { name: 'Live demo' })
    expect(link).not.toHaveAttribute('target')
  })

  it('renders external liveUrl as an anchor with target=_blank', () => {
    const externalProject: Project[] = [
      {
        id: 'external',
        name: 'External',
        description: 'Test',
        tags: ['TypeScript'],
        githubUrl: 'https://github.com/dev-euston/external',
        liveUrl: 'https://example.com',
      },
    ]
    render(<MemoryRouter><Projects projects={externalProject} /></MemoryRouter>)
    const link = screen.getByRole('link', { name: 'Live demo' })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })
})

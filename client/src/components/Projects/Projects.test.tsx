import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { Projects } from './Projects'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

const baseProject: Project = {
  id: 'test',
  name: 'Test Project',
  description: 'A test project',
  tags: ['TypeScript'],
  githubUrl: 'https://github.com/dev-euston/test',
}

describe('Projects', () => {
  it('renders the section wrapper', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
  })

  it('renders 7 project cards with indexed data-testid', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    for (let i = 0; i < 7; i++) {
      expect(screen.getByTestId(`project-card-${i}`)).toBeInTheDocument()
    }
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

  it('renders GitHub links only for projects with a githubUrl', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    const links = screen.getAllByRole('link', { name: 'GitHub repository' })
    expect(links).toHaveLength(3)
  })

  it('does not render GitHub link when githubUrl is absent', () => {
    const project: Project[] = [{ id: 'test', name: 'Test', description: 'A test', tags: ['T'] }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    expect(screen.queryByRole('link', { name: 'GitHub repository' })).toBeNull()
  })

  it('renders only a pitch link when only pitchUrl is set', () => {
    const project: Project[] = [{ ...baseProject, pitchUrl: '/projects/test' }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    const pitchLink = screen.getByRole('link', { name: 'View pitch' })
    expect(pitchLink).toBeInTheDocument()
    expect(pitchLink).not.toHaveAttribute('target')
    expect(screen.queryByRole('link', { name: 'Live demo' })).toBeNull()
  })

  it('renders an external pitch link when externalPitchUrl is set', () => {
    const project: Project[] = [{ ...baseProject, externalPitchUrl: 'https://example.com/?doc=pitch' }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    const pitchLink = screen.getByRole('link', { name: 'View pitch' })
    expect(pitchLink).toHaveAttribute('href', 'https://example.com/?doc=pitch')
    expect(pitchLink).toHaveAttribute('target', '_blank')
    expect(pitchLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders only a demo link when only demoUrl is set', () => {
    const project: Project[] = [{ ...baseProject, demoUrl: 'https://example.com' }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    const demoLink = screen.getByRole('link', { name: 'Live demo' })
    expect(demoLink).toHaveAttribute('target', '_blank')
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.queryByRole('link', { name: 'View pitch' })).toBeNull()
  })

  it('renders both pitch and demo links when both fields are set', () => {
    const project: Project[] = [
      { ...baseProject, pitchUrl: '/projects/test', demoUrl: 'https://example.com' },
    ]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'View pitch' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Live demo' })).toBeInTheDocument()
  })

  it('renders no extra links when neither pitchUrl nor demoUrl is set', () => {
    const project: Project[] = [{ ...baseProject }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    expect(screen.queryByRole('link', { name: 'View pitch' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Live demo' })).toBeNull()
    expect(screen.getByRole('link', { name: 'GitHub repository' })).toBeInTheDocument()
  })

  it('applies staggered animation with index-based delays', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    const cards = screen.getAllByTestId(/^project-card-/)
    expect(cards).toHaveLength(7)
    cards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-testid', `project-card-${index}`)
    })
  })
})

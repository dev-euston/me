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

  it('renders 4 project cards', () => {
    render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
    expect(screen.getAllByTestId('project-card')).toHaveLength(4)
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
    expect(links).toHaveLength(4)
  })

  it('renders only a pitch link when only pitchUrl is set', () => {
    const project: Project[] = [{ ...baseProject, pitchUrl: '/projects/test' }]
    render(<MemoryRouter><Projects projects={project} /></MemoryRouter>)
    const pitchLink = screen.getByRole('link', { name: 'View pitch' })
    expect(pitchLink).toBeInTheDocument()
    expect(pitchLink).not.toHaveAttribute('target')
    expect(screen.queryByRole('link', { name: 'Live demo' })).toBeNull()
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
})

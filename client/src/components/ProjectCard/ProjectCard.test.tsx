import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => false }))

import { ProjectCard } from './index'
import type { Project } from '../../types'

const base: Project = {
  id: 'test',
  name: 'Test Project',
  description: 'A test project',
  techStack: ['TypeScript', 'React'],
}

const renderCard = (project: Project) =>
  render(
    <MemoryRouter>
      <ProjectCard project={project} index={0} />
    </MemoryRouter>
  )

describe('ProjectCard', () => {
  it('renders a lazy 16:9 image when screenshotUrl is set', () => {
    renderCard({ ...base, screenshotUrl: 'https://example.com/shot.png' })
    const img = screen.getByAltText('Test Project screenshot')
    expect(img).toHaveAttribute('src', 'https://example.com/shot.png')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('referrerpolicy', 'no-referrer')
    expect(img).toHaveStyle({ aspectRatio: '16 / 9' })
    expect(screen.queryByTestId('project-screenshot-placeholder')).toBeNull()
  })

  it('renders a placeholder when screenshotUrl is absent', () => {
    renderCard(base)
    expect(screen.getByTestId('project-screenshot-placeholder')).toHaveStyle({
      aspectRatio: '16 / 9',
    })
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('renders title, description and tech badges', () => {
    renderCard(base)
    expect(screen.getByTestId('project-name')).toHaveTextContent('Test Project')
    expect(screen.getByText('A test project')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders all optional links when set', () => {
    renderCard({
      ...base,
      githubUrl: 'https://github.com/x/y',
      pitchUrl: '/projects/x',
      externalPitchUrl: 'https://example.com/pitch',
      demoUrl: 'https://example.com',
    })
    expect(screen.getByRole('link', { name: 'GitHub repository' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'View pitch' })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Live demo' })).toBeInTheDocument()
  })

  it('renders no links when none are set', () => {
    renderCard(base)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})

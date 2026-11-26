import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Project } from '../../types'

vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}))

const mockHook = vi.fn()
vi.mock('../../hooks/useRelatedProjects', () => ({
  useRelatedProjects: (...args: unknown[]) => mockHook(...args),
}))

vi.mock('../../data/projects', () => ({ projects: [{ id: 'default' }] }))

import { RelatedProjects } from './index'

const current: Project = { id: 'cur', name: 'Cur', description: '', techStack: ['React'] }
const withShot: Project = {
  id: 'p1',
  name: 'P1',
  description: '',
  techStack: ['A', 'B', 'C', 'D'],
  screenshotUrl: 'https://x/img.png',
}
const noShot: Project = { id: 'p2', name: 'P2', description: '', techStack: ['A'] }

describe('RelatedProjects', () => {
  beforeEach(() => mockHook.mockReset())

  it('renders nothing when no related projects', () => {
    mockHook.mockReturnValue([])
    const { container } = render(<RelatedProjects currentProject={current} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a card per related project with heading', () => {
    mockHook.mockReturnValue([withShot, noShot])
    render(<RelatedProjects currentProject={current} />)
    expect(screen.getByText('More projects')).toBeInTheDocument()
    expect(screen.getAllByTestId('related-project-card')).toHaveLength(2)
  })

  it('renders lazy screenshot image', () => {
    mockHook.mockReturnValue([withShot])
    render(<RelatedProjects currentProject={current} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://x/img.png')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('referrerpolicy', 'no-referrer')
  })

  it('renders placeholder when screenshotUrl is absent', () => {
    mockHook.mockReturnValue([noShot])
    render(<RelatedProjects currentProject={current} />)
    expect(screen.getByTestId('related-project-placeholder')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('links project name to its detail route', () => {
    mockHook.mockReturnValue([noShot])
    render(<RelatedProjects currentProject={current} />)
    expect(screen.getByRole('link', { name: 'P2' })).toHaveAttribute('href', '/projects/p2')
  })

  it('shows at most 3 tech badges', () => {
    mockHook.mockReturnValue([withShot])
    render(<RelatedProjects currentProject={current} />)
    expect(screen.getAllByTestId('tech-badge')).toHaveLength(3)
  })

  it('passes provided projects and currentProject to the hook', () => {
    mockHook.mockReturnValue([])
    const list = [noShot]
    render(<RelatedProjects currentProject={current} projects={list} />)
    expect(mockHook).toHaveBeenCalledWith(current, list)
  })

  it('defaults to the projects data when prop is undefined', () => {
    mockHook.mockReturnValue([])
    render(<RelatedProjects currentProject={current} />)
    expect(mockHook).toHaveBeenCalledWith(current, [{ id: 'default' }])
  })
})

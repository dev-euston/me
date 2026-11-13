import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectNavButtons } from './ProjectNavButtons'
import { useAdjacentProjects } from '../../hooks/useAdjacentProjects'
import type { Project } from '../../types'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('../../hooks/useAdjacentProjects', () => ({ useAdjacentProjects: vi.fn() }))

const make = (id: string, name: string, pitchUrl?: string): Project => ({
  id,
  name,
  description: '',
  techStack: [],
  pitchUrl,
})

const alpha = make('a', 'Alpha', '/projects/a')
const beta = make('b', 'Beta', '/projects/b')
const noPitch = make('c', 'Gamma')

describe('ProjectNavButtons', () => {
  beforeEach(() => {
    vi.mocked(useAdjacentProjects).mockReturnValue({ prev: alpha, next: beta })
  })

  it('renders both links with labels and aria-labels', () => {
    render(<ProjectNavButtons projectId="x" />)
    expect(screen.getByRole('link', { name: 'Navigate to Alpha' })).toHaveAttribute(
      'href',
      '/projects/a'
    )
    expect(screen.getByRole('link', { name: 'Navigate to Beta' })).toHaveAttribute(
      'href',
      '/projects/b'
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('hides the prev link when prev is null', () => {
    vi.mocked(useAdjacentProjects).mockReturnValue({ prev: null, next: beta })
    render(<ProjectNavButtons projectId="x" />)
    expect(screen.queryByRole('link', { name: 'Navigate to Alpha' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Navigate to Beta' })).toBeInTheDocument()
  })

  it('hides the next link when next is null', () => {
    vi.mocked(useAdjacentProjects).mockReturnValue({ prev: alpha, next: null })
    render(<ProjectNavButtons projectId="x" />)
    expect(screen.queryByRole('link', { name: 'Navigate to Beta' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Navigate to Alpha' })).toBeInTheDocument()
  })

  it('renders nothing when both are null', () => {
    vi.mocked(useAdjacentProjects).mockReturnValue({ prev: null, next: null })
    const { container } = render(<ProjectNavButtons projectId="x" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('falls back to / for projects without a pitchUrl', () => {
    vi.mocked(useAdjacentProjects).mockReturnValue({ prev: noPitch, next: noPitch })
    render(<ProjectNavButtons projectId="x" />)
    const links = screen.getAllByRole('link', { name: 'Navigate to Gamma' })
    expect(links).toHaveLength(2)
    links.forEach((l) => expect(l).toHaveAttribute('href', '/'))
  })
})

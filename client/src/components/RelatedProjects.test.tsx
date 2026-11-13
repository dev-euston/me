import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Project } from '../types'

const motionProps = vi.hoisted(() => ({ cards: [] as Array<Record<string, unknown>> }))

vi.mock('framer-motion', async () => {
  const mock = await import('../test/mocks/framer-motion')
  const baseDiv = mock.motion.div
  return {
    ...mock,
    motion: {
      ...mock.motion,
      div: (props: Record<string, unknown>) => {
        motionProps.cards.push(props)
        return createElement(baseDiv, props)
      },
    },
  }
})

vi.mock('../hooks/useReducedMotion', () => ({ useReducedMotion: vi.fn(() => false) }))
vi.mock('../utils/projectUtils', () => ({ findRelatedProjects: vi.fn() }))

import { useReducedMotion } from '../hooks/useReducedMotion'
import { findRelatedProjects } from '../utils/projectUtils'
import { RelatedProjects } from './RelatedProjects'

const make = (id: string, extra: Partial<Project> = {}): Project => ({
  id,
  name: `Name ${id}`,
  description: '',
  techStack: ['React', 'Vite'],
  ...extra,
})

const current = make('current')

function renderIt() {
  return render(
    <MemoryRouter>
      <RelatedProjects currentProject={current} />
    </MemoryRouter>
  )
}

describe('RelatedProjects', () => {
  beforeEach(() => {
    motionProps.cards.length = 0
    vi.mocked(useReducedMotion).mockReturnValue(false)
  })

  it('renders nothing when there are no related projects', () => {
    vi.mocked(findRelatedProjects).mockReturnValue([])
    const { container } = renderIt()
    expect(container).toBeEmptyDOMElement()
  })

  it('renders one card per related project with name, badges and link', () => {
    vi.mocked(findRelatedProjects).mockReturnValue([
      make('a', { pitchUrl: '/projects/a', coverImage: 'http://img/a.png' }),
      make('b'),
    ])
    renderIt()
    expect(screen.getAllByTestId('related-project-card')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Name a' })).toBeInTheDocument()
    expect(screen.getAllByTestId('tech-badge')).toHaveLength(4)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/projects/a')
    expect(links[1]).toHaveAttribute('href', '/')
    expect(document.querySelectorAll('img')).toHaveLength(1)
    expect(screen.getAllByTestId('related-project-thumbnail')).toHaveLength(2)
  })

  it('animates cards in with a staggered delay', () => {
    vi.mocked(findRelatedProjects).mockReturnValue([make('a'), make('b')])
    renderIt()
    expect(motionProps.cards[0].initial).toEqual({ opacity: 0, y: 24 })
    expect(motionProps.cards[0].whileInView).toEqual({ opacity: 1, y: 0 })
    expect(motionProps.cards[1].transition).toEqual({ duration: 0.4, delay: 0.1 })
  })

  it('skips animation when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    vi.mocked(findRelatedProjects).mockReturnValue([make('a'), make('b')])
    renderIt()
    expect(motionProps.cards[1].initial).toEqual({ opacity: 1, y: 0 })
    expect(motionProps.cards[1].transition).toEqual({ duration: 0, delay: 0 })
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createElement } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const motionProps = vi.hoisted(() => ({
  cards: [] as Array<Record<string, unknown>>,
  badges: [] as Array<Record<string, unknown>>,
}))

vi.mock('framer-motion', async () => {
  const mock = await import('../../test/mocks/framer-motion')
  const baseDiv = mock.motion.div
  return {
    ...mock,
    motion: {
      button: mock.motion.button,
      div: (props: Record<string, unknown>) => {
        const testId = props['data-testid']
        if (typeof testId === 'string' && testId.startsWith('project-card-')) {
          motionProps.cards.push(props)
        }
        if (testId === 'tech-badges-container') {
          motionProps.badges.push(props)
        }
        // Drop animation props so React doesn't stringify objects onto the DOM
        const { initial, animate, transition, variants, ...rest } = props
        void initial
        void animate
        void transition
        void variants
        return createElement(baseDiv, rest as never)
      },
    },
    useInView: vi.fn(() => true),
    useReducedMotion: vi.fn(() => false),
  }
})

vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => false }))

import { Projects } from './Projects'
import { projects, getAllTechStacks } from '../../data/projects'
import type { Project } from '../../types'

const baseProject: Project = {
  id: 'test',
  name: 'Test Project',
  description: 'A test project',
  techStack: ['TypeScript'],
  githubUrl: 'https://github.com/dev-euston/test',
}

describe('Projects', () => {
  it('renders the section wrapper', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
  })

  it('renders 7 project cards with indexed data-testid', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    for (let i = 0; i < 7; i++) {
      expect(screen.getByTestId(`project-card-${i}`)).toBeInTheDocument()
    }
  })

  it('renders the first project name', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId('project-name')[0].textContent).toContain('Spell Star')
  })

  it('renders at least one tech badge per card', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    const badges = screen.getAllByTestId('tech-badge')
    expect(badges.length).toBeGreaterThanOrEqual(projects.length)
  })

  it('renders tech badges with correct count matching techStack array length', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    const containers = screen.getAllByTestId('tech-badges-container')
    containers.forEach((container, i) => {
      expect(within(container).getAllByTestId('tech-badge')).toHaveLength(
        projects[i].techStack.length
      )
    })
  })

  it('renders each tech badge with correct label text from techStack', () => {
    const project: Project[] = [{ ...baseProject, techStack: ['React', 'Vite', 'Node.js'] }]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    const labels = screen.getAllByTestId('tech-badge').map((b) => b.textContent)
    expect(labels).toEqual(['React', 'Vite', 'Node.js'])
  })

  it('renders GitHub links only for projects with a githubUrl', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link', { name: 'GitHub repository' })
    expect(links).toHaveLength(3)
  })

  it('does not render GitHub link when githubUrl is absent', () => {
    const project: Project[] = [
      { id: 'test', name: 'Test', description: 'A test', techStack: ['T'] },
    ]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    expect(screen.queryByRole('link', { name: 'GitHub repository' })).toBeNull()
  })

  it('renders only a pitch link when only pitchUrl is set', () => {
    const project: Project[] = [{ ...baseProject, pitchUrl: '/projects/test' }]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    const pitchLink = screen.getByRole('link', { name: 'View pitch' })
    expect(pitchLink).toBeInTheDocument()
    expect(pitchLink).not.toHaveAttribute('target')
    expect(screen.queryByRole('link', { name: 'Live demo' })).toBeNull()
  })

  it('renders an external pitch link when externalPitchUrl is set', () => {
    const project: Project[] = [
      { ...baseProject, externalPitchUrl: 'https://example.com/?doc=pitch' },
    ]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    const pitchLink = screen.getByRole('link', { name: 'View pitch' })
    expect(pitchLink).toHaveAttribute('href', 'https://example.com/?doc=pitch')
    expect(pitchLink).toHaveAttribute('target', '_blank')
    expect(pitchLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders only a demo link when only demoUrl is set', () => {
    const project: Project[] = [{ ...baseProject, demoUrl: 'https://example.com' }]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    const demoLink = screen.getByRole('link', { name: 'Live demo' })
    expect(demoLink).toHaveAttribute('target', '_blank')
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.queryByRole('link', { name: 'View pitch' })).toBeNull()
  })

  it('renders both pitch and demo links when both fields are set', () => {
    const project: Project[] = [
      { ...baseProject, pitchUrl: '/projects/test', demoUrl: 'https://example.com' },
    ]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'View pitch' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Live demo' })).toBeInTheDocument()
  })

  it('renders no extra links when neither pitchUrl nor demoUrl is set', () => {
    const project: Project[] = [{ ...baseProject }]
    render(
      <MemoryRouter>
        <Projects projects={project} />
      </MemoryRouter>
    )
    expect(screen.queryByRole('link', { name: 'View pitch' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Live demo' })).toBeNull()
    expect(screen.getByRole('link', { name: 'GitHub repository' })).toBeInTheDocument()
  })

  it('applies staggered animation with index-based delays', () => {
    render(
      <MemoryRouter>
        <Projects projects={projects} />
      </MemoryRouter>
    )
    const cards = screen.getAllByTestId(/^project-card-/)
    expect(cards).toHaveLength(7)
    cards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-testid', `project-card-${index}`)
    })
  })

  describe('tech filter', () => {
    const renderProjects = () =>
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )

    it('renders an All chip and one chip per tech from getAllTechStacks', () => {
      renderProjects()
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
      getAllTechStacks().forEach((tech) => {
        expect(screen.getByTestId(`filter-chip-${tech}`)).toBeInTheDocument()
      })
    })

    it('renders all projects when no filters are active', () => {
      renderProjects()
      expect(screen.getAllByTestId('project-name')).toHaveLength(projects.length)
    })

    it('filters projects when a chip is clicked', () => {
      renderProjects()
      fireEvent.click(screen.getByTestId('filter-chip-Mobile'))
      const names = screen.getAllByTestId('project-name').map((n) => n.textContent)
      expect(names).toEqual(['Mission: Singapore'])
    })

    it('uses OR logic across multiple active filters', () => {
      renderProjects()
      fireEvent.click(screen.getByTestId('filter-chip-Mobile'))
      fireEvent.click(screen.getByTestId('filter-chip-Vite'))
      const names = screen.getAllByTestId('project-name').map((n) => n.textContent)
      expect(names).toEqual(['Portfolio Site', 'Mission: Singapore'])
    })

    it('restores all projects when All is clicked', () => {
      renderProjects()
      fireEvent.click(screen.getByTestId('filter-chip-Mobile'))
      fireEvent.click(screen.getByRole('button', { name: 'All' }))
      expect(screen.getAllByTestId('project-name')).toHaveLength(projects.length)
    })

    it('remounts cards (replaying entrance animations) when filters change', () => {
      renderProjects()
      const before = screen.getAllByTestId('project-name')[0]
      fireEvent.click(screen.getByTestId('filter-chip-React'))
      const after = screen.getAllByTestId('project-name')[0]
      expect(after).not.toBe(before)
    })
  })

  describe('animation', () => {
    const latestCards = () => {
      const byId = new Map<string, Record<string, unknown>>()
      motionProps.cards.forEach((p) => byId.set(p['data-testid'] as string, p))
      return Array.from(byId.values())
    }

    beforeEach(() => {
      motionProps.cards.length = 0
      motionProps.badges.length = 0
      vi.mocked(useInView).mockReturnValue(true)
      vi.mocked(useReducedMotion).mockReturnValue(false)
    })

    it('starts hidden (opacity 0, y 24) when not in view', () => {
      vi.mocked(useInView).mockReturnValue(false)
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )
      const card = latestCards()[0]
      const variants = card.variants as Record<string, unknown>
      expect(card.initial).toBe('hidden')
      expect(card.animate).toBe('hidden')
      expect(variants.hidden).toEqual({ opacity: 0, y: 24 })
    })

    it('animates to visible when in view', () => {
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )
      expect(latestCards()[0].animate).toBe('visible')
    })

    it('staggers delay by 0.1s per card index', () => {
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )
      latestCards().forEach((card, index) => {
        expect(card.transition).toEqual({ delay: index * 0.1 })
      })
    })

    describe('badges container', () => {
      const latestBadges = () => motionProps.badges.slice(-projects.length)

      it('starts hidden (opacity 0, y 24) when not in view', () => {
        vi.mocked(useInView).mockReturnValue(false)
        render(
          <MemoryRouter>
            <Projects projects={projects} />
          </MemoryRouter>
        )
        const container = latestBadges()[0]
        const variants = container.variants as Record<string, unknown>
        expect(container.initial).toBe('hidden')
        expect(container.animate).toBe('hidden')
        expect(variants.hidden).toEqual({ opacity: 0, y: 24 })
      })

      it('animates to visible when in view', () => {
        render(
          <MemoryRouter>
            <Projects projects={projects} />
          </MemoryRouter>
        )
        expect(latestBadges()[0].animate).toBe('visible')
      })

      it('applies the same index-based delay as the card', () => {
        render(
          <MemoryRouter>
            <Projects projects={projects} />
          </MemoryRouter>
        )
        latestBadges().forEach((container, index) => {
          expect(container.transition).toEqual({ delay: index * 0.1 })
        })
      })

      it('renders visible with zero delay under reduced motion', () => {
        vi.mocked(useReducedMotion).mockReturnValue(true)
        vi.mocked(useInView).mockReturnValue(false)
        render(
          <MemoryRouter>
            <Projects projects={projects} />
          </MemoryRouter>
        )
        latestBadges().forEach((container) => {
          expect(container.initial).toBe('visible')
          expect(container.animate).toBe('visible')
          expect(container.transition).toEqual({ delay: 0 })
        })
      })
    })

    it('requests once: true so the animation does not re-trigger', () => {
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )
      expect(useInView).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ once: true })
      )
    })

    it('renders visible with zero delay under reduced motion', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true)
      vi.mocked(useInView).mockReturnValue(false)
      render(
        <MemoryRouter>
          <Projects projects={projects} />
        </MemoryRouter>
      )
      latestCards().forEach((card) => {
        expect(card.initial).toBe('visible')
        expect(card.animate).toBe('visible')
        expect(card.transition).toEqual({ delay: 0 })
      })
    })
  })
})

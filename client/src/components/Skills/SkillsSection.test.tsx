import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render as rtlRender, screen, within, fireEvent } from '@testing-library/react'
import type { ReactElement } from 'react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: vi.fn() }))
vi.mock('../../hooks/useStaggeredReveal', () => ({ useStaggeredReveal: vi.fn() }))

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { SKILLS } from '../../data/skills'
import { SkillsSection } from './SkillsSection'
import { TechFilterProvider } from '../../context/TechFilterContext'

const render = (ui: ReactElement) => rtlRender(ui, { wrapper: TechFilterProvider })

const total = SKILLS.reduce((n, c) => n + c.skills.length, 0)

beforeEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false)
  vi.mocked(useStaggeredReveal).mockImplementation((index: number) => ({
    ref: { current: null },
    variants: {},
    initial: 'hidden',
    animate: 'visible',
    transition: { delay: index * 0.1 },
  }))
})

describe('SkillsSection', () => {
  it('renders section#skills', () => {
    render(<SkillsSection />)
    expect(screen.getByTestId('skills-section')).toHaveAttribute('id', 'skills')
  })

  it('renders category headings', () => {
    render(<SkillsSection />)
    for (const { category } of SKILLS) {
      expect(screen.getByRole('heading', { level: 3, name: category })).toBeInTheDocument()
    }
  })

  it('renders all skills as tags grouped by category', () => {
    render(<SkillsSection />)
    expect(screen.getAllByTestId('skill-tag')).toHaveLength(total)
    const groups = screen.getAllByTestId('skill-category')
    SKILLS.forEach((c, i) => {
      for (const skill of c.skills) {
        expect(within(groups[i]).getByText(skill)).toBeInTheDocument()
      }
    })
  })

  it('assigns sequential global stagger indexes', () => {
    render(<SkillsSection />)
    const indexes = vi.mocked(useStaggeredReveal).mock.calls.map((c) => c[0])
    expect(new Set(indexes)).toEqual(new Set(Array.from({ length: total }, (_, i) => i)))
  })

  it('renders with reduced motion', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    render(<SkillsSection />)
    expect(screen.getAllByTestId('skill-tag')).toHaveLength(total)
  })

  describe('filter integration', () => {
    const first = SKILLS[0].skills[0]
    const second = SKILLS[0].skills[1]
    const scrollIntoView = vi.fn()

    beforeEach(() => {
      scrollIntoView.mockClear()
      document.body.insertAdjacentHTML('beforeend', '<div id="projects"></div>')
      document.getElementById('projects')!.scrollIntoView = scrollIntoView
    })

    afterEach(() => {
      document.getElementById('projects')?.remove()
    })

    it('marks the clicked skill active and all others inactive', () => {
      render(<SkillsSection />)
      fireEvent.click(screen.getByRole('button', { name: first }))
      const pressed = screen.getAllByRole('button', { pressed: true })
      expect(pressed).toHaveLength(1)
      expect(pressed[0]).toHaveTextContent(first)
    })

    it('scrolls smoothly to #projects', () => {
      render(<SkillsSection />)
      fireEvent.click(screen.getByRole('button', { name: first }))
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('scrolls instantly with reduced motion', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true)
      render(<SkillsSection />)
      fireEvent.click(screen.getByRole('button', { name: first }))
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' })
    })

    it('clears the filter when the active skill is clicked again', () => {
      render(<SkillsSection />)
      fireEvent.click(screen.getByRole('button', { name: first }))
      fireEvent.click(screen.getByRole('button', { name: first }))
      expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(0)
      expect(scrollIntoView).toHaveBeenCalledTimes(1)
    })

    it('switches the active skill when another is clicked', () => {
      render(<SkillsSection />)
      fireEvent.click(screen.getByRole('button', { name: first }))
      fireEvent.click(screen.getByRole('button', { name: second }))
      expect(screen.getByRole('button', { pressed: true })).toHaveTextContent(second)
    })

    it('does not crash when #projects is missing', () => {
      document.getElementById('projects')?.remove()
      render(<SkillsSection />)
      expect(() => fireEvent.click(screen.getByRole('button', { name: first }))).not.toThrow()
    })
  })
})

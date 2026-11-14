import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: vi.fn() }))
vi.mock('../../hooks/useStaggeredReveal', () => ({ useStaggeredReveal: vi.fn() }))

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { SKILLS } from '../../data/skills'
import { SkillsSection } from './SkillsSection'

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
})

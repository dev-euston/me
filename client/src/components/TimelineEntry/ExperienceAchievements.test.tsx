import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => ({
  ...(await import('../../test/mocks/framer-motion')),
  useInView: () => true,
}))
const reducedMotion = vi.hoisted(() => ({ value: false }))
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => reducedMotion.value,
}))

import { ExperienceAchievements } from './ExperienceAchievements'

describe('ExperienceAchievements', () => {
  afterEach(() => {
    reducedMotion.value = false
  })

  it('renders nothing when achievements is undefined', () => {
    const { container } = render(<ExperienceAchievements achievements={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when achievements is empty', () => {
    const { container } = render(<ExperienceAchievements achievements={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders one list item per achievement with text', () => {
    const { container } = render(<ExperienceAchievements achievements={['One', 'Two', 'Three']} />)
    expect(container.querySelector('ul.achievements-list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Three')).toBeInTheDocument()
  })

  it('renders with reduced motion enabled', () => {
    reducedMotion.value = true
    render(<ExperienceAchievements achievements={['One']} />)
    expect(screen.getByText('One')).toBeInTheDocument()
  })
})

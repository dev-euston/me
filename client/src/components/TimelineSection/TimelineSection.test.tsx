import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}))

import { TimelineSection } from './TimelineSection'
import type { Experience } from '../../types'

const mockExperience: Experience[] = [
  {
    id: 'entry-1',
    company: 'Company A',
    role: 'Role A',
    startDate: 'Jan 2020',
    endDate: 'Dec 2020',
    bullets: ['Task 1'],
  },
  {
    id: 'entry-2',
    company: 'Company B',
    role: 'Role B',
    startDate: 'Jan 2021',
    endDate: 'Dec 2021',
    bullets: ['Task 2'],
  },
  {
    id: 'entry-3',
    company: 'Company C',
    role: 'Role C',
    startDate: 'Jan 2022',
    endDate: 'Present',
    bullets: ['Task 3'],
  },
]

describe('TimelineSection', () => {
  it('renders section with correct test id', () => {
    render(<TimelineSection experience={mockExperience} />)
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
  })

  it('renders all experience entries', () => {
    render(<TimelineSection experience={mockExperience} />)
    expect(screen.getByTestId('timeline-entry-0')).toBeInTheDocument()
    expect(screen.getByTestId('timeline-entry-1')).toBeInTheDocument()
    expect(screen.getByTestId('timeline-entry-2')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<TimelineSection experience={mockExperience} />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders entries in reverse-chronological order (data is ordered most recent first)', () => {
    render(<TimelineSection experience={mockExperience} />)
    const entries = screen.getAllByTestId(/^timeline-entry-/)
    expect(entries[0].textContent).toContain('Company A')
    expect(entries[1].textContent).toContain('Company B')
    expect(entries[2].textContent).toContain('Company C')
  })

  it('alternates left-right layout for entries', () => {
    const { container } = render(<TimelineSection experience={mockExperience} />)
    const firstEntry = container.querySelector('[data-testid="timeline-entry-0"]')
    const secondEntry = container.querySelector('[data-testid="timeline-entry-1"]')

    expect(firstEntry).toHaveClass('md:flex-row')
    expect(secondEntry).toHaveClass('md:flex-row-reverse')
  })

  it('renders empty when no experience provided', () => {
    render(<TimelineSection experience={[]} />)
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    expect(screen.queryByTestId(/^timeline-entry-/)).not.toBeInTheDocument()
  })
})

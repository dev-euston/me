import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => false,
}))

import { TimelineEntry } from './TimelineEntry'
import type { Experience } from '../../types'

const mockEntry: Experience = {
  id: 'test-entry',
  company: 'Test Company',
  role: 'Test Role',
  startDate: 'Jan 2020',
  endDate: 'Dec 2020',
  bullets: ['Bullet 1', 'Bullet 2'],
  achievements: ['Achievement 1', 'Achievement 2'],
}

describe('TimelineEntry', () => {
  it('renders entry with correct test id', () => {
    render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    expect(screen.getByTestId('timeline-entry-0')).toBeInTheDocument()
  })

  it('renders company name', () => {
    render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  it('renders role', () => {
    render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    expect(screen.getByText('Test Role')).toBeInTheDocument()
  })

  it('renders date range', () => {
    render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    expect(screen.getByText('Jan 2020 – Dec 2020')).toBeInTheDocument()
  })

  it('renders achievements when present', () => {
    render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    expect(screen.getByText('Achievement 1')).toBeInTheDocument()
    expect(screen.getByText('Achievement 2')).toBeInTheDocument()
  })

  it('renders bullets when achievements not present', () => {
    const entryWithoutAchievements = { ...mockEntry, achievements: undefined }
    render(<TimelineEntry entry={entryWithoutAchievements} index={0} isLeft={true} />)
    expect(screen.getByText('Bullet 1')).toBeInTheDocument()
    expect(screen.getByText('Bullet 2')).toBeInTheDocument()
  })

  it('applies left layout class when isLeft is true', () => {
    const { container } = render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    const flexContainer = container.querySelector('[data-testid="timeline-entry-0"]')
    expect(flexContainer).toHaveClass('flex-row')
  })

  it('applies right layout class when isLeft is false', () => {
    const { container } = render(<TimelineEntry entry={mockEntry} index={0} isLeft={false} />)
    const flexContainer = container.querySelector('[data-testid="timeline-entry-0"]')
    expect(flexContainer).toHaveClass('flex-row-reverse')
  })

  it('renders centered dot indicator', () => {
    const { container } = render(<TimelineEntry entry={mockEntry} index={0} isLeft={true} />)
    const dot = container.querySelector('.w-3.h-3.rounded-full.bg-accent')
    expect(dot).toBeInTheDocument()
  })
})

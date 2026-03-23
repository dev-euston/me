import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { Experience } from './Experience'
import { experience } from '../../data/experience'

describe('Experience', () => {
  it('renders the section wrapper', () => {
    render(<Experience experience={experience} />)
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
  })

  it('renders 5 experience entries', () => {
    render(<Experience experience={experience} />)
    expect(screen.getAllByTestId('experience-entry')).toHaveLength(5)
  })

  it('renders company name for first entry', () => {
    render(<Experience experience={experience} />)
    expect(screen.getAllByTestId('experience-company')[0].textContent).toContain('GovTech Singapore')
  })

  it('renders role for first entry', () => {
    render(<Experience experience={experience} />)
    expect(screen.getAllByTestId('experience-role')[0].textContent).toContain('Software Engineer')
  })

  it('renders date range for first entry', () => {
    render(<Experience experience={experience} />)
    expect(screen.getAllByTestId('experience-dates')[0].textContent).toContain('Nov 2024')
  })
})

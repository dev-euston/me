import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('framer-motion', async () => {
  const mock = await import('../../test/mocks/framer-motion')
  return {
    ...mock,
    useInView: vi.fn(() => true),
    useReducedMotion: vi.fn(() => false),
  }
})

const mockReduced = vi.fn(() => false)
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => mockReduced() }))

const mockData = vi.hoisted(() => ({ list: [] as unknown[] }))
vi.mock('../../data/testimonials', () => ({
  get TESTIMONIALS() {
    return mockData.list
  },
}))

import { render, screen } from '@testing-library/react'
import { Testimonials } from './index'

const full = {
  name: 'Jane Doe',
  title: 'CTO',
  company: 'Acme',
  quote: 'Great engineer.',
  linkedInUrl: 'https://linkedin.com/in/jane',
  avatarUrl: 'https://example.com/jane.png',
}
const bare = { name: 'John Roe', title: 'PM', company: 'Beta', quote: 'Solid work.' }

describe('Testimonials', () => {
  beforeEach(() => {
    mockReduced.mockReturnValue(false)
    mockData.list = [full, bare]
  })

  it('renders nothing when there are no testimonials', () => {
    mockData.list = []
    const { container } = render(<Testimonials />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a card per testimonial', () => {
    render(<Testimonials />)
    expect(screen.getAllByTestId('testimonial-card')).toHaveLength(2)
  })

  it('shows quote, name, title and company', () => {
    render(<Testimonials />)
    expect(screen.getByText('Great engineer.')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('CTO, Acme')).toBeInTheDocument()
  })

  it('wraps the name in a link when linkedInUrl is provided', () => {
    render(<Testimonials />)
    const link = screen.getByRole('link', { name: 'Jane Doe on LinkedIn' })
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/jane')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders plain text name when linkedInUrl is absent', () => {
    render(<Testimonials />)
    expect(screen.getByText('John Roe').closest('a')).toBeNull()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('renders an image only when avatarUrl is provided', () => {
    render(<Testimonials />)
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/jane.png')
  })

  it('renders without crashing when reduced motion is preferred', () => {
    mockReduced.mockReturnValue(true)
    render(<Testimonials />)
    expect(screen.getAllByTestId('testimonial-card')).toHaveLength(2)
  })
})

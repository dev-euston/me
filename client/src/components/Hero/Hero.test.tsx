import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the section wrapper', () => {
    render(<Hero />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders the name heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: 'Euston Lee' })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('renders the bio line', () => {
    render(<Hero />)
    expect(
      screen.getByText('I build fast, accessible, and well-tested software.')
    ).toBeInTheDocument()
  })

  it('"View my work" links to #projects', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: 'View my work' })
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('"Get in touch" links to #contact', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: 'Get in touch' })
    expect(link).toHaveAttribute('href', '#contact')
  })
})

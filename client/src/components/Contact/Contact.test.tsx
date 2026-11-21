import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => false }))

import { Contact } from './Contact'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    expect(screen.getByText("Let's connect")).toBeInTheDocument()
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: 'LinkedIn profile' })
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/eustonleeys/')
  })

  it('renders the contact form', () => {
    render(<Contact />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('renders GitHub link with correct href', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: 'GitHub profile' })
    expect(link).toHaveAttribute('href', 'https://github.com/dev-euston')
  })
})

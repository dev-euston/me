import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

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
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/eustonlee')
  })

  it('renders GitHub link with correct href', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: 'GitHub profile' })
    expect(link).toHaveAttribute('href', 'https://github.com/eustonlee')
  })
})

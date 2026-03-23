import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the current year', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer-section').textContent).toContain(
      new Date().getFullYear().toString()
    )
  })

  it('renders the owner name', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer-section').textContent).toContain('Euston Lee')
  })
})

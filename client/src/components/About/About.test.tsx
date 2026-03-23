import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { About } from './About'

describe('About', () => {
  it('renders the section wrapper', () => {
    render(<About />)
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
  })

  it('renders the avatar placeholder', () => {
    render(<About />)
    expect(screen.getByTestId('avatar-placeholder')).toBeInTheDocument()
  })

  it('renders the bio text', () => {
    render(<About />)
    const bio = screen.getByTestId('about-bio')
    expect(bio).toBeInTheDocument()
    expect(bio.textContent).toContain("Hi, I'm Euston")
  })
})

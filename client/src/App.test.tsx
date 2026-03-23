import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('./test/mocks/framer-motion'))
vi.mock('./hooks/useActiveSection')
vi.mock('./hooks/useScrollDirection')

import { useActiveSection } from './hooks/useActiveSection'
import { useScrollDirection } from './hooks/useScrollDirection'
import App from './App'

vi.mocked(useActiveSection).mockReturnValue('about')
vi.mocked(useScrollDirection).mockReturnValue('up')

describe('App', () => {
  it('renders nav', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders hero section', () => {
    render(<App />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders about section', () => {
    render(<App />)
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
  })

  it('renders projects section', () => {
    render(<App />)
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
  })

  it('renders experience section', () => {
    render(<App />)
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(<App />)
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('renders footer section', () => {
    render(<App />)
    expect(screen.getByTestId('footer-section')).toBeInTheDocument()
  })

  it('passes projects data (first project name visible)', () => {
    render(<App />)
    expect(screen.getByText('Spell Star')).toBeInTheDocument()
  })

  it('passes experience data (first company name visible)', () => {
    render(<App />)
    expect(screen.getAllByText('GovTech Singapore')[0]).toBeInTheDocument()
  })
})

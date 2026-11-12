import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion')

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { HamburgerButton } from './HamburgerButton'

const mockReduced = vi.mocked(useReducedMotion)

describe('HamburgerButton', () => {
  it('renders three lines when closed', () => {
    mockReduced.mockReturnValue(false)
    render(<HamburgerButton isOpen={false} onClick={() => {}} />)
    expect(screen.getByTestId('hamburger-line-top')).toBeInTheDocument()
    expect(screen.getByTestId('hamburger-line-middle')).toBeInTheDocument()
    expect(screen.getByTestId('hamburger-line-bottom')).toBeInTheDocument()
    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('labels the button as close when open', () => {
    mockReduced.mockReturnValue(false)
    render(<HamburgerButton isOpen onClick={() => {}} />)
    const button = screen.getByRole('button', { name: 'Close menu' })
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onClick when clicked', () => {
    mockReduced.mockReturnValue(false)
    const onClick = vi.fn()
    render(<HamburgerButton isOpen={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders with reduced motion enabled', () => {
    mockReduced.mockReturnValue(true)
    render(<HamburgerButton isOpen onClick={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('uses design token classes for the lines', () => {
    mockReduced.mockReturnValue(false)
    render(<HamburgerButton isOpen={false} onClick={() => {}} />)
    expect(screen.getByTestId('hamburger-line-top')).toHaveClass('bg-text')
  })
})

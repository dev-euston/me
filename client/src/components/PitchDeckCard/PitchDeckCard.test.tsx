import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const motionProps = vi.hoisted(() => ({ current: {} as Record<string, unknown> }))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      whileHover,
      transition,
      ...rest
    }: {
      children: React.ReactNode
      whileHover: unknown
      transition: unknown
    }) => {
      motionProps.current = { whileHover, transition }
      return <div {...rest}>{children}</div>
    },
  },
}))
vi.mock('../../hooks/useReducedMotion')

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PitchDeckCard } from './PitchDeckCard'

const mockReduced = vi.mocked(useReducedMotion)
const deck = { id: 'x', title: 'Deck X', tagline: 'About X', url: '/pitch/x/' }

describe('PitchDeckCard', () => {
  beforeEach(() => {
    mockReduced.mockReturnValue(false)
  })

  it('renders title, tagline and view link', () => {
    render(<PitchDeckCard {...deck} />)
    expect(screen.getByRole('heading', { name: 'Deck X' })).toBeInTheDocument()
    expect(screen.getByText('About X')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View deck' })).toBeInTheDocument()
  })

  it('opens the deck in a new tab safely', () => {
    render(<PitchDeckCard {...deck} />)
    const link = screen.getByRole('link', { name: 'View deck' })
    expect(link).toHaveAttribute('href', '/pitch/x/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('calls onOpen with the deck and the button element', () => {
    const onOpen = vi.fn()
    render(<PitchDeckCard {...deck} onOpen={onOpen} />)
    const button = screen.getByRole('button', { name: 'Open' })
    fireEvent.click(button)
    expect(onOpen).toHaveBeenCalledWith(deck, button)
  })

  it('does not throw when Open is clicked without onOpen', () => {
    render(<PitchDeckCard {...deck} />)
    expect(() => fireEvent.click(screen.getByRole('button', { name: 'Open' }))).not.toThrow()
  })

  it('scales on hover when motion is allowed', () => {
    render(<PitchDeckCard {...deck} />)
    expect(motionProps.current.whileHover).toEqual({ scale: 1.05 })
  })

  it('disables hover animation when reduced motion is preferred', () => {
    mockReduced.mockReturnValue(true)
    render(<PitchDeckCard {...deck} />)
    expect(motionProps.current.whileHover).toEqual({})
    expect(motionProps.current.transition).toEqual({ duration: 0 })
  })
})

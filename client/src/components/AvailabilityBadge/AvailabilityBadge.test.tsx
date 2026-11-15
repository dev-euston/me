import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

/* eslint-disable @typescript-eslint/no-explicit-any -- test mock capturing motion props */
const motionProps: any[] = []

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, ...props }: any) => {
      motionProps.push({ initial, animate, transition })
      return <div {...props}>{children}</div>
    },
  },
}))

const mockReducedMotion = vi.fn(() => false)
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}))

import { AvailabilityBadge } from './AvailabilityBadge'
import { AVAILABILITY_STATUS } from '../../data/availability'

describe('AvailabilityBadge', () => {
  beforeEach(() => {
    motionProps.length = 0
    mockReducedMotion.mockReturnValue(false)
  })

  afterEach(() => {
    AVAILABILITY_STATUS.available = true
  })

  it('has the expected default availability status', () => {
    expect(AVAILABILITY_STATUS.available).toBe(true)
    expect(AVAILABILITY_STATUS.label).toBe('Open to opportunities')
  })

  it('renders the dot and label when available', () => {
    render(<AvailabilityBadge />)
    expect(screen.getByText('Open to opportunities')).toBeInTheDocument()
    expect(screen.getByTestId('availability-dot')).toBeInTheDocument()
  })

  it('renders nothing when not available', () => {
    AVAILABILITY_STATUS.available = false
    const { container } = render(<AvailabilityBadge />)
    expect(container).toBeEmptyDOMElement()
  })

  it('uses the entrance animation values', () => {
    render(<AvailabilityBadge />)
    expect(motionProps[0].initial).toEqual({ opacity: 0, x: -8 })
    expect(motionProps[0].animate).toEqual({ opacity: 1, x: 0 })
  })

  it('uses a 0.3s transition when reduced motion is off', () => {
    render(<AvailabilityBadge />)
    expect(motionProps[0].transition).toEqual({ duration: 0.3, ease: 'easeOut' })
  })

  it('uses a 0s transition when reduced motion is on', () => {
    mockReducedMotion.mockReturnValue(true)
    render(<AvailabilityBadge />)
    expect(motionProps[0].transition).toEqual({ duration: 0, ease: 'easeOut' })
  })

  it('pulses the dot using the --success custom property', () => {
    render(<AvailabilityBadge />)
    expect(screen.getByTestId('availability-dot').getAttribute('style')).toContain('var(--success)')
    expect(motionProps[1].animate).toEqual({ scale: [1, 1.2, 1] })
    expect(motionProps[1].transition).toEqual({ duration: 2, repeat: Infinity })
  })
})

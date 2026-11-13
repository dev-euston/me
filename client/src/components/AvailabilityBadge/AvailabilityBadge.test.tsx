import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

/* eslint-disable @typescript-eslint/no-explicit-any -- test mock capturing motion props */
const motionProps: any[] = []

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, transition, ...props }: any) => {
      motionProps.push({ animate, transition })
      return <div {...props}>{children}</div>
    },
  },
}))

const mockReducedMotion = vi.fn(() => false)
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}))

import { AvailabilityBadge } from './AvailabilityBadge'

describe('AvailabilityBadge', () => {
  beforeEach(() => {
    motionProps.length = 0
    mockReducedMotion.mockReturnValue(false)
  })

  it('renders the green dot and text when available', () => {
    render(<AvailabilityBadge isAvailable={true} />)
    expect(screen.getByText('Open to opportunities')).toBeInTheDocument()
    expect(screen.getByTestId('availability-dot')).toHaveStyle({
      backgroundColor: 'rgb(34, 197, 94)',
    })
  })

  it('renders nothing when not available', () => {
    const { container } = render(<AvailabilityBadge isAvailable={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('pulses with scale [1, 1.1, 1] over 1.8s forever when motion is enabled', () => {
    render(<AvailabilityBadge isAvailable={true} />)
    expect(motionProps[0].animate).toEqual({ scale: [1, 1.1, 1] })
    expect(motionProps[0].transition).toEqual({ duration: 1.8, repeat: Infinity })
  })

  it('skips animation when reduced motion is true', () => {
    mockReducedMotion.mockReturnValue(true)
    render(<AvailabilityBadge isAvailable={true} />)
    expect(motionProps[0].animate).toEqual({ scale: 1 })
    expect(motionProps[0].transition).toEqual({ duration: 0 })
  })
})

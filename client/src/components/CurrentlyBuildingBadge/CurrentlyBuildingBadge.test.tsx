import { describe, it, expect, vi, beforeEach } from 'vitest'
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

import { CurrentlyBuildingBadge } from '.'

describe('CurrentlyBuildingBadge', () => {
  beforeEach(() => {
    motionProps.length = 0
    mockReducedMotion.mockReturnValue(false)
  })

  it('renders nothing when undefined', () => {
    const { container } = render(<CurrentlyBuildingBadge />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when null', () => {
    const { container } = render(<CurrentlyBuildingBadge currentlyBuilding={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders name and icon without a link', () => {
    render(<CurrentlyBuildingBadge currentlyBuilding={{ name: 'jira-code' }} />)
    expect(screen.getByText('Currently building: jira-code')).toBeInTheDocument()
    expect(screen.getByTestId('currently-building-icon')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByTestId('currently-building-since')).not.toBeInTheDocument()
  })

  it('renders a safe link when link is provided', () => {
    render(
      <CurrentlyBuildingBadge currentlyBuilding={{ name: 'jira-code', link: 'https://x.dev' }} />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://x.dev')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the since label when provided', () => {
    render(<CurrentlyBuildingBadge currentlyBuilding={{ name: 'a', since: 'Jan 2026' }} />)
    expect(screen.getByTestId('currently-building-since')).toHaveTextContent('since Jan 2026')
  })

  it('animates with 0.3s duration when reduced motion is off', () => {
    render(<CurrentlyBuildingBadge currentlyBuilding={{ name: 'a' }} />)
    expect(motionProps[0].initial).toEqual({ opacity: 0, x: -8 })
    expect(motionProps[0].animate).toEqual({ opacity: 1, x: 0 })
    expect(motionProps[0].transition).toEqual({ duration: 0.3, ease: 'easeOut' })
  })

  it('uses 0 duration when reduced motion is on', () => {
    mockReducedMotion.mockReturnValue(true)
    render(<CurrentlyBuildingBadge currentlyBuilding={{ name: 'a' }} />)
    expect(motionProps[0].transition).toEqual({ duration: 0, ease: 'easeOut' })
  })
})

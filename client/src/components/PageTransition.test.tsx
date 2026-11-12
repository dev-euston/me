import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageTransition } from './PageTransition'

const { divSpy, reducedMotion } = vi.hoisted(() => ({
  divSpy: vi.fn(),
  reducedMotion: { value: false },
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: (props: { children?: React.ReactNode } & Record<string, unknown>) => {
      divSpy(props)
      return <div data-testid={props['data-testid'] as string | undefined}>{props.children}</div>
    },
  },
  useReducedMotion: () => reducedMotion.value,
}))

describe('PageTransition', () => {
  beforeEach(() => {
    divSpy.mockClear()
    reducedMotion.value = false
  })

  it('renders children correctly', () => {
    render(<PageTransition>Hello page</PageTransition>)
    expect(screen.getByText('Hello page')).toBeInTheDocument()
  })

  it('applies data-testid when provided', () => {
    render(<PageTransition data-testid="page-transition">content</PageTransition>)
    expect(screen.getByTestId('page-transition')).toBeInTheDocument()
  })

  it('applies full animation props when reduced motion is off', () => {
    render(<PageTransition>content</PageTransition>)
    const props = divSpy.mock.calls[0][0]
    expect(props.initial).toEqual({ opacity: 0, y: 15 })
    expect(props.animate).toEqual({ opacity: 1, y: 0 })
    expect(props.exit).toEqual({ opacity: 0, y: -10 })
    expect(props.transition).toEqual({ duration: 0.3, ease: 'easeOut' })
  })

  it('disables animation when reduced motion is on', () => {
    reducedMotion.value = true
    render(<PageTransition>content</PageTransition>)
    const props = divSpy.mock.calls[0][0]
    expect(props.initial).toEqual({ opacity: 1, y: 0 })
    expect(props.animate).toEqual({ opacity: 1, y: 0 })
    expect(props.exit).toBeUndefined()
    expect(props.transition).toEqual({ duration: 0 })
  })

  it('does not add wrapper classes or extra styling', () => {
    render(<PageTransition data-testid="pt">content</PageTransition>)
    const props = divSpy.mock.calls[0][0]
    expect(props.className).toBeUndefined()
    expect(props.style).toBeUndefined()
  })
})

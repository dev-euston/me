import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

/* eslint-disable @typescript-eslint/no-explicit-any -- test mock capturing motion props */
const motionProps: any[] = []

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, variants, ...props }: any) => {
      motionProps.push({ initial, animate, variants })
      return <div {...props}>{children}</div>
    },
  },
}))

const mockReducedMotion = vi.fn(() => false)
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}))

import { Hero } from './Hero'

describe('Hero', () => {
  beforeEach(() => {
    motionProps.length = 0
    mockReducedMotion.mockReturnValue(false)
  })

  it('renders the section wrapper', () => {
    render(<Hero />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders the name heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: 'Euston Lee' })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('renders the bio line', () => {
    render(<Hero />)
    expect(
      screen.getByText('I build fast, accessible, and well-tested software.')
    ).toBeInTheDocument()
  })

  it('"View my work" links to #projects', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: 'View my work' })
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('"Get in touch" links to #contact', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: 'Get in touch' })
    expect(link).toHaveAttribute('href', '#contact')
  })

  it('renders a container and four animated children when reduced motion is false', () => {
    render(<Hero />)
    expect(motionProps).toHaveLength(5)
  })

  it('animates from hidden to visible on mount when reduced motion is false', () => {
    render(<Hero />)
    expect(motionProps[0].initial).toBe('hidden')
    expect(motionProps[0].animate).toBe('visible')
    expect(motionProps[1].variants.visible.transition.duration).toBe(0.4)
  })

  it('skips animation when reduced motion is true', () => {
    mockReducedMotion.mockReturnValue(true)
    render(<Hero />)
    expect(motionProps[0].initial).toBe('visible')
    expect(motionProps[0].animate).toBe('visible')
    expect(motionProps[1].variants.visible.transition.duration).toBe(0)
    expect(motionProps[1].variants.hidden.opacity).toBe(1)
  })

  it('keeps the DOM structure with animation wrappers', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { name: 'Euston Lee' })
    expect(heading.parentElement?.parentElement?.children).toHaveLength(4)
    expect(heading.parentElement?.parentElement?.parentElement).toBe(
      screen.getByTestId('hero-section')
    )
  })

  it('does not change animation props on re-render', () => {
    const { rerender } = render(<Hero />)
    rerender(<Hero />)
    const last = motionProps.slice(-5)
    expect(last[0].initial).toBe('hidden')
    expect(last[0].animate).toBe('visible')
    expect(screen.getAllByRole('heading')).toHaveLength(1)
  })
})

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

import { ProjectCoverHeader } from './ProjectCoverHeader'

const renderHeader = () =>
  render(
    <ProjectCoverHeader coverImage="/cover.png" title="My Project" techStack={['React', 'Vite']} />
  )

describe('ProjectCoverHeader', () => {
  beforeEach(() => {
    motionProps.length = 0
    mockReducedMotion.mockReturnValue(false)
  })

  it('renders the hero section with a 65vh height class', () => {
    renderHeader()
    expect(screen.getByTestId('project-cover-header').className).toContain('h-[65vh]')
  })

  it('renders the cover image with object-fit cover', () => {
    renderHeader()
    const img = screen.getByTestId('project-cover-image') as HTMLImageElement
    expect(img.getAttribute('src')).toBe('/cover.png')
    expect(img.style.objectFit).toBe('cover')
  })

  it('renders the dark gradient overlay', () => {
    renderHeader()
    expect(screen.getByTestId('project-cover-overlay').style.background).toBe('rgba(0, 0, 0, 0.45)')
  })

  it('renders the title in white with font-size of at least 2rem', () => {
    renderHeader()
    const h1 = screen.getByRole('heading', { name: 'My Project' })
    expect(h1.style.color).toBe('var(--color-text)')
    expect(parseFloat(h1.style.fontSize)).toBeGreaterThanOrEqual(2)
    expect(h1.style.fontSize.endsWith('rem')).toBe(true)
  })

  it('renders tech badges in the bottom-left container', () => {
    renderHeader()
    const container = screen.getByTestId('project-cover-badges')
    expect(container.className).toContain('left-6')
    expect(container.className).toContain('bottom-6')
    expect(screen.getAllByTestId('tech-badge').map((b) => b.textContent)).toEqual(['React', 'Vite'])
  })

  it('animates with fadeUp when reduced motion is false', () => {
    renderHeader()
    expect(motionProps[0].initial).toBe('hidden')
    expect(motionProps[0].animate).toBe('visible')
    expect(motionProps[0].variants.visible.transition.duration).toBe(0.4)
  })

  it('skips animation when reduced motion is true', () => {
    mockReducedMotion.mockReturnValue(true)
    renderHeader()
    expect(motionProps[0].initial).toBe('visible')
    expect(motionProps[0].variants.visible.transition.duration).toBe(0)
    expect(motionProps[0].variants.hidden.opacity).toBe(1)
  })
})

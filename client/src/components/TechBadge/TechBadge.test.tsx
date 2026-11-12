import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TechBadge } from './index'

describe('TechBadge', () => {
  it('renders the label text', () => {
    render(<TechBadge label="React" />)
    expect(screen.getByTestId('tech-badge')).toHaveTextContent('React')
  })

  it('uses the accent background and white text', () => {
    render(<TechBadge label="React" />)
    const badge = screen.getByTestId('tech-badge')
    expect(badge).toHaveClass('bg-accent')
    expect(badge).toHaveClass('text-white')
  })

  it('has pill-shaped styling', () => {
    render(<TechBadge label="React" />)
    expect(screen.getByTestId('tech-badge')).toHaveClass('rounded-full')
  })
})

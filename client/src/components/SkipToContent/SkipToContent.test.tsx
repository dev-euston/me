import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkipToContent } from './SkipToContent'

describe('SkipToContent', () => {
  it('renders a link to #main-content', () => {
    render(<SkipToContent />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content'
    )
  })

  it('is visually hidden off-screen by default', () => {
    render(<SkipToContent />)
    const link = screen.getByText('Skip to content')
    expect(link).toHaveClass('absolute', '-left-[9999px]')
  })

  it('becomes visible with an accent outline on focus-visible', () => {
    render(<SkipToContent />)
    const link = screen.getByText('Skip to content')
    expect(link).toHaveClass('focus-visible:left-4', 'focus-visible:outline-accent')
  })

  it('can receive keyboard focus', () => {
    render(<SkipToContent />)
    const link = screen.getByRole('link', { name: 'Skip to content' })
    link.focus()
    expect(link).toHaveFocus()
  })
})

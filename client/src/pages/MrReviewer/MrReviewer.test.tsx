import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MrReviewerPage } from './MrReviewer'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('MrReviewerPage', () => {
  it('renders an iframe pointing to the mr-reviewer pitch deck', () => {
    const { container } = render(<MrReviewerPage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/mr-reviewer/index.html')
  })

  it('renders the back to portfolio nav bar', () => {
    render(<MrReviewerPage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })
})

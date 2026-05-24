import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MrReviewerPage } from './MrReviewer'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('MrReviewerPage', () => {
  it('renders an iframe', () => {
    const { container } = render(<MrReviewerPage />)
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
  })

  it('iframe src points to the static pitch deck', () => {
    const { container } = render(<MrReviewerPage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/mr-reviewer/index.html')
  })

  it('iframe fills the viewport', () => {
    const { container } = render(<MrReviewerPage />)
    const iframe = container.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.style.width).toBe('100%')
    expect(iframe.style.height).toBe('calc(100vh - 48px)')
  })

  it('renders a nav bar above the iframe', () => {
    render(<MrReviewerPage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('nav bar has background color #0A0A0A', () => {
    render(<MrReviewerPage />)
    const nav = screen.getByRole('navigation')
    expect(nav.style.background).toBe('rgb(10, 10, 10)')
  })

  it('back button contains Back to portfolio text', () => {
    render(<MrReviewerPage />)
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })

  it('clicking back button calls navigate(-1)', async () => {
    mockNavigate.mockClear()
    render(<MrReviewerPage />)
    const button = screen.getByRole('button', { name: /back to portfolio/i })
    await userEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})

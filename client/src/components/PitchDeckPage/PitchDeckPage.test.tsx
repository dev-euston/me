import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PitchDeckPage } from './PitchDeckPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('PitchDeckPage', () => {
  it('renders an iframe with the given src', () => {
    const { container } = render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/foo.html')
  })

  it('renders an iframe with the given title', () => {
    const { container } = render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('title')).toBe('Foo pitch')
  })

  it('iframe fills the remaining viewport height', () => {
    const { container } = render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    const iframe = container.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.style.width).toBe('100%')
    expect(iframe.style.height).toBe('calc(100vh - 48px)')
  })

  it('renders a nav bar above the iframe', () => {
    render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('nav bar has background color #0A0A0A', () => {
    render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    const nav = screen.getByRole('navigation')
    expect(nav.style.background).toBe('rgb(10, 10, 10)')
  })

  it('back button contains Back to portfolio text', () => {
    render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })

  it('clicking back button calls navigate(-1)', async () => {
    mockNavigate.mockClear()
    render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    await userEvent.click(screen.getByRole('button', { name: /back to portfolio/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('back button colour changes on hover', async () => {
    render(<PitchDeckPage src="/pitch/foo.html" title="Foo pitch" />)
    const button = screen.getByRole('button', { name: /back to portfolio/i })
    expect(button.style.color).toBe('white')
    await userEvent.hover(button)
    expect(button.style.color).toBe('rgb(59, 130, 246)')
    await userEvent.unhover(button)
    expect(button.style.color).toBe('white')
  })
})

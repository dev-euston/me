import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JiraCodePage } from './JiraCode'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('JiraCodePage', () => {
  it('renders an iframe pointing to the jira-code pitch deck', () => {
    const { container } = render(<JiraCodePage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/jira-code.html')
  })

  it('renders the back to portfolio nav bar', () => {
    render(<JiraCodePage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })
})

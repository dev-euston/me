import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MissionSingaporePage } from './MissionSingapore'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('MissionSingaporePage', () => {
  it('renders an iframe pointing to the mission-singapore pitch deck', () => {
    const { container } = render(<MissionSingaporePage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/mission-singapore/index.html')
  })

  it('renders the back to portfolio nav bar', () => {
    render(<MissionSingaporePage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })
})

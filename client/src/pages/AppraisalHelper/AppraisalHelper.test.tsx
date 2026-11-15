import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppraisalHelperPage } from './AppraisalHelper'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('../../components/ProjectNavButtons/ProjectNavButtons', () => ({
  ProjectNavButtons: () => null,
}))

vi.mock('../../components/PitchDeckViewer/PitchDeckViewer', () => ({
  PitchDeckViewer: (props: {
    isOpen: boolean
    deck: { path: string; title: string } | null
    onClose: () => void
  }) => (
    <div data-testid="viewer" data-open={String(props.isOpen)} data-path={props.deck?.path ?? ''}>
      <button data-testid="viewer-close" onClick={props.onClose} />
    </div>
  ),
}))

vi.mock('../../components/RelatedProjects', () => ({
  RelatedProjects: () => null,
}))

describe('AppraisalHelperPage', () => {
  it('renders an iframe pointing to the appraisal-helper pitch deck', () => {
    const { container } = render(<AppraisalHelperPage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/appraisal-helper/index.html')
  })

  it('renders the back to portfolio nav bar', () => {
    render(<AppraisalHelperPage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to portfolio/i })).toBeInTheDocument()
  })

  it('shows a View Pitch Deck button that opens and closes the viewer', () => {
    render(<AppraisalHelperPage />)
    const viewer = screen.getByTestId('viewer')
    expect(viewer).toHaveAttribute('data-open', 'false')
    fireEvent.click(screen.getByRole('button', { name: 'View Pitch Deck' }))
    expect(viewer).toHaveAttribute('data-open', 'true')
    expect(viewer.getAttribute('data-path')).toMatch(/^\/pitch\//)
    fireEvent.click(screen.getByTestId('viewer-close'))
    expect(viewer).toHaveAttribute('data-open', 'false')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppraisalHelperPage } from './AppraisalHelper'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('../../components/ProjectNavButtons/ProjectNavButtons', () => ({
  ProjectNavButtons: () => null,
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
})

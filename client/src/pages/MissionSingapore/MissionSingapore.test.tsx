import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MissionSingaporePage } from './MissionSingapore'
import { projects } from '../../data/projects'

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

vi.mock('../../components/ProjectMetrics', () => ({
  ProjectMetrics: () => null,
}))

vi.mock('../../components/RelatedProjects', () => ({
  RelatedProjects: () => null,
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

  it('shows a View Pitch Deck button that opens and closes the viewer', () => {
    render(<MissionSingaporePage />)
    const viewer = screen.getByTestId('viewer')
    expect(viewer).toHaveAttribute('data-open', 'false')
    fireEvent.click(screen.getByRole('button', { name: 'View Pitch Deck' }))
    expect(viewer).toHaveAttribute('data-open', 'true')
    expect(viewer.getAttribute('data-path')).toMatch(/^\/pitch\//)
    fireEvent.click(screen.getByTestId('viewer-close'))
    expect(viewer).toHaveAttribute('data-open', 'false')
  })
})

describe('MissionSingaporePage meta tags', () => {
  const project = projects.find((p) => p.id === 'mission-singapore')!
  const original = { ...project }
  const meta = (attr: string, key: string) =>
    document.head.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content')

  afterEach(() => {
    Object.assign(project, original)
    if (original.screenshotUrl === undefined) delete project.screenshotUrl
  })

  it('renders the title in the "{name} | Euston Lee" format', () => {
    render(<MissionSingaporePage />)
    expect(document.title).toBe('Mission: Singapore | Euston Lee')
  })

  it('uses the og-default image and summary card when no screenshotUrl is set', () => {
    delete project.screenshotUrl
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:image')).toBe('/og-default.png')
    expect(meta('name', 'twitter:image')).toBe('/og-default.png')
    expect(meta('name', 'twitter:card')).toBe('summary')
  })

  it('uses screenshotUrl and the large image card when set', () => {
    project.screenshotUrl = 'https://example.com/shot.png'
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:image')).toBe('https://example.com/shot.png')
    expect(meta('name', 'twitter:image')).toBe('https://example.com/shot.png')
    expect(meta('name', 'twitter:card')).toBe('summary_large_image')
  })

  it('keeps og and twitter titles consistent with the project name', () => {
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:title')).toBe('Mission: Singapore')
    expect(meta('name', 'twitter:title')).toBe('Mission: Singapore')
  })

  it('uses metaDescription when available', () => {
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:description')).toBe(project.metaDescription)
    expect(meta('name', 'twitter:description')).toBe(project.metaDescription)
  })

  it('falls back to description when metaDescription is absent', () => {
    delete project.metaDescription
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:description')).toBe(project.description)
    expect(meta('name', 'twitter:description')).toBe(project.description)
  })

  it('sets og:type to website and og:url to the current URL', () => {
    render(<MissionSingaporePage />)
    expect(meta('property', 'og:type')).toBe('website')
    expect(meta('property', 'og:url')).toBe(window.location.href)
  })
})

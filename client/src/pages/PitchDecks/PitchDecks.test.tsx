import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion')
vi.mock('../../hooks/useStaggeredReveal', () => ({
  useStaggeredReveal: vi.fn(() => ({
    ref: { current: null },
    variants: {},
    initial: 'hidden',
    animate: 'visible',
    transition: { delay: 0 },
  })),
}))
vi.mock('../../components/PitchDeckCard/PitchDeckCard', () => ({
  PitchDeckCard: (props: {
    id: string
    title: string
    tagline: string
    url: string
    onOpen: (deck: unknown, el: HTMLElement) => void
  }) => (
    <div data-testid={`card-${props.id}`} data-url={props.url}>
      {props.title}|{props.tagline}
      <button
        data-testid={`open-${props.id}`}
        onClick={(e) =>
          props.onOpen(
            { id: props.id, title: props.title, tagline: props.tagline, url: props.url },
            e.currentTarget
          )
        }
      />
    </div>
  ),
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

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { PITCH_DECKS } from '../../data/pitchDecks'
import { PitchDecksPage } from './PitchDecks'

describe('PitchDecksPage', () => {
  it('renders the heading', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    render(<PitchDecksPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Pitch Decks' })).toBeInTheDocument()
  })

  it('renders a card for every deck with its props', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    render(<PitchDecksPage />)
    for (const deck of PITCH_DECKS) {
      const card = screen.getByTestId(`card-${deck.id}`)
      expect(card).toHaveTextContent(`${deck.title}|${deck.tagline}`)
      expect(card).toHaveAttribute('data-url', deck.url)
    }
  })

  it('opens the viewer with the clicked deck and closes it again', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    render(<PitchDecksPage />)
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-open', 'false')

    const first = PITCH_DECKS[0]
    fireEvent.click(screen.getByTestId(`open-${first.id}`))
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-open', 'true')
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-path', first.url)

    fireEvent.click(screen.getByTestId('viewer-close'))
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-open', 'false')
    expect(screen.getByTestId('viewer')).toHaveAttribute('data-path', '')
  })

  it('calls useStaggeredReveal with each index', () => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    vi.mocked(useStaggeredReveal).mockClear()
    render(<PitchDecksPage />)
    const indexes = vi.mocked(useStaggeredReveal).mock.calls.map((c) => c[0])
    for (let i = 0; i < PITCH_DECKS.length; i++) expect(indexes).toContain(i)
  })

  it('renders at final state when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    render(<PitchDecksPage />)
    expect(screen.getByRole('heading', { name: 'Pitch Decks' })).toBeInTheDocument()
    expect(screen.getAllByTestId(/^pitch-deck-item-/)).toHaveLength(PITCH_DECKS.length)
  })
})

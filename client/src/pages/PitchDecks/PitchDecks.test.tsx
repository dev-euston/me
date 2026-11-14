import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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
  PitchDeckCard: (props: { id: string; title: string; tagline: string; url: string }) => (
    <div data-testid={`card-${props.id}`} data-url={props.url}>
      {props.title}|{props.tagline}
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

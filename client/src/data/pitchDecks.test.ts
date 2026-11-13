import { describe, it, expect } from 'vitest'
import { PITCH_DECKS } from './pitchDecks'

describe('PITCH_DECKS', () => {
  it('contains exactly 4 decks', () => {
    expect(PITCH_DECKS).toHaveLength(4)
  })

  it('gives every deck non-empty string id, title, tagline and url', () => {
    for (const deck of PITCH_DECKS) {
      for (const key of ['id', 'title', 'tagline', 'url'] as const) {
        expect(typeof deck[key]).toBe('string')
        expect(deck[key].length).toBeGreaterThan(0)
      }
    }
  })

  it('has no duplicate ids', () => {
    const ids = PITCH_DECKS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has urls under /pitch/', () => {
    for (const deck of PITCH_DECKS) {
      expect(deck.url.startsWith('/pitch/')).toBe(true)
    }
  })
})

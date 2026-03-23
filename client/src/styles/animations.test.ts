import { describe, it, expect } from 'vitest'
import { fadeUp, staggerChildren } from './animations'

describe('animation variants', () => {
  describe('fadeUp', () => {
    it('has hidden and visible keys', () => {
      expect(fadeUp).toHaveProperty('hidden')
      expect(fadeUp).toHaveProperty('visible')
    })

    it('hidden state has opacity 0 and y 24', () => {
      expect(fadeUp.hidden).toEqual({ opacity: 0, y: 24 })
    })

    it('visible state has opacity 1 and y 0', () => {
      expect(fadeUp.visible.opacity).toBe(1)
      expect(fadeUp.visible.y).toBe(0)
    })
  })

  describe('staggerChildren', () => {
    it('has hidden and visible keys', () => {
      expect(staggerChildren).toHaveProperty('hidden')
      expect(staggerChildren).toHaveProperty('visible')
    })

    it('visible transition staggers children by 0.1s', () => {
      expect(staggerChildren.visible.transition.staggerChildren).toBe(0.1)
    })
  })
})

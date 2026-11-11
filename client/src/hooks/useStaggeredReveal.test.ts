import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock framer-motion FIRST, using the shared mock file
vi.mock('framer-motion', async () => {
  const mock = await import('../test/mocks/framer-motion')
  return {
    ...mock,
    useInView: vi.fn(() => true),
    useReducedMotion: vi.fn(() => false),
  }
})

// Then import everything after the mock is set up
import { renderHook } from '@testing-library/react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useStaggeredReveal } from './useStaggeredReveal'

describe('useStaggeredReveal', () => {
  it('returns correct animation config for index 0', () => {
    const { result } = renderHook(() => useStaggeredReveal(0))

    expect(result.current).toBeDefined()
    expect(result.current.ref).toBeDefined()
    expect(result.current.variants).toBeDefined()
    expect(result.current.initial).toBe('hidden')
    expect(result.current.animate).toBe('visible')
    expect(result.current.transition.delay).toBe(0)
  })

  it('returns correct animation config for index 1', () => {
    const { result } = renderHook(() => useStaggeredReveal(1))

    expect(result.current.transition.delay).toBe(0.1)
  })

  it('returns correct animation config for index 5', () => {
    const { result } = renderHook(() => useStaggeredReveal(5))

    expect(result.current.transition.delay).toBe(0.5)
  })

  it('provides variants with correct animation values', () => {
    const { result } = renderHook(() => useStaggeredReveal(0))
    const variants = result.current.variants

    expect(variants.hidden).toEqual({ opacity: 0, y: 24 })
    expect(variants.visible).toEqual({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    })
  })

  it('has ref property for useInView attachment', () => {
    const { result } = renderHook(() => useStaggeredReveal(0))

    expect(result.current.ref).toHaveProperty('current')
    expect(result.current.ref.current).toBeNull()
  })

  describe('options', () => {
    beforeEach(() => {
      vi.mocked(useInView).mockClear()
    })

    it('defaults threshold to 0.2', () => {
      renderHook(() => useStaggeredReveal(0))
      expect(useInView).toHaveBeenCalledWith(expect.anything(), { once: true, amount: 0.2 })
    })

    it('accepts a custom threshold', () => {
      renderHook(() => useStaggeredReveal(0, { threshold: 0.5 }))
      expect(useInView).toHaveBeenCalledWith(expect.anything(), { once: true, amount: 0.5 })
    })

    it('defaults once to true', () => {
      renderHook(() => useStaggeredReveal(0, {}))
      expect(useInView).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ once: true })
      )
    })

    it('allows once to be overridden to false', () => {
      renderHook(() => useStaggeredReveal(0, { once: false }))
      expect(useInView).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ once: false })
      )
    })
  })

  describe('reduced motion', () => {
    beforeEach(() => {
      vi.mocked(useReducedMotion).mockReturnValue(true)
    })

    afterEach(() => {
      vi.mocked(useReducedMotion).mockReturnValue(false)
      vi.mocked(useInView).mockReturnValue(true)
    })

    it('starts visible and animates immediately even when not in view', () => {
      vi.mocked(useInView).mockReturnValue(false)
      const { result } = renderHook(() => useStaggeredReveal(2))
      expect(result.current.initial).toBe('visible')
      expect(result.current.animate).toBe('visible')
    })

    it('uses zero delay regardless of index', () => {
      const { result } = renderHook(() => useStaggeredReveal(3))
      expect(result.current.transition.delay).toBe(0)
    })
  })

  it('stays hidden when not in view and motion is allowed', () => {
    vi.mocked(useInView).mockReturnValue(false)
    const { result } = renderHook(() => useStaggeredReveal(1))
    expect(result.current.initial).toBe('hidden')
    expect(result.current.animate).toBe('hidden')
    vi.mocked(useInView).mockReturnValue(true)
  })
})

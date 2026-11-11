import { describe, it, expect, vi } from 'vitest'

// Mock framer-motion FIRST, using the shared mock file
vi.mock('framer-motion', async () => await import('../test/mocks/framer-motion'))

// Then import everything after the mock is set up
import { renderHook } from '@testing-library/react'
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
})

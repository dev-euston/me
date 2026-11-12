import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  it('returns false when prefers-reduced-motion is not set', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when prefers-reduced-motion: reduce is set', () => {
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    window.matchMedia = mockMatchMedia

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})

describe('useReducedMotion change events', () => {
  it('updates when the media query changes', () => {
    let listener: (e: MediaQueryListEvent) => void = () => {}
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listener = cb
      },
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => listener({ matches: true } as MediaQueryListEvent))
    expect(result.current).toBe(true)
  })
})

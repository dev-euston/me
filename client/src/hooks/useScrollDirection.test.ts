import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns "up" on mount', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  it('returns "down" when scrollY increases', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('down')
  })

  it('returns "up" when scrollY decreases', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('up')
  })
})

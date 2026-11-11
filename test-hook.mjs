import { describe, it, expect, vi } from 'vitest'

vi.mock('framer-motion', () => ({
  useInView: () => {
    console.log('useInView called')
    return true
  },
  useReducedMotion: () => {
    console.log('useReducedMotion called')
    return false
  },
  motion: {
    div: ({ children }: any) => children,
  },
  AnimatePresence: ({ children }: any) => children,
  MotionConfig: ({ children }: any) => children,
}))

import { renderHook } from '@testing-library/react'
import { useStaggeredReveal } from './client/src/hooks/useStaggeredReveal.ts'

describe('Debug Hook Test', () => {
  it('renders hook', () => {
    console.log('Starting renderHook')
    try {
      const { result } = renderHook(() => useStaggeredReveal(0))
      console.log('Hook result:', result)
      console.log('result.current:', result.current)
    } catch (e) {
      console.error('Error:', e)
    }
  })
})

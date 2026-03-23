import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useActiveSection } from './useActiveSection'

let observerCallback: IntersectionObserverCallback

const mockDisconnect = vi.fn()
const mockObserve = vi.fn()

beforeEach(() => {
  class MockIntersectionObserver {
    constructor(cb: IntersectionObserverCallback) {
      observerCallback = cb
    }
    observe = mockObserve
    unobserve = vi.fn()
    disconnect = mockDisconnect
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  ;['about', 'projects', 'experience', 'contact'].forEach((id) => {
    const el = document.createElement('div')
    el.id = id
    document.body.appendChild(el)
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

const sectionIds = ['about', 'projects', 'experience', 'contact']

describe('useActiveSection', () => {
  it('returns the first sectionId by default (nothing intersecting)', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds))
    expect(result.current).toBe('about')
  })

  it('returns the id of the intersecting element', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds))
    const projectsEl = document.getElementById('projects')!

    act(() => {
      observerCallback(
        [{ target: projectsEl, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('projects')
  })

  it('returns first intersecting id in sectionIds order when multiple intersect', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds))
    const aboutEl = document.getElementById('about')!
    const projectsEl = document.getElementById('projects')!

    act(() => {
      observerCallback(
        [
          { target: projectsEl, isIntersecting: true } as IntersectionObserverEntry,
          { target: aboutEl, isIntersecting: true } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('about')
  })

  it('does not change activeId when no entries are intersecting', () => {
    const { result } = renderHook(() => useActiveSection(sectionIds))
    const projectsEl = document.getElementById('projects')!

    // First make projects active
    act(() => {
      observerCallback(
        [{ target: projectsEl, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current).toBe('projects')

    // Then fire callback with nothing intersecting — should stay on projects
    act(() => {
      observerCallback(
        [{ target: projectsEl, isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current).toBe('projects')
  })
})

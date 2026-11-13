import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { projects } from '../data/projects'
import { useAdjacentProjects } from './useAdjacentProjects'

describe('useAdjacentProjects', () => {
  const last = projects.length - 1

  it('returns prev and next for a middle project', () => {
    const { result } = renderHook(() => useAdjacentProjects(projects[2].id))
    expect(result.current.prev).toBe(projects[1])
    expect(result.current.next).toBe(projects[3])
  })

  it('wraps prev of the first project to the last project', () => {
    const { result } = renderHook(() => useAdjacentProjects(projects[0].id))
    expect(result.current.prev).toBe(projects[last])
  })

  it('returns the second project as next of the first', () => {
    const { result } = renderHook(() => useAdjacentProjects(projects[0].id))
    expect(result.current.next).toBe(projects[1])
  })

  it('wraps next of the last project to the first project', () => {
    const { result } = renderHook(() => useAdjacentProjects(projects[last].id))
    expect(result.current.next).toBe(projects[0])
  })

  it('returns the second-to-last project as prev of the last', () => {
    const { result } = renderHook(() => useAdjacentProjects(projects[last].id))
    expect(result.current.prev).toBe(projects[last - 1])
  })

  it('returns nulls for an unknown project id', () => {
    const { result } = renderHook(() => useAdjacentProjects('does-not-exist'))
    expect(result.current).toEqual({ prev: null, next: null })
  })
})

describe('useAdjacentProjects with a single project', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('returns nulls when only one project exists', async () => {
    vi.doMock('../data/projects', () => ({
      projects: [{ id: 'only', name: 'Only', description: '', techStack: [] }],
    }))
    const { useAdjacentProjects: hook } = await import('./useAdjacentProjects')
    const { result } = renderHook(() => hook('only'))
    expect(result.current).toEqual({ prev: null, next: null })
    vi.doUnmock('../data/projects')
  })
})

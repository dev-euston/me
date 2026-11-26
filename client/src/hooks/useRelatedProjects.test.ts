import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useRelatedProjects } from './useRelatedProjects'
import type { Project } from '../types'

const make = (id: string, techStack: string[]): Project => ({
  id,
  name: id,
  description: id,
  techStack,
})

const current = make('current', ['React', 'TypeScript'])

describe('useRelatedProjects', () => {
  it('includes only projects sharing at least one tech', () => {
    const a = make('a', ['React'])
    const b = make('b', ['Go'])
    const { result } = renderHook(() => useRelatedProjects(current, [a, b]))
    expect(result.current).toEqual([a])
  })

  it('excludes the current project', () => {
    const { result } = renderHook(() => useRelatedProjects(current, [current]))
    expect(result.current).toEqual([])
  })

  it('sorts by shared-tech count descending', () => {
    const a = make('a', ['React'])
    const b = make('b', ['React', 'TypeScript'])
    const { result } = renderHook(() => useRelatedProjects(current, [a, b]))
    expect(result.current).toEqual([b, a])
  })

  it('breaks ties by array order', () => {
    const a = make('a', ['React'])
    const b = make('b', ['TypeScript'])
    const { result } = renderHook(() => useRelatedProjects(current, [a, b]))
    expect(result.current.map((p) => p.id)).toEqual(['a', 'b'])
  })

  it('returns at most 3', () => {
    const all = ['a', 'b', 'c', 'd', 'e'].map((id) => make(id, ['React']))
    const { result } = renderHook(() => useRelatedProjects(current, all))
    expect(result.current.map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns fewer than 3 when fewer candidates exist', () => {
    const all = [make('a', ['React']), make('b', ['React'])]
    const { result } = renderHook(() => useRelatedProjects(current, all))
    expect(result.current).toHaveLength(2)
  })

  it('returns empty when nothing matches', () => {
    const { result } = renderHook(() => useRelatedProjects(current, [make('a', ['Go'])]))
    expect(result.current).toEqual([])
  })

  it('matches tech case-insensitively', () => {
    const a = make('a', ['react'])
    const { result } = renderHook(() => useRelatedProjects(current, [a]))
    expect(result.current).toEqual([a])
  })
})

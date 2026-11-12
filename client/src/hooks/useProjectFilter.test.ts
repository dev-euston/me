import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProjectFilter } from './useProjectFilter'
import type { Project } from '../types'

const make = (id: string, techStack: string[]): Project => ({
  id,
  name: id,
  description: id,
  techStack,
})

const list = [make('a', ['React', 'Vite']), make('b', ['Node.js']), make('c', ['React', 'Node.js'])]

describe('useProjectFilter', () => {
  it('starts with no filters and returns all projects', () => {
    const { result } = renderHook(() => useProjectFilter())
    expect(result.current.activeFilters.size).toBe(0)
    expect(result.current.filteredProjects(list)).toEqual(list)
  })

  it('toggleFilter adds a tech', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => result.current.toggleFilter('React'))
    expect(result.current.activeFilters.has('React')).toBe(true)
  })

  it('toggleFilter removes an already active tech', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => result.current.toggleFilter('React'))
    act(() => result.current.toggleFilter('React'))
    expect(result.current.activeFilters.size).toBe(0)
  })

  it('clearFilters empties activeFilters', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => result.current.toggleFilter('React'))
    act(() => result.current.toggleFilter('Vite'))
    act(() => result.current.clearFilters())
    expect(result.current.activeFilters.size).toBe(0)
    expect(result.current.filteredProjects(list)).toEqual(list)
  })

  it('filters projects by a single active tech', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => result.current.toggleFilter('Vite'))
    expect(result.current.filteredProjects(list).map((p) => p.id)).toEqual(['a'])
  })

  it('uses OR logic across multiple active techs', () => {
    const { result } = renderHook(() => useProjectFilter())
    act(() => result.current.toggleFilter('Vite'))
    act(() => result.current.toggleFilter('Node.js'))
    expect(result.current.filteredProjects(list).map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })
})

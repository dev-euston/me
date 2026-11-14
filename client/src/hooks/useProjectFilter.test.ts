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
  it('starts with no active tech and returns all projects', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    expect(result.current.activeTech).toBeNull()
    expect(result.current.filteredProjects(list)).toEqual(list)
  })

  it('setActiveTech sets the tech and filters projects', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    act(() => result.current.setActiveTech('Vite'))
    expect(result.current.activeTech).toBe('Vite')
    expect(result.current.filteredProjects(list).map((p) => p.id)).toEqual(['a'])
  })

  it('setActiveTech(null) clears the filter', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    act(() => result.current.setActiveTech('React'))
    act(() => result.current.setActiveTech(null))
    expect(result.current.activeTech).toBeNull()
    expect(result.current.filteredProjects(list)).toEqual(list)
  })

  it('setting the active tech again clears the filter', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    act(() => result.current.setActiveTech('React'))
    act(() => result.current.setActiveTech('React'))
    expect(result.current.activeTech).toBeNull()
  })

  it('selecting a different tech replaces the active one', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    act(() => result.current.setActiveTech('React'))
    act(() => result.current.setActiveTech('Node.js'))
    expect(result.current.activeTech).toBe('Node.js')
    expect(result.current.filteredProjects(list).map((p) => p.id)).toEqual(['b', 'c'])
  })

  it('matches techStack membership case-sensitively', () => {
    const { result } = renderHook(() => useProjectFilter(list))
    act(() => result.current.setActiveTech('react'))
    expect(result.current.filteredProjects(list)).toEqual([])
  })

  it('works without a projects argument', () => {
    const { result } = renderHook(() => useProjectFilter())
    expect(result.current.activeTech).toBeNull()
  })

  it('keeps separate state per hook instance', () => {
    const first = renderHook(() => useProjectFilter(list))
    const second = renderHook(() => useProjectFilter(list))
    act(() => first.result.current.setActiveTech('React'))
    expect(first.result.current.activeTech).toBe('React')
    expect(second.result.current.activeTech).toBeNull()
  })
})

import { describe, it, expect } from 'vitest'
import type { Project } from '../types'
import { findRelatedProjects, DEFAULT_RELATED_PROJECTS_LIMIT } from './projectUtils'

const make = (id: string, techStack: string[]): Project => ({
  id,
  name: id,
  description: '',
  techStack,
})

const current = make('current', ['React', 'TypeScript', 'Vite'])

describe('findRelatedProjects', () => {
  it('returns the top 3 projects ranked by overlap count', () => {
    const all = [
      make('a', ['React']),
      make('b', ['React', 'TypeScript', 'Vite']),
      make('c', ['React', 'TypeScript']),
      make('d', ['Vite']),
    ]
    expect(findRelatedProjects(current, all).map((p) => p.id)).toEqual(['b', 'c', 'a'])
  })

  it('returns an empty array when nothing overlaps', () => {
    expect(findRelatedProjects(current, [make('a', ['Go'])])).toEqual([])
  })

  it('returns fewer than 3 when fewer match', () => {
    const all = [make('a', ['React']), make('b', ['Go']), make('c', ['Vite'])]
    expect(findRelatedProjects(current, all).map((p) => p.id)).toEqual(['a', 'c'])
  })

  it('excludes the current project', () => {
    const all = [current, make('a', ['React'])]
    expect(findRelatedProjects(current, all).map((p) => p.id)).toEqual(['a'])
  })

  it('keeps original order when overlap ties', () => {
    const all = [make('x', ['Vite']), make('y', ['React']), make('z', ['TypeScript'])]
    expect(findRelatedProjects(current, all).map((p) => p.id)).toEqual(['x', 'y', 'z'])
  })

  it('compares tech stack case-insensitively', () => {
    expect(findRelatedProjects(current, [make('a', ['react', 'TYPESCRIPT'])])).toHaveLength(1)
  })

  it('respects a custom limit and exposes the default', () => {
    const all = [make('a', ['React']), make('b', ['Vite'])]
    expect(findRelatedProjects(current, all, 1)).toHaveLength(1)
    expect(DEFAULT_RELATED_PROJECTS_LIMIT).toBe(3)
  })
})

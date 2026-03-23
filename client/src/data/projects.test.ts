import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('exports an array of 3 projects', () => {
    expect(projects).toHaveLength(3)
  })

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.githubUrl).toBeTruthy()
      expect(p.tags.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('first project has no liveUrl', () => {
    expect(projects[0].liveUrl).toBeUndefined()
  })

  it('second project has a liveUrl', () => {
    expect(projects[1].liveUrl).toBeTruthy()
  })
})

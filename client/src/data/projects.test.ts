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

  it('first project (Spell Star) has a demoUrl', () => {
    expect(projects[0].demoUrl).toBe('https://spell.eustonlee.com')
    expect(projects[0].pitchUrl).toBeUndefined()
  })

  it('second project (portfolio) has a demoUrl', () => {
    expect(projects[1].demoUrl).toBe('https://eustonlee.com')
    expect(projects[1].pitchUrl).toBeUndefined()
  })

  it('third project (jira-code) has correct fields', () => {
    expect(projects[2].id).toBe('jira-code')
    expect(projects[2].name).toBe('Jira Code')
    expect(projects[2].description).toBe(
      'Connects your Jira backlog to your codebase. Tickets become pull requests — without leaving Jira.'
    )
    expect(projects[2].githubUrl).toBe('https://github.com/dev-euston/jira-code')
    expect(projects[2].pitchUrl).toBe('/projects/jira-code')
    expect(projects[2].demoUrl).toBeUndefined()
    expect(projects[2].tags).toContain('Next.js')
    expect(projects[2].tags).toContain('Claude AI')
    expect(projects[2].tags).toContain('PostgreSQL')
    expect(projects[2].tags).toContain('GitHub API')
    expect(projects[2].tags).toContain('Jira REST API')
    expect(projects[2].tags).toContain('TypeScript')
  })

  it('no project uses the removed liveUrl field', () => {
    for (const p of projects) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((p as any).liveUrl).toBeUndefined()
    }
  })
})

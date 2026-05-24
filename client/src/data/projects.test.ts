import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('exports an array of 5 projects', () => {
    expect(projects).toHaveLength(5)
  })

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.description).toBeTruthy()
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

  it('fourth project (mr-reviewer) has correct fields', () => {
    expect(projects[3].id).toBe('mr-reviewer')
    expect(projects[3].name).toBe('MR Reviewer')
    expect(projects[3].description).toBe(
      'AI-powered code review triage — unified, persistent, and entirely under your control.'
    )
    expect(projects[3].githubUrl).toBe('https://github.com/dev-euston/mr-reviewer')
    expect(projects[3].pitchUrl).toBe('/projects/mr-reviewer')
    expect(projects[3].demoUrl).toBeUndefined()
    expect(projects[3].tags).toContain('Next.js')
    expect(projects[3].tags).toContain('React')
    expect(projects[3].tags).toContain('TypeScript')
    expect(projects[3].tags).toContain('Tailwind CSS')
    expect(projects[3].tags).toContain('GitLab API')
    expect(projects[3].tags).toContain('Claude AI')
  })

  it('fifth project (mission-singapore) has correct fields', () => {
    expect(projects[4].id).toBe('mission-singapore')
    expect(projects[4].name).toBe('Mission: Singapore')
    expect(projects[4].pitchUrl).toBe('/projects/mission-singapore')
    expect(projects[4].demoUrl).toBe('https://ms.eustonlee.com')
    expect(projects[4].tags).toContain('Mobile')
    expect(projects[4].tags).toContain('GPS')
    expect(projects[4].githubUrl).toBeUndefined()
  })

  it('no project uses the removed liveUrl field', () => {
    for (const p of projects) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((p as any).liveUrl).toBeUndefined()
    }
  })
})

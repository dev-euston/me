import { describe, it, expect } from 'vitest'
import { projects, getAllTechStacks } from './projects'

describe('projects data', () => {
  it('exports an array of 7 projects', () => {
    expect(projects).toHaveLength(7)
  })

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.techStack.length).toBeGreaterThanOrEqual(1)
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
    expect(projects[2].githubUrl).toBeUndefined()
    expect(projects[2].pitchUrl).toBe('/projects/jira-code')
    expect(projects[2].demoUrl).toBeUndefined()
    expect(projects[2].techStack).toContain('Next.js')
    expect(projects[2].techStack).toContain('Claude AI')
    expect(projects[2].techStack).toContain('PostgreSQL')
    expect(projects[2].techStack).toContain('GitHub API')
    expect(projects[2].techStack).toContain('Jira REST API')
    expect(projects[2].techStack).toContain('TypeScript')
  })

  it('fourth project (mr-reviewer) has correct fields', () => {
    expect(projects[3].id).toBe('mr-reviewer')
    expect(projects[3].name).toBe('MR Reviewer')
    expect(projects[3].description).toBe(
      'AI-powered code review triage — unified, persistent, and entirely under your control.'
    )
    expect(projects[3].githubUrl).toBeUndefined()
    expect(projects[3].pitchUrl).toBe('/projects/mr-reviewer')
    expect(projects[3].demoUrl).toBeUndefined()
    expect(projects[3].techStack).toContain('Next.js')
    expect(projects[3].techStack).toContain('React')
    expect(projects[3].techStack).toContain('TypeScript')
    expect(projects[3].techStack).toContain('Tailwind CSS')
    expect(projects[3].techStack).toContain('GitLab API')
    expect(projects[3].techStack).toContain('Claude AI')
  })

  it('fifth project (mission-singapore) has correct fields', () => {
    expect(projects[4].id).toBe('mission-singapore')
    expect(projects[4].name).toBe('Mission: Singapore')
    expect(projects[4].pitchUrl).toBe('/projects/mission-singapore')
    expect(projects[4].demoUrl).toBe('https://ms.eustonlee.com')
    expect(projects[4].techStack).toContain('Mobile')
    expect(projects[4].techStack).toContain('GPS')
    expect(projects[4].githubUrl).toBeUndefined()
  })

  it('sixth project (appraisal-helper) has correct fields', () => {
    expect(projects[5].id).toBe('appraisal-helper')
    expect(projects[5].name).toBe('Appraisal Helper')
    expect(projects[5].pitchUrl).toBe('/projects/appraisal-helper')
    expect(projects[5].githubUrl).toBeUndefined()
    expect(projects[5].demoUrl).toBeUndefined()
    expect(projects[5].techStack).toContain('Next.js')
    expect(projects[5].techStack).toContain('TypeScript')
    expect(projects[5].techStack).toContain('Claude AI')
    expect(projects[5].techStack).toContain('GitLab API')
    expect(projects[5].techStack).toContain('Confluence API')
    expect(projects[5].techStack).toContain('PostgreSQL')
  })

  it('seventh project (markdown-commenter) has correct fields', () => {
    expect(projects[6].id).toBe('markdown-commenter')
    expect(projects[6].name).toBe('Markdown Commenter')
    expect(projects[6].githubUrl).toBe('https://github.com/dev-euston/markdown-commenter')
    expect(projects[6].externalPitchUrl).toBe(
      'https://markdown-commenter.eustonlee.com/?doc=pitchdeck'
    )
    expect(projects[6].demoUrl).toBe('https://markdown-commenter.eustonlee.com')
    expect(projects[6].pitchUrl).toBeUndefined()
    expect(projects[6].techStack).toContain('Next.js')
    expect(projects[6].techStack).toContain('React')
    expect(projects[6].techStack).toContain('TypeScript')
    expect(projects[6].techStack).toContain('Tailwind CSS')
  })

  it('no project uses the removed liveUrl field', () => {
    for (const p of projects) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((p as any).liveUrl).toBeUndefined()
    }
  })
})

describe('getAllTechStacks', () => {
  it('returns strings in alphabetical order', () => {
    const techs = getAllTechStacks()
    expect(techs.length).toBeGreaterThan(0)
    expect(techs).toEqual([...techs].sort())
  })

  it('contains no duplicate values', () => {
    const techs = getAllTechStacks()
    expect(new Set(techs).size).toBe(techs.length)
  })

  it('includes every technology from every project', () => {
    const techs = getAllTechStacks()
    for (const p of projects) {
      for (const t of p.techStack) {
        expect(techs).toContain(t)
      }
    }
  })
})

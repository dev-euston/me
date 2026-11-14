import { describe, it, expect } from 'vitest'
import { SKILLS } from './skills'

describe('SKILLS', () => {
  it('is an array', () => {
    expect(Array.isArray(SKILLS)).toBe(true)
  })

  it('has category string and skills string[] on every entry', () => {
    for (const entry of SKILLS) {
      expect(typeof entry.category).toBe('string')
      expect(Array.isArray(entry.skills)).toBe(true)
      for (const skill of entry.skills) expect(typeof skill).toBe('string')
    }
  })

  it('has at least 3 categories', () => {
    expect(SKILLS.length).toBeGreaterThanOrEqual(3)
  })

  it('has at least 15 skills in total', () => {
    const total = SKILLS.reduce((sum, c) => sum + c.skills.length, 0)
    expect(total).toBeGreaterThanOrEqual(15)
  })

  it('has no empty category names or skills', () => {
    for (const entry of SKILLS) {
      expect(entry.category.trim()).not.toBe('')
      for (const skill of entry.skills) expect(skill.trim()).not.toBe('')
    }
  })

  it('has no duplicate skills within a category', () => {
    for (const entry of SKILLS) {
      expect(new Set(entry.skills).size).toBe(entry.skills.length)
    }
  })
})

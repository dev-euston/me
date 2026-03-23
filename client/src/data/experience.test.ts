import { describe, it, expect } from 'vitest'
import { experience } from './experience'

describe('experience data', () => {
  it('exports an array of 5 entries', () => {
    expect(experience).toHaveLength(5)
  })

  it('each entry has required fields', () => {
    for (const e of experience) {
      expect(e.id).toBeTruthy()
      expect(e.company).toBeTruthy()
      expect(e.role).toBeTruthy()
      expect(e.startDate).toBeTruthy()
      expect(e.endDate).toBeTruthy()
      expect(e.bullets.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('first entry is the most recent role', () => {
    expect(experience[0].company).toBe('GovTech Singapore')
    expect(experience[0].endDate).toBe('Present')
  })
})

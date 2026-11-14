import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))

import { SkillTag } from './SkillTag'

describe('SkillTag', () => {
  it('renders the skill text', () => {
    render(<SkillTag skill="TypeScript" />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders inside a div element', () => {
    render(<SkillTag skill="React" />)
    expect(screen.getByTestId('skill-tag').tagName).toBe('DIV')
  })

  it('uses no hardcoded colours', () => {
    render(<SkillTag skill="React" />)
    const tag = screen.getByTestId('skill-tag')
    expect(tag.getAttribute('style') ?? '').not.toMatch(/#|rgb/i)
    expect(tag.className).not.toMatch(/#[0-9a-f]{3,6}|rgb/i)
  })
})

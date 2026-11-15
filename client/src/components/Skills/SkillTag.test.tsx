import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

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

  it('has no button semantics without onSelect', () => {
    render(<SkillTag skill="React" />)
    const tag = screen.getByTestId('skill-tag')
    expect(tag).not.toHaveAttribute('role')
    expect(tag).not.toHaveAttribute('tabindex')
  })

  describe('interactive', () => {
    it('renders as an accessible button', () => {
      render(<SkillTag skill="React" onSelect={vi.fn()} />)
      const tag = screen.getByRole('button', { name: 'React' })
      expect(tag).toHaveAttribute('tabindex', '0')
      expect(tag).toHaveAttribute('aria-pressed', 'false')
      expect(tag.className).toContain('cursor-pointer')
      expect(tag.className).not.toContain('bg-accent')
    })

    it('calls onSelect on click', () => {
      const onSelect = vi.fn()
      render(<SkillTag skill="React" onSelect={onSelect} />)
      fireEvent.click(screen.getByRole('button'))
      expect(onSelect).toHaveBeenCalledWith('React')
    })

    it('calls onSelect on Enter and Space', () => {
      const onSelect = vi.fn()
      render(<SkillTag skill="React" onSelect={onSelect} />)
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' })
      expect(onSelect).toHaveBeenCalledTimes(2)
    })

    it('ignores other keys', () => {
      const onSelect = vi.fn()
      render(<SkillTag skill="React" onSelect={onSelect} />)
      fireEvent.keyDown(screen.getByRole('button'), { key: 'a' })
      expect(onSelect).not.toHaveBeenCalled()
    })

    it('applies active styling and aria-pressed when isActive', () => {
      render(<SkillTag skill="React" onSelect={vi.fn()} isActive />)
      const tag = screen.getByRole('button')
      expect(tag).toHaveAttribute('aria-pressed', 'true')
      expect(tag.className).toContain('bg-accent')
    })
  })
})

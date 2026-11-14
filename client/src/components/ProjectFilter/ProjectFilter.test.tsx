import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createElement } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

const motionProps = vi.hoisted(() => ({ chips: [] as Array<Record<string, unknown>> }))

vi.mock('framer-motion', async () => {
  const mock = await import('../../test/mocks/framer-motion')
  return {
    ...mock,
    motion: {
      ...mock.motion,
      button: (props: Record<string, unknown>) => {
        motionProps.chips.push(props)
        return createElement(mock.motion.button, props as never)
      },
    },
  }
})

const reduced = vi.hoisted(() => ({ value: false }))
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => reduced.value }))

import { ProjectFilter } from './index'

const allTags = ['React', 'Vite']

function setup(activeTech: string | null = null) {
  const onSetActiveTech = vi.fn()
  render(
    <ProjectFilter activeTech={activeTech} onSetActiveTech={onSetActiveTech} allTags={allTags} />
  )
  return { onSetActiveTech }
}

describe('ProjectFilter', () => {
  beforeEach(() => {
    motionProps.chips.length = 0
    reduced.value = false
  })

  it('renders the All chip', () => {
    setup()
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
  })

  it('renders one chip per technology', () => {
    setup()
    expect(screen.getAllByRole('button')).toHaveLength(allTags.length + 1)
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Vite' })).toBeInTheDocument()
  })

  it('calls onSetActiveTech with the tech when a chip is clicked', () => {
    const { onSetActiveTech } = setup()
    fireEvent.click(screen.getByRole('button', { name: 'React' }))
    expect(onSetActiveTech).toHaveBeenCalledWith('React')
  })

  it('calls onSetActiveTech(null) when All is clicked', () => {
    const { onSetActiveTech } = setup('React')
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(onSetActiveTech).toHaveBeenCalledWith(null)
  })

  it('styles active chips differently from inactive chips', () => {
    setup('React')
    const active = screen.getByRole('button', { name: 'React' })
    const inactive = screen.getByRole('button', { name: 'Vite' })
    expect(active).toHaveAttribute('aria-pressed', 'true')
    expect(inactive).toHaveAttribute('aria-pressed', 'false')
    expect(active.className).toContain('bg-accent')
    expect(inactive.className).not.toContain('bg-accent')
    expect(screen.getByRole('button', { name: 'All' }).className).not.toContain('bg-accent')
  })

  it('highlights All when activeTech is null', () => {
    setup()
    expect(screen.getByRole('button', { name: 'All' }).className).toContain('bg-accent')
  })

  it('animates with a non-zero duration by default', () => {
    setup()
    motionProps.chips.forEach((c) => expect(c.transition).toEqual({ duration: 0.2 }))
  })

  it('skips animation duration under reduced motion', () => {
    reduced.value = true
    setup()
    motionProps.chips.forEach((c) => expect(c.transition).toEqual({ duration: 0 }))
  })
})

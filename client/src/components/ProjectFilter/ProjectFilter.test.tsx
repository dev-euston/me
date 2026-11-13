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

const techs = ['React', 'Vite']

function setup(active: string[] = []) {
  const onFilterChange = vi.fn()
  const onReset = vi.fn()
  render(
    <ProjectFilter
      techs={techs}
      activeFilters={new Set(active)}
      onFilterChange={onFilterChange}
      onReset={onReset}
    />
  )
  return { onFilterChange, onReset }
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
    expect(screen.getAllByRole('button')).toHaveLength(techs.length + 1)
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Vite' })).toBeInTheDocument()
  })

  it('calls onFilterChange with the tech when a chip is clicked', () => {
    const { onFilterChange } = setup()
    fireEvent.click(screen.getByRole('button', { name: 'React' }))
    expect(onFilterChange).toHaveBeenCalledWith('React')
  })

  it('calls onReset when All is clicked', () => {
    const { onReset } = setup()
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('styles active chips differently from inactive chips', () => {
    setup(['React'])
    const active = screen.getByRole('button', { name: 'React' })
    const inactive = screen.getByRole('button', { name: 'Vite' })
    expect(active).toHaveAttribute('aria-pressed', 'true')
    expect(inactive).toHaveAttribute('aria-pressed', 'false')
    expect(active.className).toContain('bg-accent')
    expect(inactive.className).not.toContain('bg-accent')
    expect(screen.getByRole('button', { name: 'All' }).className).not.toContain('bg-accent')
  })

  it('highlights All when no filters are active', () => {
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

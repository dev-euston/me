import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'

const motionProps = vi.hoisted(() => ({ current: {} as Record<string, unknown> }))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      ...rest
    }: {
      children: React.ReactNode
      initial: unknown
      animate: unknown
      exit: unknown
      transition: unknown
    }) => {
      motionProps.current = { initial, animate, exit, transition }
      return <div {...rest}>{children}</div>
    },
  },
}))
vi.mock('../../hooks/useReducedMotion')
vi.mock('../../hooks/useFocusTrap')

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { PitchDeckViewer } from './PitchDeckViewer'

const deck = { path: '/pitch/x/index.html', title: 'Deck X' }

function setup(props: Partial<React.ComponentProps<typeof PitchDeckViewer>> = {}) {
  const onClose = vi.fn()
  const triggerRef = createRef<HTMLElement>()
  const utils = render(
    <PitchDeckViewer isOpen deck={deck} onClose={onClose} triggerRef={triggerRef} {...props} />
  )
  return { onClose, triggerRef, ...utils }
}

describe('PitchDeckViewer', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    vi.mocked(useFocusTrap).mockClear()
  })

  it('does not render when closed', () => {
    setup({ isOpen: false })
    expect(screen.queryByTestId('pitch-deck-viewer')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not render when deck is null', () => {
    setup({ deck: null })
    expect(screen.queryByTestId('pitch-deck-viewer')).not.toBeInTheDocument()
  })

  it('renders the dialog with an iframe pointing at the deck', () => {
    setup()
    expect(screen.getByRole('dialog', { name: 'Deck X' })).toBeInTheDocument()
    expect(screen.getByTitle('Deck X')).toHaveAttribute('src', '/pitch/x/index.html')
  })

  it('calls onClose when the close button is clicked', () => {
    const { onClose } = setup()
    fireEvent.click(screen.getByRole('button', { name: 'Close pitch deck' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape and ignores other keys', () => {
    const { onClose } = setup()
    fireEvent.keyDown(document, { key: 'a' })
    expect(onClose).not.toHaveBeenCalled()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('activates the focus trap while open and focuses the close button', () => {
    setup()
    expect(vi.mocked(useFocusTrap)).toHaveBeenCalledWith(expect.anything(), true)
    expect(screen.getByRole('button', { name: 'Close pitch deck' })).toHaveFocus()
  })

  it('deactivates the focus trap while closed', () => {
    setup({ isOpen: false })
    expect(vi.mocked(useFocusTrap)).toHaveBeenCalledWith(expect.anything(), false)
  })

  it('fades in and out when motion is allowed', () => {
    setup()
    expect(motionProps.current.initial).toEqual({ opacity: 0 })
    expect(motionProps.current.animate).toEqual({ opacity: 1 })
    expect(motionProps.current.exit).toEqual({ opacity: 0 })
    expect(motionProps.current.transition).toEqual({ duration: 0.2 })
  })

  it('is instant when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)
    setup()
    expect(motionProps.current.initial).toEqual({ opacity: 1 })
    expect(motionProps.current.transition).toEqual({ duration: 0 })
  })

  it('returns focus to the trigger on close', () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    const triggerRef = { current: trigger }
    const { rerender } = setup({ triggerRef })
    rerender(<PitchDeckViewer isOpen={false} deck={deck} onClose={vi.fn()} triggerRef={triggerRef} />)
    expect(trigger).toHaveFocus()
    trigger.remove()
  })

  it('does not throw on close when there is no trigger', () => {
    const { rerender, triggerRef } = setup()
    expect(() =>
      rerender(
        <PitchDeckViewer isOpen={false} deck={deck} onClose={vi.fn()} triggerRef={triggerRef} />
      )
    ).not.toThrow()
  })
})

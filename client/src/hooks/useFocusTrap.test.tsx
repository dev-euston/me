import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRef } from 'react'
import { useFocusTrap } from './useFocusTrap'

function Harness({ active = true, empty = false }: { active?: boolean; empty?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active)
  return (
    <div>
      <button>outside</button>
      <div ref={ref} data-testid="container">
        {!empty && (
          <>
            <button>first</button>
            <a href="#x">second</a>
            <button>third</button>
          </>
        )}
      </div>
    </div>
  )
}

function NoContainer() {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref)
  return <p>nothing</p>
}

describe('useFocusTrap', () => {
  it('does nothing when inactive', () => {
    render(<Harness active={false} />)
    screen.getByText('third').focus()
    const notPrevented = fireEvent.keyDown(document, { key: 'Tab' })
    expect(notPrevented).toBe(true)
  })

  it('ignores non-Tab keys', () => {
    render(<Harness />)
    screen.getByText('third').focus()
    expect(fireEvent.keyDown(document, { key: 'a' })).toBe(true)
  })

  it('does nothing when the ref is empty', () => {
    render(<NoContainer />)
    expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(true)
  })

  it('wraps Tab from last to first', () => {
    render(<Harness />)
    screen.getByText('third').focus()
    expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(false)
    expect(screen.getByText('first')).toHaveFocus()
  })

  it('moves focus into the container when focus is outside', () => {
    render(<Harness />)
    screen.getByText('outside').focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(screen.getByText('first')).toHaveFocus()
  })

  it('leaves Tab in the middle to the browser', () => {
    render(<Harness />)
    screen.getByText('first').focus()
    expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(true)
  })

  it('wraps Shift+Tab from first to last', () => {
    render(<Harness />)
    screen.getByText('first').focus()
    expect(fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })).toBe(false)
    expect(screen.getByText('third')).toHaveFocus()
  })

  it('leaves Shift+Tab in the middle to the browser', () => {
    render(<Harness />)
    screen.getByText('second').focus()
    expect(fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })).toBe(true)
  })

  it('prevents Tab when there are no focusable elements', () => {
    render(<Harness empty />)
    expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(false)
  })

  it('removes the listener on unmount', () => {
    const { unmount } = render(<Harness empty />)
    unmount()
    expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(true)
  })
})

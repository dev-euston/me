import { describe, it, expect } from 'vitest'
import { render, renderHook, act, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { TechFilterProvider, useTechFilter } from './TechFilterContext'

const wrapper = ({ children }: { children: ReactNode }) => (
  <TechFilterProvider>{children}</TechFilterProvider>
)

describe('TechFilterContext', () => {
  it('starts with activeTech null and a setter function', () => {
    const { result } = renderHook(() => useTechFilter(), { wrapper })
    expect(result.current.activeTech).toBeNull()
    expect(typeof result.current.setActiveTech).toBe('function')
  })

  it('updates activeTech when set', () => {
    const { result } = renderHook(() => useTechFilter(), { wrapper })
    act(() => result.current.setActiveTech('React'))
    expect(result.current.activeTech).toBe('React')
  })

  it('clears the filter with null', () => {
    const { result } = renderHook(() => useTechFilter(), { wrapper })
    act(() => result.current.setActiveTech('React'))
    act(() => result.current.setActiveTech(null))
    expect(result.current.activeTech).toBeNull()
  })

  it('throws outside the provider', () => {
    expect(() => renderHook(() => useTechFilter())).toThrow(
      'useTechFilter must be used within a TechFilterProvider'
    )
  })

  it('shares state across consumers', () => {
    function Reader({ id }: { id: string }) {
      const { activeTech } = useTechFilter()
      return <span data-testid={id}>{activeTech ?? 'none'}</span>
    }
    function Setter() {
      const { setActiveTech } = useTechFilter()
      return <button onClick={() => setActiveTech('Vite')}>set</button>
    }
    render(
      <TechFilterProvider>
        <Reader id="a" />
        <Reader id="b" />
        <Setter />
      </TechFilterProvider>
    )
    expect(screen.getByTestId('a')).toHaveTextContent('none')
    act(() => screen.getByText('set').click())
    expect(screen.getByTestId('a')).toHaveTextContent('Vite')
    expect(screen.getByTestId('b')).toHaveTextContent('Vite')
  })
})

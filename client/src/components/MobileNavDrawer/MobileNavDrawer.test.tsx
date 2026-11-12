import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
vi.mock('../../hooks/useReducedMotion')

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MobileNavDrawer } from './MobileNavDrawer'

const mockReduced = vi.mocked(useReducedMotion)

describe('MobileNavDrawer', () => {
  it('renders all nav links when open', () => {
    mockReduced.mockReturnValue(false)
    render(<MobileNavDrawer isOpen onClose={() => {}} />)
    for (const name of ['Home', 'About', 'Projects', 'Experience', 'Contact']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
  })

  it('renders nothing when closed', () => {
    mockReduced.mockReturnValue(false)
    render(<MobileNavDrawer isOpen={false} onClose={() => {}} />)
    expect(screen.queryByTestId('mobile-nav-drawer')).not.toBeInTheDocument()
    expect(screen.queryByTestId('mobile-nav-backdrop')).not.toBeInTheDocument()
  })

  it('calls onClose when a link is clicked', () => {
    mockReduced.mockReturnValue(false)
    const onClose = vi.fn()
    render(<MobileNavDrawer isOpen onClose={onClose} />)
    fireEvent.click(screen.getByRole('link', { name: 'Projects' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the backdrop is clicked', () => {
    mockReduced.mockReturnValue(false)
    const onClose = vi.fn()
    render(<MobileNavDrawer isOpen onClose={onClose} />)
    fireEvent.click(screen.getByTestId('mobile-nav-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape but not on other keys', () => {
    mockReduced.mockReturnValue(false)
    const onClose = vi.fn()
    render(<MobileNavDrawer isOpen onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(onClose).not.toHaveBeenCalled()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not listen for Escape when closed', () => {
    mockReduced.mockReturnValue(false)
    const onClose = vi.fn()
    render(<MobileNavDrawer isOpen={false} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('removes the Escape listener on unmount', () => {
    mockReduced.mockReturnValue(false)
    const onClose = vi.fn()
    const { unmount } = render(<MobileNavDrawer isOpen onClose={onClose} />)
    unmount()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders with reduced motion', () => {
    mockReduced.mockReturnValue(true)
    render(<MobileNavDrawer isOpen onClose={() => {}} />)
    expect(screen.getByTestId('mobile-nav-drawer')).toBeInTheDocument()
  })

  it('styles backdrop and drawer with overlay, z-index and full height', () => {
    mockReduced.mockReturnValue(false)
    render(<MobileNavDrawer isOpen onClose={() => {}} />)
    expect(screen.getByTestId('mobile-nav-backdrop')).toHaveClass('bg-black/60', 'z-[999]')
    const drawer = screen.getByTestId('mobile-nav-drawer')
    expect(drawer).toHaveClass('h-screen', 'z-[1000]', 'bg-bg', 'text-text')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

const motionAProps = vi.fn()
const mockReducedMotion = vi.fn()

vi.mock('framer-motion', () => ({
  motion: {
    a: ({ children, whileHover, ...props }: Record<string, unknown>) => {
      motionAProps({ whileHover })
      return <a {...props}>{children as React.ReactNode}</a>
    },
  },
}))
vi.mock('../../hooks/useReducedMotion', () => ({
  useReducedMotion: () => mockReducedMotion(),
}))

import { ResumeDownload } from './ResumeDownload'
import DefaultResumeDownload from './index'

describe('ResumeDownload', () => {
  beforeEach(() => {
    motionAProps.mockClear()
    mockReducedMotion.mockReturnValue(false)
  })

  it('renders a link with href matching resumeUrl', () => {
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/resume.pdf')
  })

  it('sets the download attribute', () => {
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(screen.getByRole('link')).toHaveAttribute('download', 'euston-lee-resume.pdf')
  })

  it('renders the download icon', () => {
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(screen.getByTestId('download-icon')).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(screen.getByText('Download Resume')).toBeInTheDocument()
  })

  it('passes whileHover when reduced motion is off', () => {
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(motionAProps).toHaveBeenCalledWith({ whileHover: { scale: 1.05 } })
  })

  it('omits whileHover when reduced motion is on', () => {
    mockReducedMotion.mockReturnValue(true)
    render(<ResumeDownload resumeUrl="/resume.pdf" />)
    expect(motionAProps).toHaveBeenCalledWith({ whileHover: undefined })
  })

  it('is the default export of the index module', () => {
    expect(DefaultResumeDownload).toBe(ResumeDownload)
  })
})

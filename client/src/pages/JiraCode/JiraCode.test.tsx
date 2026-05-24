import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JiraCodePage } from './JiraCode'

describe('JiraCodePage', () => {
  it('renders an iframe', () => {
    const { container } = render(<JiraCodePage />)
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
  })

  it('iframe src points to the static pitch deck', () => {
    const { container } = render(<JiraCodePage />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('/pitch/jira-code.html')
  })

  it('iframe fills the viewport', () => {
    const { container } = render(<JiraCodePage />)
    const iframe = container.querySelector('iframe') as HTMLIFrameElement
    expect(iframe.style.width).toBe('100%')
    expect(iframe.style.height).toBe('100vh')
  })
})

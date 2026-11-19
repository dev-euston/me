import { describe, it, expect, vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const mock = await import('../../test/mocks/framer-motion')
  return {
    ...mock,
    useInView: vi.fn(() => true),
    useReducedMotion: vi.fn(() => false),
  }
})

import { render, screen } from '@testing-library/react'
import { ProjectMetrics } from './index'

const metrics = [
  { label: 'Users', value: '100+' },
  { label: 'Accuracy', value: '96%' },
]

describe('ProjectMetrics', () => {
  it('renders nothing when metrics is undefined', () => {
    const { container } = render(<ProjectMetrics />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when metrics is empty', () => {
    const { container } = render(<ProjectMetrics metrics={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a flex row with one tile per metric', () => {
    render(<ProjectMetrics metrics={metrics} />)
    expect(screen.getByTestId('project-metrics')).toHaveClass('flex', 'flex-wrap')
    expect(screen.getAllByTestId('project-metric')).toHaveLength(2)
  })

  it('shows each label and value', () => {
    render(<ProjectMetrics metrics={metrics} />)
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('96%')).toBeInTheDocument()
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })
})

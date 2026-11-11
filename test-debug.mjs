import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeAll, describe, it, expect, vi } from 'vitest'

vi.mock('framer-motion', async () => await import('./client/src/test/mocks/framer-motion.tsx'))

beforeAll(async () => {
  // Import after mock is set up
})

const { Projects } = await import('./client/src/components/Projects/Projects.tsx')
const { projects } = await import('./client/src/data/projects.ts')

describe('Debug Test', () => {
  it('renders', () => {
    try {
      const result = render(<MemoryRouter><Projects projects={projects} /></MemoryRouter>)
      console.log('Render succeeded')
      console.log('Container:', result.container.innerHTML)
    } catch (e) {
      console.error('Render failed:', e)
    }
  })
})

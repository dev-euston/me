import React from 'react'
import '@testing-library/jest-dom'

// Polyfill React.act for vitest + jsdom + React 19 compatibility
// testing-library's act-compat tries to use React.act, but it's not available in jsdom without explicit setup
if (typeof React.act !== 'function') {
  React.act = ((callback: () => any) => {
    const result = callback()
    return result instanceof Promise ? result : Promise.resolve(result)
  }) as any
}

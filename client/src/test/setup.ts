import React from 'react'
import '@testing-library/jest-dom'

// Polyfill React.act for vitest + jsdom + React 19 compatibility
// testing-library tries to use React.act via react-dom, but it's not available in jsdom without explicit setup
if (typeof React.act !== 'function') {
  React.act = async (callback: () => any) => {
    const result = callback()
    if (result instanceof Promise) {
      await result
    }
  }
}

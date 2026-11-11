import React from 'react'
import '@testing-library/jest-dom'

// Polyfill React.act for vitest + jsdom + React 19 compatibility
// testing-library tries to use React.act, and jsdom needs a synchronous version
if (typeof React.act !== 'function') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polyfill must match React.act overloads
  React.act = (callback: () => any) => {
    return callback()
  }
}

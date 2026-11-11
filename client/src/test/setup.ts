import React from 'react'
import '@testing-library/jest-dom'

// Polyfill React.act for vitest + jsdom + React 19 compatibility
// testing-library tries to use React.act, and jsdom needs a synchronous version
if (typeof React.act !== 'function') {
  React.act = (callback: () => any) => {
    return callback()
  }
}

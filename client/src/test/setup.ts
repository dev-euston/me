import '@testing-library/jest-dom'

// Polyfill React.act for React 19 compatibility with testing library
// This must be done synchronously before any tests run
import React from 'react'
import ReactDOM from 'react-dom'

const ReactNamespace = React as any

// First try to use exported act from react
if (!ReactNamespace.act) {
  try {
    // Create a wrapper that works like the real act
    ReactNamespace.act = (callback: () => void | Promise<void>) => {
      const result = callback()
      if (result instanceof Promise) {
        return result
      }
      return Promise.resolve()
    }
  } catch (e) {
    console.warn('Failed to polyfill React.act:', e)
  }
}

// Also ensure ReactDOM has act if needed
if ((ReactDOM as any).act && !ReactNamespace.act) {
  ReactNamespace.act = (ReactDOM as any).act
}

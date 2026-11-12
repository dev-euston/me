/* eslint-disable @typescript-eslint/no-explicit-any -- test setup polyfill */
import '@testing-library/jest-dom'
import React from 'react'
import ReactDOM from 'react-dom'

// Ensure React.act is available for testing-library
const ReactDOMTestUtils = (ReactDOM as any).unstable_batchedUpdates ? ReactDOM : (ReactDOM as any).default
if (!React.act && (ReactDOMTestUtils as any).act) {
  React.act = (ReactDOMTestUtils as any).act
}

// Fallback if neither is available
if (!React.act) {
  React.act = ((callback: (() => any) | (() => Promise<any>)) => {
    const result = callback()
    if (result && typeof result.then === 'function') {
      return result
    }
    return Promise.resolve(result)
  }) as any
}

/* eslint-disable react-refresh/only-export-components -- test mock, not a real module */
import React from 'react'

function MotionDiv({ children, ...props }: any, ref: any) {
  return React.createElement('div', { ...props, ref }, children)
}

export const motion = {
  div: React.forwardRef(MotionDiv),
}

export function useInView(ref: any, options?: any) {
  return true
}

export function useReducedMotion() {
  return false
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export const MotionConfig = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

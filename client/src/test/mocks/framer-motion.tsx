/* eslint-disable react-refresh/only-export-components -- test mock, not a real module */
import React from 'react'

// Plain named exports — NOT a vi.mock() call.
// This file is used as the factory for vi.mock in each test file.
export const motion = {
  // All animated elements in the codebase use motion.div only (spec constraint).
  // This keeps the mock complete. Never use motion.h1, motion.p, etc.
  div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
      <div {...props} ref={ref}>
        {children}
      </div>
    )
  ),
}

export const useInView = () => true

export const useReducedMotion = () => false

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export const MotionConfig = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

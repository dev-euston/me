/* eslint-disable react-refresh/only-export-components -- test mock, not a real module */
import React, { forwardRef } from 'react'

const MotionDivComponent = forwardRef<HTMLDivElement, any>(
  ({ children, initial, animate, variants, whileInView, viewport, transition, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

MotionDivComponent.displayName = 'MotionDiv'

export const motion = {
  div: MotionDivComponent,
}

export function useInView(_ref: any, _options?: any): boolean {
  return true
}

export function useReducedMotion(): boolean {
  return false
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export const MotionConfig = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

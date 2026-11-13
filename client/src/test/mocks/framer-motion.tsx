/* eslint-disable react-refresh/only-export-components, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars -- test mock, not a real module */
import React, { forwardRef } from 'react'

const MotionDivComponent = forwardRef<HTMLDivElement, any>(
  (
    {
      children,
      initial,
      animate,
      exit,
      layout,
      variants,
      whileInView,
      viewport,
      transition,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

MotionDivComponent.displayName = 'MotionDiv'

const MotionSpanComponent = forwardRef<HTMLSpanElement, any>(
  (
    {
      children,
      initial,
      animate,
      exit,
      layout,
      variants,
      whileInView,
      viewport,
      transition,
      ...props
    },
    ref
  ) => {
    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    )
  }
)

MotionSpanComponent.displayName = 'MotionSpan'

const MotionButtonComponent = forwardRef<HTMLButtonElement, any>(
  (
    {
      children,
      initial,
      animate,
      exit,
      layout,
      variants,
      whileInView,
      viewport,
      transition,
      ...props
    },
    ref
  ) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

MotionButtonComponent.displayName = 'MotionButton'

const MotionAnchorComponent = forwardRef<HTMLAnchorElement, any>(
  (
    {
      children,
      initial,
      animate,
      exit,
      layout,
      variants,
      whileInView,
      whileHover,
      viewport,
      transition,
      ...props
    },
    ref
  ) => {
    return (
      <a ref={ref} {...props}>
        {children}
      </a>
    )
  }
)

MotionAnchorComponent.displayName = 'MotionAnchor'

export const motion = {
  a: MotionAnchorComponent,
  div: MotionDivComponent,
  button: MotionButtonComponent,
  span: MotionSpanComponent,
}

export function useInView(_ref: any, _options?: any): boolean {
  return true
}

export function useReducedMotion(): boolean {
  return false
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const MotionConfig = ({ children }: { children: React.ReactNode }) => <>{children}</>

import { useState, useEffect, useRef } from 'react'

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  // v8 ignore next -- SSR guard; window is always defined in browser/jsdom
  const prevScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    prevScrollY.current = window.scrollY
    const handleScroll = () => {
      const current = window.scrollY
      setDirection(current > prevScrollY.current ? 'down' : 'up')
      prevScrollY.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}

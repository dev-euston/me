import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Experience } from '../../types'

interface TimelineEntryProps {
  entry: Experience
  index: number
  isLeft: boolean
}

export function TimelineEntry({ entry, index, isLeft }: TimelineEntryProps) {
  const ref = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- framer-motion useInView options
  const inView = useInView(ref, { once: true } as any)
  const prefersReduced = useReducedMotion()

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={prefersReduced ? {} : animationVariants}
      data-testid={`timeline-entry-${index}`}
      className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content container */}
      <div className={`w-full md:w-[calc(50%-20px)] ${isLeft ? 'pr-10 text-right' : 'pl-10'}`}>
        <div className="bg-muted/10 backdrop-blur-sm border border-muted/20 rounded-lg p-6 hover:border-accent/50 transition-colors">
          <p className="text-sm text-muted mb-1">
            {entry.startDate} – {entry.endDate}
          </p>
          <h3 className="text-xl font-display font-bold mb-2">{entry.company}</h3>
          <p className="text-accent mb-4">{entry.role}</p>
          <ul className="space-y-2">
            {(entry.achievements || entry.bullets).map((item, i) => (
              <li key={i} className="text-muted text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center dot and line */}
      <div className="flex flex-col items-center md:w-[40px] px-5">
        <div
          className="w-3 h-3 rounded-full bg-accent border-2 border-bg"
          aria-hidden="true"
        />
        {/* Vertical line for next entry */}
        <div className="flex-1 w-0.5 bg-gradient-to-b from-accent to-accent/30 mt-4" />
      </div>

      {/* Empty space on opposite side (desktop only) */}
      <div className="hidden md:block w-[calc(50%-20px)]" />
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { TimelineEntry } from '../TimelineEntry/TimelineEntry'
import type { Experience } from '../../types'

interface TimelineSectionProps {
  experience: Experience[]
}

export function TimelineSection({ experience }: TimelineSectionProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  }

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-display font-bold mb-16">Experience</h2>
        </motion.div>

        <div className="space-y-8 relative">
          {experience.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeUp, staggerChildren } from '../../styles/animations'
import type { Experience as ExperienceType } from '../../types'

interface ExperienceProps {
  experience: ExperienceType[]
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-display font-bold mb-16">Experience</h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-accent"
        >
          {experience.map((entry) => (
            <motion.div
              key={entry.id}
              variants={fadeUp}
              data-testid="experience-entry"
              className="mb-12 last:mb-0 relative"
            >
              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-bg"
              />

              <p
                data-testid="experience-dates"
                className="text-sm text-muted mb-1"
              >
                {entry.startDate} – {entry.endDate}
              </p>
              <h3
                data-testid="experience-company"
                className="text-xl font-display font-bold"
              >
                {entry.company}
              </h3>
              <p
                data-testid="experience-role"
                className="text-accent mb-4"
              >
                {entry.role}
              </p>
              <ul className="space-y-2">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="text-muted text-sm leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

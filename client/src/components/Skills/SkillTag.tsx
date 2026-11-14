import { motion } from 'framer-motion'

interface SkillTagProps {
  skill: string
}

/** Pill-shaped badge for a single skill. Animation is handled by the parent. */
export function SkillTag({ skill }: SkillTagProps) {
  return (
    <motion.div
      data-testid="skill-tag"
      className="inline-block rounded-full border border-border bg-bg px-4 py-1.5 text-sm text-text"
    >
      {skill}
    </motion.div>
  )
}

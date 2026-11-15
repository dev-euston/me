import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'

interface SkillTagProps {
  skill: string
  onSelect?: (tech: string) => void
  isActive?: boolean
}

const BASE = 'inline-block rounded-full border px-4 py-1.5 text-sm'
const PASSIVE = 'border-border bg-bg text-text'
const ACTIVE = 'bg-accent text-bg border-accent'

/** Pill-shaped badge for a single skill. Animation is handled by the parent. */
export function SkillTag({ skill, onSelect, isActive }: SkillTagProps) {
  if (!onSelect) {
    return (
      <motion.div data-testid="skill-tag" className={`${BASE} ${PASSIVE}`}>
        {skill}
      </motion.div>
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(skill)
    }
  }

  return (
    <motion.div
      data-testid="skill-tag"
      role="button"
      tabIndex={0}
      aria-pressed={isActive ?? false}
      onClick={() => onSelect(skill)}
      onKeyDown={handleKeyDown}
      className={`${BASE} cursor-pointer ${isActive ? ACTIVE : PASSIVE}`}
    >
      {skill}
    </motion.div>
  )
}

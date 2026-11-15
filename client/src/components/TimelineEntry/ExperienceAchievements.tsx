import { motion } from 'framer-motion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AchievementItemProps {
  text: string
  index: number
}

function AchievementItem({ text, index }: AchievementItemProps) {
  const { ref, variants, initial, animate, transition } = useStaggeredReveal(index)
  const reducedMotion = useReducedMotion()

  return (
    <li className="text-muted text-sm leading-relaxed">
      <motion.div
        ref={ref}
        variants={variants}
        initial={initial}
        animate={animate}
        transition={reducedMotion ? { duration: 0 } : transition}
      >
        {text}
      </motion.div>
    </li>
  )
}

interface ExperienceAchievementsProps {
  achievements: string[] | undefined
}

/** Outcome-focused achievement list with staggered reveal; renders nothing when empty. */
export function ExperienceAchievements({ achievements }: ExperienceAchievementsProps) {
  if (!achievements || achievements.length === 0) return null

  return (
    <ul className="achievements-list space-y-2">
      {achievements.map((text, index) => (
        <AchievementItem key={index} text={text} index={index} />
      ))}
    </ul>
  )
}

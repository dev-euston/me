import { motion } from 'framer-motion'
import { SKILLS } from '../../data/skills'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SkillTag } from './SkillTag'

interface SkillItemProps {
  skill: string
  index: number
}

function SkillItem({ skill, index }: SkillItemProps) {
  const { ref, variants, initial, animate, transition } = useStaggeredReveal(index)
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={reducedMotion ? { duration: 0 } : transition}
    >
      <SkillTag skill={skill} />
    </motion.div>
  )
}

/** Skills section: renders skills grouped by category with staggered scroll reveal. */
export function SkillsSection() {
  let globalIndex = 0

  return (
    <section id="skills" data-testid="skills-section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-10">Skills</h2>
        <div className="space-y-8">
          {SKILLS.map((group) => (
            <div key={group.category} data-testid="skill-category">
              <h3 className="text-lg font-display font-semibold mb-4 text-muted">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <SkillItem key={skill} skill={skill} index={globalIndex++} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

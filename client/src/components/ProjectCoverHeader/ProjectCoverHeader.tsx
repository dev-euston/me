import { motion } from 'framer-motion'
import { fadeUp } from '../../styles/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { TechBadge } from '../TechBadge'

const instantFadeUp = {
  hidden: fadeUp.visible,
  visible: { ...fadeUp.visible, transition: { duration: 0 } },
}

interface ProjectCoverHeaderProps {
  coverImage: string
  title: string
  techStack: string[]
}

export function ProjectCoverHeader({ coverImage, title, techStack }: ProjectCoverHeaderProps) {
  const reducedMotion = useReducedMotion()
  const variants = reducedMotion ? instantFadeUp : fadeUp

  return (
    <motion.div
      data-testid="project-cover-header"
      variants={variants}
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      className="relative w-full h-[65vh] overflow-hidden"
    >
      <img
        src={coverImage}
        alt=""
        data-testid="project-cover-image"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover' }}
      />
      <div
        aria-hidden="true"
        data-testid="project-cover-overlay"
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.45)' }}
      />
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <h1
          className="font-display font-bold text-center"
          style={{ color: 'var(--color-text)', fontSize: '3rem' }}
        >
          {title}
        </h1>
      </div>
      <div
        data-testid="project-cover-badges"
        className="absolute z-10 left-6 bottom-6 flex flex-wrap gap-2"
      >
        {techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </motion.div>
  )
}

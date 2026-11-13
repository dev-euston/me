import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'
import { projects } from '../data/projects'
import { findRelatedProjects } from '../utils/projectUtils'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { TechBadge } from './TechBadge'

interface RelatedProjectsProps {
  currentProject: Project
}

export function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  const reducedMotion = useReducedMotion()
  const related = findRelatedProjects(currentProject, projects)

  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-projects-heading" className="px-6 py-12 bg-bg">
      <h2
        id="related-projects-heading"
        className="font-display font-bold text-2xl mb-6"
        style={{ color: 'var(--color-text)' }}
      >
        Related projects
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {related.map((project, index) => (
            <motion.div
              key={project.id}
              data-testid="related-project-card"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                delay: reducedMotion ? 0 : index * 0.1,
              }}
              className="rounded-lg overflow-hidden border border-white/10"
            >
              <Link to={project.pitchUrl ?? '/'} className="block">
                <div
                  data-testid="related-project-thumbnail"
                  className="h-[160px] w-full overflow-hidden bg-accent"
                >
                  {project.coverImage && (
                    <img
                      src={project.coverImage}
                      alt=""
                      className="w-full h-full"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-lg mb-3">{project.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <TechBadge key={tech} label={tech} />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

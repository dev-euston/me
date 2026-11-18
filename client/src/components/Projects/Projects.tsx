import { AnimatePresence, motion } from 'framer-motion'
import { fadeUp } from '../../styles/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useProjectFilter } from '../../hooks/useProjectFilter'
import { useTechFilter } from '../../context/TechFilterContext'
import { getAllTechStacks } from '../../data/projects'
import { ProjectFilter } from '../ProjectFilter'
import { ProjectCard } from '../ProjectCard'
import type { Project } from '../../types'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const { activeTech: contextTech, setActiveTech: setContextTech } = useTechFilter()
  const { activeTech, filteredProjects } = useProjectFilter(projects, contextTech)
  const setActiveTech = (tag: string | null) =>
    setContextTech(tag === null || tag === contextTech ? null : tag)
  const reducedMotion = useReducedMotion()
  const allTechs = getAllTechStacks()
  const visibleProjects = filteredProjects(projects)

  return (
    <section id="projects" data-testid="projects-section" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-display font-bold mb-16">Projects</h2>
        </motion.div>

        <ProjectFilter activeTech={activeTech} onSetActiveTech={setActiveTech} allTags={allTechs} />

        <div data-testid="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                data-testid={`project-wrapper-${project.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                  delay: reducedMotion ? 0 : index * 0.05,
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

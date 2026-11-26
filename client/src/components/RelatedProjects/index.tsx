import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import { projects as defaultProjects } from '../../data/projects'
import { useRelatedProjects } from '../../hooks/useRelatedProjects'
import { TechBadge } from '../TechBadge'

interface RelatedProjectsProps {
  currentProject: Project
  projects?: Project[]
}

const MAX_BADGES = 3

export function RelatedProjects({ currentProject, projects }: RelatedProjectsProps) {
  const related = useRelatedProjects(currentProject, projects ?? defaultProjects)

  if (related.length === 0) return null

  return (
    <section aria-labelledby="related-projects-heading" className="px-6 py-12 bg-bg">
      <h2
        id="related-projects-heading"
        className="font-display font-bold text-2xl mb-6"
        style={{ color: 'var(--color-text)' }}
      >
        More projects
      </h2>
      <div className="flex gap-6 overflow-x-auto">
        {related.map((project) => (
          <div
            key={project.id}
            data-testid="related-project-card"
            className="flex-shrink-0 w-72 rounded-lg overflow-hidden border border-white/10"
          >
            {project.screenshotUrl ? (
              <img
                src={project.screenshotUrl}
                alt={`${project.name} screenshot`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full object-cover"
                style={{ aspectRatio: '16 / 9' }}
              />
            ) : (
              <div
                data-testid="related-project-placeholder"
                aria-hidden="true"
                className="w-full bg-surface"
                style={{ aspectRatio: '16 / 9' }}
              />
            )}
            <div className="p-4">
              <h3 className="font-display font-bold text-lg mb-3">
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, MAX_BADGES).map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import type { Project } from '../../types'
import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { RelatedProjects } from '../../components/RelatedProjects'
import { ProjectNavButtons } from '../../components/ProjectNavButtons/ProjectNavButtons'

const project = projects.find((p) => p.id === 'mr-reviewer') as Project

export function MrReviewerPage() {
  return (
    <>
      <PitchDeckPage
        src="/pitch/mr-reviewer/index.html"
        title="MR Reviewer pitch"
        project={project}
      />
      <RelatedProjects currentProject={project} />
      <ProjectNavButtons projectId={project.id} />
    </>
  )
}

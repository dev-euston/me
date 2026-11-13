import type { Project } from '../../types'
import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { RelatedProjects } from '../../components/RelatedProjects'
import { ProjectNavButtons } from '../../components/ProjectNavButtons/ProjectNavButtons'

const project = projects.find((p) => p.id === 'jira-code') as Project

export function JiraCodePage() {
  return (
    <>
      <PitchDeckPage src="/pitch/jira-code.html" title="Jira Code pitch" project={project} />
      <RelatedProjects currentProject={project} />
      <ProjectNavButtons projectId={project.id} />
    </>
  )
}

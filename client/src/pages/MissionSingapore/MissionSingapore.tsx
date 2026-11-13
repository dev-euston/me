import type { Project } from '../../types'
import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { RelatedProjects } from '../../components/RelatedProjects'

const project = projects.find((p) => p.id === 'mission-singapore') as Project

export function MissionSingaporePage() {
  return (
    <>
      <PitchDeckPage
        src="/pitch/mission-singapore/index.html"
        title="Mission Singapore pitch"
        project={project}
      />
      <RelatedProjects currentProject={project} />
    </>
  )
}

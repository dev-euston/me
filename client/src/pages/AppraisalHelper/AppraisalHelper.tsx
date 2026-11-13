import type { Project } from '../../types'
import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { RelatedProjects } from '../../components/RelatedProjects'

const project = projects.find((p) => p.id === 'appraisal-helper') as Project

export function AppraisalHelperPage() {
  return (
    <>
      <PitchDeckPage
        src="/pitch/appraisal-helper/index.html"
        title="Appraisal Helper pitch"
        project={project}
      />
      <RelatedProjects currentProject={project} />
    </>
  )
}

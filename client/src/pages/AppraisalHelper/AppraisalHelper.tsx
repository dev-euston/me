import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'

const project = projects.find((p) => p.id === 'appraisal-helper')

export function AppraisalHelperPage() {
  return (
    <PitchDeckPage
      src="/pitch/appraisal-helper/index.html"
      title="Appraisal Helper pitch"
      project={project}
    />
  )
}

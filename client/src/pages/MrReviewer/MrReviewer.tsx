import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'

const project = projects.find((p) => p.id === 'mr-reviewer')

export function MrReviewerPage() {
  return (
    <PitchDeckPage
      src="/pitch/mr-reviewer/index.html"
      title="MR Reviewer pitch"
      project={project}
    />
  )
}

import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'

const project = projects.find((p) => p.id === 'mission-singapore')

export function MissionSingaporePage() {
  return (
    <PitchDeckPage
      src="/pitch/mission-singapore/index.html"
      title="Mission Singapore pitch"
      project={project}
    />
  )
}

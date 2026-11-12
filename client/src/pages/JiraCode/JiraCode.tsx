import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'

const project = projects.find((p) => p.id === 'jira-code')

export function JiraCodePage() {
  return <PitchDeckPage src="/pitch/jira-code.html" title="Jira Code pitch" project={project} />
}

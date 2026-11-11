import { TimelineSection } from '../TimelineSection/TimelineSection'
import type { Experience as ExperienceType } from '../../types'

interface ExperienceProps {
  experience: ExperienceType[]
}

export function Experience({ experience }: ExperienceProps) {
  return <TimelineSection experience={experience} />
}

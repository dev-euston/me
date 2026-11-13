import { TimelineSection } from '../TimelineSection/TimelineSection'
import ResumeDownload from '../ResumeDownload'
import type { Experience as ExperienceType } from '../../types'

interface ExperienceProps {
  experience: ExperienceType[]
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <>
      <TimelineSection experience={experience} />
      <div className="flex justify-center pb-24 px-6">
        <ResumeDownload resumeUrl="/euston-lee-resume.pdf" />
      </div>
    </>
  )
}

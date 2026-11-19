import { useRef, useState } from 'react'
import type { Project } from '../../types'
import { projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { PitchDeckViewer } from '../../components/PitchDeckViewer/PitchDeckViewer'
import { RelatedProjects } from '../../components/RelatedProjects'
import { ProjectMetrics } from '../../components/ProjectMetrics'
import { ProjectNavButtons } from '../../components/ProjectNavButtons/ProjectNavButtons'

const project = projects.find((p) => p.id === 'mr-reviewer') as Project

export function MrReviewerPage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <PitchDeckPage
        src="/pitch/mr-reviewer/index.html"
        title="MR Reviewer pitch"
        project={project}
      />
      <div className="flex justify-center py-8">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsViewerOpen(true)}
          className="px-6 py-3 rounded-lg border border-[var(--color-accent)] text-[var(--color-accent)] font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-colors"
        >
          View Pitch Deck
        </button>
      </div>
      <PitchDeckViewer
        isOpen={isViewerOpen}
        deck={{ path: project.pitchDeckPath as string, title: project.name }}
        onClose={() => setIsViewerOpen(false)}
        triggerRef={triggerRef}
      />
      <ProjectMetrics metrics={project.metrics} />
      <RelatedProjects currentProject={project} />
      <ProjectNavButtons projectId={project.id} />
    </>
  )
}

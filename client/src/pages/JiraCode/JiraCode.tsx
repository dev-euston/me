import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import type { Project } from '../../types'
import { OWNER_NAME, projects } from '../../data/projects'
import { PitchDeckPage } from '../../components/PitchDeckPage/PitchDeckPage'
import { PitchDeckViewer } from '../../components/PitchDeckViewer/PitchDeckViewer'
import { RelatedProjects } from '../../components/RelatedProjects'
import { ProjectMetrics } from '../../components/ProjectMetrics'
import { ProjectNavButtons } from '../../components/ProjectNavButtons/ProjectNavButtons'

const project = projects.find((p) => p.id === 'jira-code') as Project

export function JiraCodePage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const description = project.metaDescription || project.description
  const image = project.screenshotUrl || '/og-default.png'

  return (
    <>
      <Helmet>
        <title>
          {project.name} | {OWNER_NAME}
        </title>
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={image} />
        <meta
          name="twitter:card"
          content={project.screenshotUrl ? 'summary_large_image' : 'summary'}
        />
        <meta name="twitter:title" content={project.name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <PitchDeckPage src="/pitch/jira-code.html" title="Jira Code pitch" project={project} />
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

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../../types'
import { ProjectCoverHeader } from '../ProjectCoverHeader/ProjectCoverHeader'

interface PitchDeckPageProps {
  src: string
  title: string
  project?: Project
}

export function PitchDeckPage({ src, title, project }: PitchDeckPageProps) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const coverImage = project?.coverImage

  return (
    <div
      style={
        coverImage
          ? { display: 'flex', flexDirection: 'column', minHeight: '100vh' }
          : { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }
      }
    >
      {project && coverImage && (
        <ProjectCoverHeader
          coverImage={coverImage}
          title={project.name}
          techStack={project.techStack}
        />
      )}
      <nav
        style={{
          height: '48px',
          width: '100%',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '16px',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            color: hovered ? '#3B82F6' : 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← Back to portfolio
        </button>
      </nav>
      <iframe
        src={src}
        title={title}
        style={{
          width: '100%',
          height: 'calc(100vh - 48px)',
          flex: coverImage ? 1 : undefined,
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  )
}

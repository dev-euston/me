import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function MrReviewerPage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
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
        src="/pitch/mr-reviewer/index.html"
        title="MR Reviewer pitch"
        style={{ width: '100%', height: 'calc(100vh - 48px)', border: 'none', display: 'block' }}
      />
    </div>
  )
}

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ResumeDownloadProps {
  resumeUrl: string
}

export function ResumeDownload({ resumeUrl }: ResumeDownloadProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.a
      href={resumeUrl}
      download="euston-lee-resume.pdf"
      className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold transition-colors"
      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        data-testid="download-icon"
      >
        <polyline points="6 9 12 15 18 9" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
      Download Resume
    </motion.a>
  )
}

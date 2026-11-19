import { motion } from 'framer-motion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import type { Project } from '../../types'

type Metric = NonNullable<Project['metrics']>[number]

interface ProjectMetricsProps {
  metrics?: Metric[]
}

interface MetricTileProps {
  metric: Metric
  index: number
}

function MetricTile({ metric, index }: MetricTileProps) {
  const { ref, variants, initial, animate, transition } = useStaggeredReveal(index)

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      data-testid="project-metric"
      className="flex flex-col items-center"
      style={{
        padding: '1.5rem 2rem',
        border: '1px solid var(--color-border, var(--color-muted))',
        borderRadius: '0.75rem',
      }}
    >
      <span className="text-4xl font-bold" style={{ color: 'var(--color-accent)' }}>
        {metric.value}
      </span>
      <span className="text-sm mt-1" style={{ color: 'var(--color-text, inherit)' }}>
        {metric.label}
      </span>
    </motion.div>
  )
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4 justify-center py-8" data-testid="project-metrics">
      {metrics.map((metric, index) => (
        <MetricTile key={metric.label} metric={metric} index={index} />
      ))}
    </div>
  )
}

interface TechBadgeProps {
  label: string
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span data-testid="tech-badge" className="px-2 py-1 text-xs rounded-full bg-accent text-white">
      {label}
    </span>
  )
}

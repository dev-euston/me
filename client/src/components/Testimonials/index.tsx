import { motion } from 'framer-motion'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { TESTIMONIALS, type Testimonial } from '../../data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const reducedMotion = useReducedMotion()
  const { ref, variants, initial, animate, transition } = useStaggeredReveal(index)
  const { name, title, company, quote, linkedInUrl, avatarUrl } = testimonial

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={reducedMotion ? 'visible' : initial}
      animate={reducedMotion ? 'visible' : animate}
      transition={reducedMotion ? { duration: 0 } : transition}
      data-testid="testimonial-card"
      className="flex flex-col gap-4 rounded-xl border border-muted p-6 text-left"
    >
      <blockquote className="text-text before:content-['\201C'] before:text-accent after:content-['\201D'] after:text-accent">
        {quote}
      </blockquote>
      <div className="flex items-center gap-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          {linkedInUrl ? (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="font-bold text-text transition-colors hover:text-accent"
            >
              {name}
            </a>
          ) : (
            <span className="font-bold text-text">{name}</span>
          )}
          <p className="text-sm text-muted">
            {title}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <div className="mx-auto max-w-5xl px-6 py-24" data-testid="testimonials">
      <h2 className="mb-8 text-center font-display text-3xl font-bold">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  )
}

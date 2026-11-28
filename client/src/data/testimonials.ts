export interface Testimonial {
  name: string
  title: string
  company: string
  quote: string
  linkedInUrl?: string
  avatarUrl?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Alex Morgan',
    title: 'Engineering Manager',
    company: 'Example Co',
    quote:
      'Euston consistently delivers high-quality work and raises the bar for everyone around them.',
    linkedInUrl: 'https://www.linkedin.com/in/example/',
  },
]

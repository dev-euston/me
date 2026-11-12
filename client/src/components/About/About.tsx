import { motion } from 'framer-motion'
import { fadeUp, staggerChildren } from '../../styles/animations'

export function About() {
  return (
    <section id="about" data-testid="about-section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold mb-6">About</h2>
            <p data-testid="about-bio" className="text-muted leading-relaxed space-y-4">
              Hi, I&apos;m Euston — a software engineer based in Singapore with over a decade of
              experience across government technology, telco, and data industries. I currently work
              at GovTech Singapore, building digital services that improve how government operates.
              I care about clean architecture, well-tested code, and shipping software that lasts.
              Outside of work, I build developer productivity tools — most recently an AI agent that
              turns Jira tickets into pull requests, and a triage dashboard that brings all your
              code review activity into one place.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

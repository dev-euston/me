import { motion } from 'framer-motion'
import { fadeUp, staggerChildren } from '../../styles/animations'

export function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp}>
            <div
              data-testid="avatar-placeholder"
              className="w-full aspect-square bg-surface rounded-2xl max-w-sm mx-auto"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-display font-bold mb-6">About</h2>
            <p data-testid="about-bio" className="text-muted leading-relaxed space-y-4">
              Hi, I&apos;m Euston — a software engineer based in Singapore with over a decade
              of experience across government technology, telco, and data industries. I
              currently work at GovTech Singapore, building digital services that improve
              how government operates. I care about clean architecture, well-tested code,
              and shipping software that lasts. Outside of work, I build side projects like
              Spell Star, a spelling trainer for primary school kids.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

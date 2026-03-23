import { motion } from 'framer-motion'
import { fadeUp } from '../../styles/animations'

export function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 px-6 text-center"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-3xl font-display font-bold mb-8">Let's connect</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/eustonleeys/"
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/dev-euston"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  )
}

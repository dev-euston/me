import { motion } from 'framer-motion'
import { fadeUp, staggerChildren } from '../../styles/animations'

export function Hero() {
  return (
    <div
      data-testid="hero-section"
      className="relative flex items-center justify-center h-screen px-6 overflow-hidden"
    >
      {/* Noise texture overlay — purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* All animated elements use motion.div only — spec constraint */}
      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl w-full"
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-text leading-none mb-4">
            Euston Lee
          </h1>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-xl text-muted mb-3">Software Engineer</p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-base text-muted mb-10 max-w-lg">
            I build fast, accessible, and well-tested software.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

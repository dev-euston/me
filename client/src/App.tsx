import { MotionConfig } from 'framer-motion'
import { SkipToContent } from './components/SkipToContent/SkipToContent'
import { Nav } from './components/Nav/Nav'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { SkillsSection } from './components/Skills'
import { TimelineSection } from './components/TimelineSection/TimelineSection'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { TechFilterProvider } from './context/TechFilterContext'
import { projects } from './data/projects'
import { experience } from './data/experience'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TechFilterProvider>
        <SkipToContent />
        <Nav />
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Projects projects={projects} />
          <SkillsSection />
          <TimelineSection experience={experience} />
          <Contact />
        </main>
        <Footer />
      </TechFilterProvider>
    </MotionConfig>
  )
}

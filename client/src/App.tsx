import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav/Nav'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { Experience } from './components/Experience/Experience'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { projects } from './data/projects'
import { experience } from './data/experience'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

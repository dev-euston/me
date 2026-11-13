import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
import './index.css'
import App from './App.tsx'
import { PageTransition } from './components/PageTransition'
import { JiraCodePage } from './pages/JiraCode/JiraCode'
import { MrReviewerPage } from './pages/MrReviewer/MrReviewer'
import { MissionSingaporePage } from './pages/MissionSingapore/MissionSingapore'
import { AppraisalHelperPage } from './pages/AppraisalHelper/AppraisalHelper'
import { PitchDecksPage } from './pages/PitchDecks/PitchDecks'

// eslint-disable-next-line react-refresh/only-export-components -- entry point, not hot-reloaded
function AnimatedLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>{outlet}</PageTransition>
    </AnimatePresence>
  )
}

const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/pitch', element: <PitchDecksPage /> },
      { path: '/projects/jira-code', element: <JiraCodePage /> },
      { path: '/projects/mr-reviewer', element: <MrReviewerPage /> },
      { path: '/projects/mission-singapore', element: <MissionSingaporePage /> },
      { path: '/projects/appraisal-helper', element: <AppraisalHelperPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
import './index.css'
import App from './App.tsx'
import { JiraCodePage } from './pages/JiraCode/JiraCode'
import { MrReviewerPage } from './pages/MrReviewer/MrReviewer'
import { MissionSingaporePage } from './pages/MissionSingapore/MissionSingapore'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/projects/jira-code', element: <JiraCodePage /> },
  { path: '/projects/mr-reviewer', element: <MrReviewerPage /> },
  { path: '/projects/mission-singapore', element: <MissionSingaporePage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

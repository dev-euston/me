# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for **Euston Lee**, Software Engineer. Built with Vite + React + TypeScript.

**Design system:** Bold & modern. Black/near-black background (`#0A0A0A`), white text, electric blue accent (`#3B82F6`). Strong typography, high contrast.

**Sections:** Hero/About, Projects, Experience/Resume, Contact.

## Monorepo Structure

npm workspaces monorepo.

```
client/   # Vite + React + TypeScript frontend
server/   # Future backend (not yet created)
```

Root `package.json` delegates all scripts to `client` via `-w client`. Prettier config (`.prettierrc`) is at the root and shared across all workspaces.

## Commands

Run from the **repo root**:

```bash
npm run dev           # start dev server (Vite HMR)
npm run build         # type-check then build to client/dist/
npm run preview       # serve the production build locally

npm test              # run all tests once
npm run test:watch    # run tests in watch mode
npm run test:coverage # run tests with coverage (must hit 100%)

npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format entire repo
npm run format:check  # Prettier check (CI use)
```

To run a single test file, run from `client/`:

```bash
npx vitest run src/components/Hero/Hero.test.tsx
```

## Architecture

```
client/
  src/
    components/   # One folder per section/component, each with index.tsx + *.test.tsx
    pages/        # Route-level page components (one folder per route, with *.test.tsx)
    hooks/        # Custom React hooks — data-fetching (isolated for future API swap), animation utilities (e.g. useStaggeredReveal, useReducedMotion), and UI state (e.g. useProjectFilter)
    utils/        # Shared utilities — e.g. findRelatedProjects (tech-stack-based project matching)
    data/         # Static content (projects, experience, skills) as typed TS objects
    types/        # Shared TypeScript interfaces
    styles/       # Global CSS custom properties / design tokens
    test/
      setup.ts    # @testing-library/jest-dom (auto-loaded by vitest)
    main.tsx      # Entry point — defines routes via createBrowserRouter + AnimatedLayout wrapper, excluded from coverage
    App.tsx       # Root component — renders section components in order (the "/" route)
  public/
    pitch/        # Static HTML pitch decks served at /pitch/<name>.html
pitch/            # Source pitch decks (standalone HTML, outside Vite build)
```

Content lives in `src/data/` as plain TypeScript objects (no CMS). To add/update projects or experience, edit those files.

**Routing:** React Router v6 (`react-router-dom`). Routes are defined in `main.tsx` via `createBrowserRouter`. All routes are children of a root `AnimatedLayout` layout component that wraps them in `AnimatePresence` + `PageTransition` for animated page transitions. The main portfolio is the `"/"` route (`App`). Project detail pages live under `src/pages/` and are registered as additional child routes.

**Pitch decks:** Static HTML files in `client/public/pitch/` are served under `/pitch/`. Single-asset decks live at `/pitch/<name>.html`; multi-asset decks (with screenshots etc.) use a subdirectory at `/pitch/<name>/index.html`. Page components under `src/pages/` render them with a 48px top nav (dark background, "← Back to portfolio" button using `useNavigate(-1)`) above a `calc(100vh - 48px)` iframe. The source pitch decks also exist in `pitch/` at the repo root for standalone viewing outside the app.

The site is **frontend-only** for now. Keep data-fetching in hooks so components are unchanged when a backend is added.

## Testing

- **Vitest** + `jsdom` + `@testing-library/react`
- 100% coverage enforced (lines/functions/branches/statements) via thresholds in `client/vitest.config.ts`
- Excluded from coverage: `src/main.tsx`, `src/vite-env.d.ts`, `src/test/**`, `*.d.ts`
- Tests co-located with components: `ComponentName/ComponentName.test.tsx`
- Write tests before implementation (TDD)

## Linting & Formatting

- ESLint: `client/eslint.config.js` — flat config, per-app (TypeScript + React Hooks + Prettier compat)
- Prettier: `.prettierrc` at repo root — single quotes, no semis, 100 char width, trailing commas (ES5)
- When a lint rule cannot be auto-fixed, add an inline `// eslint-disable-next-line` comment with the reason

## Animation Conventions (Framer Motion)

- Scroll-triggered entrance animations use `useInView` with `amount` (not `threshold`) as the parameter name — this is Framer Motion's API, not Intersection Observer's.
- Stagger pattern: wrap each item in `motion.div`, use `useStaggeredReveal(index)` hook which returns `{ref, initial, animate, transition}`. Initial: `{opacity:0, y:24}`, animate: `{opacity:1, y:0}`, stagger delay = `index * 0.1s`, `once: true`.
- Always check `useReducedMotion()` and skip animation (render at final state with `duration:0`) when it returns `true`. Use the custom hook from `hooks/useReducedMotion` (wraps `window.matchMedia`) — not framer-motion's own `useReducedMotion`.
- Framer Motion exports (including its own `useReducedMotion`) are mocked in `client/src/test/mocks/framer-motion.tsx`. Add new exports there if tests fail with "not a function." The custom `hooks/useReducedMotion` is tested separately and must be mocked in component tests that use it.
- **Page transition exception:** `PageTransition` uses framer-motion's own `useReducedMotion` directly (imported alongside `motion`) rather than the custom hook — this is intentional since it already imports from framer-motion. All other components still use the custom hook.
- **Above-the-fold animations:** Components visible on initial load (e.g. `Hero`) use `initial={reducedMotion ? 'visible' : 'hidden'}` + `animate="visible"` instead of `whileInView` — these are always visible so scroll-trigger is not appropriate. Use `whileInView` only for below-the-fold sections.
- **Mobile nav:** `HamburgerButton` (animated ☰→✕ icon, `aria-expanded`) and `MobileNavDrawer` (slide-in from right, backdrop, Escape key closes) are established components. `AnimatePresence` wraps the drawer for exit animations. Z-index: backdrop at `z-[999]`, drawer at `z-[1000]`.

## Key Conventions

- Functional components with explicit props interfaces
- Named exports only from `src/data/` (no default exports)
- Use CSS custom properties from `src/styles/` — no hardcoded colours
- `Project` type: `techStack: string[]` holds the array of technology labels (renamed from `tags` in earlier versions). Link fields: `githubUrl` (optional — omit for projects without a public repo), `pitchUrl` (optional — internal React Router path, e.g. `/projects/<id>`), `externalPitchUrl` (optional — external URL to a pitch deck hosted outside this app, opens in new tab), and `demoUrl` (optional — external URL to a live deployment). Use `pitchUrl` for projects with an internal pitch page; use `externalPitchUrl` when the pitch deck is hosted externally. All four can coexist. `coverImage` (optional — URL for the hero cover image shown at the top of the project's detail page via `ProjectCoverHeader`; uses above-the-fold animation pattern).
- `Experience` type: `achievements?: string[]` is optional. When present, `TimelineEntry` renders `achievements` instead of `bullets`.
- **Project filtering:** `Projects` uses `useProjectFilter` hook (from `hooks/`) for tech stack filtering and renders a `ProjectFilter` chip strip above the grid. `getAllTechStacks()` (from `data/projects.ts`) extracts a deduplicated sorted list of all tech labels across all projects — use it to populate the filter and anywhere else a full tech list is needed.
- **Related projects:** `findRelatedProjects(currentProject, allProjects, limit?)` (from `utils/projectUtils.ts`) returns up to `DEFAULT_RELATED_PROJECTS_LIMIT` (3) projects ranked by tech stack overlap (case-insensitive). The `RelatedProjects` component renders these below the pitch deck on project detail pages — add `<RelatedProjects currentProject={project} />` after `<PitchDeckPage>` when creating new project pages. Project tests that render a page component must mock `../../components/RelatedProjects`.
- **Project navigation:** `ProjectNavButtons` (from `components/ProjectNavButtons/`) renders prev/next project links at the bottom of project detail pages. Uses `useAdjacentProjects(projectId)` hook which returns `{prev, next}` by wrapping around the `projects` array circularly. Navigates via each project's `pitchUrl` (falls back to `'/'` if unset). Add `<ProjectNavButtons projectId={project.id} />` after `<RelatedProjects>` when creating new project pages. Tests that render a project page must mock `../../components/ProjectNavButtons/ProjectNavButtons`.

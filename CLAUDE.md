# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for **Euston Lee**, Software Engineer. Built with Vite + React + TypeScript.

**Design system:** Bold & modern. Black/near-black background (`#0A0A0A`), white text, electric blue accent (`#3B82F6`). Strong typography, high contrast.

**Sections:** Hero/About, Projects, Experience/Resume, Testimonials, Contact, Pitch Decks.

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
    context/      # React contexts — global state shared across sections (e.g. TechFilterContext — tech filter state shared between Skills and Projects via TechFilterProvider wrapping App)
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

**Skills section (ME-23):** `SkillsSection` (`components/Skills/SkillsSection.tsx`) renders skills grouped by category with staggered `useInView` scroll reveal. Data lives in `src/data/skills.ts` as a typed `SKILLS: SkillCategory[]` array (`{ category: string, skills: string[] }`). `SkillTag` (`components/Skills/SkillTag.tsx`) renders a pill-shaped badge — animation handled by the parent `SkillItem` via `useStaggeredReveal`. To add or update skills, edit `src/data/skills.ts` only; derived groupings are automatic. `SkillsSection` is rendered as a section on the home page via `App.tsx`.

**Skills-to-Projects cross-linking (ME-24):** `SkillTag` now accepts optional `onSelect?: (tech: string) => void` and `isActive?: boolean` props. When `onSelect` is provided it renders as a keyboard-accessible button (`role="button"`, `tabIndex={0}`, `aria-pressed`, active styling). `SkillsSection` passes `onSelect` via `useTechFilter()` context so clicking a skill tag updates the global tech filter. The active filter state lives in `TechFilterContext` (`context/TechFilterContext.tsx`, provided by `TechFilterProvider` wrapping the entire app in `App.tsx`). `useProjectFilter` accepts an optional `externalActiveTech` parameter — `Projects` passes the context value to it, so a skill click in the Skills section instantly filters the Projects grid. `useTechFilter()` from `context/TechFilterContext.tsx` is the access hook; it throws if used outside `TechFilterProvider`. When testing components that use `useTechFilter()`, wrap them in `TechFilterProvider` or mock the context.

**Availability badge (ME-25):** `AvailabilityBadge` (`components/AvailabilityBadge/AvailabilityBadge.tsx`) reads availability state from `AVAILABILITY_STATUS` in `src/data/availability.ts` — no props required. The module exports `AvailabilityStatus` interface (`available: boolean`, `label: string`, `since?: string`, `currentlyBuilding?: { name: string; link?: string; since?: string }`) and the singleton `AVAILABILITY_STATUS` constant. To change availability or the label, edit `src/data/availability.ts` only. The dot uses `var(--success)` (`#10b981`, defined in `index.css`). The badge wrapper itself has an entrance animation (`initial: {opacity:0, x:-8}`, `animate: {opacity:1, x:0}`, `duration:0.3`, `ease:'easeOut'`) that respects `useReducedMotion()`. Note: `personal.ts` and `personalInfo` are deleted — do not reference them.

**ProjectCard (ME-29):** `ProjectCard` (`components/ProjectCard/index.tsx`) is now its own standalone component (previously co-located inside `Projects.tsx`). It renders a rounded card with an optional 16:9 screenshot image at the top (clipped by `overflow-hidden` on the card container), then a padded content area with the project name, description, links, and staggered `TechBadge` pills. The card uses `useStaggeredReveal(index)` for entrance animation. Import it from `components/ProjectCard` when rendering a project card outside the grid. `Projects.tsx` now simply imports and delegates to it.

**ProjectMetrics (ME-30):** `ProjectMetrics` (`components/ProjectMetrics/index.tsx`) renders a row of project stat tiles on project detail pages. Accepts `metrics?: Metric[]` where `Metric` is `NonNullable<Project['metrics']>[number]` (i.e. `{ label: string; value: string }`). Returns `null` when `metrics` is empty or absent. Each tile is a `MetricTile` that uses `useStaggeredReveal(index)` for entrance animation and renders `value` in `--color-accent` above `label`. Rendered as a `flex flex-wrap gap-4 justify-center py-8` row. Add `<ProjectMetrics metrics={project.metrics} />` after `<ProjectCoverHeader>` on project detail pages. Metrics data lives in `src/data/projects.ts` on each `Project` object.

**Currently building badge (ME-28):** `CurrentlyBuildingBadge` (`components/CurrentlyBuildingBadge/index.tsx`) renders a pill badge showing "Currently building: [name]" with a wrench SVG icon, rendered in `Hero` above the heading. Accepts `currentlyBuilding?: AvailabilityStatus['currentlyBuilding'] | null` — returns `null` when falsy. When `link` is provided, wraps content in an `<a target="_blank" rel="noopener noreferrer">`. Shows `since [date]` when `since` is provided. Uses the same entrance animation pattern as `AvailabilityBadge` (`initial: {opacity:0, x:-8}`, `duration:0.3`, respects `useReducedMotion()`). To set or change the currently-building project, edit `AVAILABILITY_STATUS.currentlyBuilding` in `src/data/availability.ts`; set to `undefined` to hide the badge.

**Pitch deck discovery page:** `/pitch` route renders `PitchDecksPage` — a browsable grid of all decks. Deck metadata (id, title, tagline, url) lives in `src/data/pitchDecks.ts` as a typed `PITCH_DECKS` array. When adding a new pitch deck that should appear in the discovery page, add an entry there (in addition to placing the HTML in `client/public/pitch/`). The `PitchDeckCard` component renders each card with Framer Motion `whileHover` scale and staggered entrance animation; clicking a card opens `PitchDeckViewer` — a fullscreen accessible modal (`role="dialog"`, `aria-modal`, focus trap via `useFocusTrap`, Escape key to close, focus returns to the trigger card on close) that renders the deck in a full-screen iframe with a Framer Motion fade. `PitchDecksPage` manages viewer state (`isViewerOpen`, `viewerDeck`, `triggerRef`) and passes them to both `PitchDeckCard` and `PitchDeckViewer`.

**Contact form (ME-31):** `ContactForm` (`components/ContactForm/index.tsx`) is a name/email/message form rendered inside the `Contact` section. Form state, validation, and submission are handled by `useContactForm` (`hooks/useContactForm.ts`). The hook POSTs `{ name, email, message }` to `VITE_CONTACT_FORM_ENDPOINT` (a Vite env var — see `.env.example`; intended for EmailJS or Formspree free-tier endpoints). When the endpoint var is unset the hook surfaces a configuration error rather than throwing. `useContactForm` accepts an optional `fetchFn` parameter (defaults to global `fetch`) for test injection — pass a mock there, do not spy on `window.fetch`. After a successful send the form auto-resets after 2 seconds. Validation: name required (≤100 chars), valid email, message required (≤1000 chars); errors are cleared field-by-field on change. `ContactFormState` = `'idle' | 'submitting' | 'success' | 'error'`.

**Testimonials section (ME-34):** `Testimonials` (`components/Testimonials/index.tsx`) renders a grid of `TestimonialCard` items using the staggered scroll-reveal pattern (`useStaggeredReveal(index)` + `useReducedMotion()`). Data lives in `src/data/testimonials.ts` as `TESTIMONIALS: Testimonial[]` — `Testimonial` has `name`, `title`, `company`, `quote`, and optional `linkedInUrl` and `avatarUrl`. `Testimonials` returns `null` when `TESTIMONIALS` is empty, so the section hides itself automatically when no testimonials are present. To add testimonials, edit `src/data/testimonials.ts` only. The section is wired into `App.tsx`, `Nav`, and `MobileNavDrawer`.

The site is **frontend-only** for now (no internal server; the contact form calls an external third-party endpoint). Keep data-fetching in hooks so components are unchanged when a backend is added.

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
- **Mobile nav:** `HamburgerButton` (animated ☰→✕ icon, `aria-expanded`) and `MobileNavDrawer` (slide-in from right, backdrop, Escape key closes) are established components. `AnimatePresence` wraps the drawer for exit animations. Z-index: backdrop at `z-[999]`, drawer at `z-[1000]`. `Nav` passes a `hamburgerRef` to both — `HamburgerButton` forwards it via `forwardRef`, and `MobileNavDrawer` accepts `triggerButtonRef` to restore focus to the button when the drawer closes.
- **Accessibility:** `SkipToContent` (rendered before `<Nav>` in `App.tsx`) is a visually-hidden skip link that becomes visible on focus and links to `#main-content`. The `<main>` element carries `id="main-content"` and `role="main"`. Z-index for SkipToContent is `z-[1100]` (above the drawer). Nav links use `aria-current="page"` for the active section. The `useFocusTrap` hook (from `hooks/useFocusTrap`) traps keyboard Tab focus within a container while active — used by `MobileNavDrawer` to keep focus inside the open drawer.

## Key Conventions

- Functional components with explicit props interfaces
- Named exports only from `src/data/` (no default exports)
- Use CSS custom properties from `src/styles/` and `src/index.css` — no hardcoded colours. Design tokens: `--color-accent` (#3B82F6), `--color-muted` (#888888), `--success` (#10b981 — availability/success states)
- `Project` type: `techStack: string[]` holds the array of technology labels (renamed from `tags` in earlier versions). Link fields: `githubUrl` (optional — omit for projects without a public repo), `pitchUrl` (optional — internal React Router path, e.g. `/projects/<id>`), `externalPitchUrl` (optional — external URL to a pitch deck hosted outside this app, opens in new tab), `demoUrl` (optional — external URL to a live deployment), and `pitchDeckPath` (optional — path to the pitch deck HTML file within `client/public/`, e.g. `/pitch/jira-code.html` or `/pitch/mr-reviewer/index.html`; used by project detail page components to render the deck in an iframe). Use `pitchUrl` for projects with an internal pitch page; use `externalPitchUrl` when the pitch deck is hosted externally. All five can coexist. `coverImage` (optional — URL for the hero cover image shown at the top of the project's detail page via `ProjectCoverHeader`; uses above-the-fold animation pattern). `screenshotUrl` (optional — URL for a 16:9 project screenshot rendered at the top of `ProjectCard` in the Projects grid; uses `loading="lazy"` and `referrerPolicy="no-referrer"`; falls back to a plain surface-colored placeholder div when absent). `metrics` (optional — `{ label: string; value: string }[]` array of project stats rendered by `ProjectMetrics` on the detail page; e.g. `[{ label: 'Issues Processed', value: '1,200+' }]`). `metaDescription` (optional — a longer SEO description used in OG/Twitter meta tags on project detail pages; falls back to `description` when absent).
- **SEO / OG meta tags:** Project detail pages use `react-helmet-async` (`<Helmet>` from `react-helmet-async`) to set per-page `<title>` and Open Graph / Twitter Card meta tags. `HelmetProvider` wraps the app in `main.tsx`. The pattern: title is `{project.name} | {OWNER_NAME}` (`OWNER_NAME` is exported from `data/projects.ts`); OG description uses `project.metaDescription || project.description`; OG image uses `project.screenshotUrl || '/og-default.png'` (the fallback `og-default.png` lives in `client/public/`); Twitter card type is `summary_large_image` when `screenshotUrl` is set, otherwise `summary`. Default OG meta for the home page lives in `client/index.html`. When adding a new project detail page, follow the same `<Helmet>` block pattern used in the existing project pages.
- `Experience` type: `achievements?: string[]` is optional. When present, `TimelineEntry` renders `achievements` instead of `bullets`.
- **Project filtering:** `Projects` uses `useProjectFilter` hook (from `hooks/`) for tech stack filtering and renders a `ProjectFilter` chip strip above the grid. Active tech state is global via `TechFilterContext` — `Projects` reads `activeTech`/`setActiveTech` from `useTechFilter()` and passes `activeTech` as `externalActiveTech` to `useProjectFilter`; single-select only, clicking the active tag again clears it (`null` = all projects shown). `ProjectFilter` props: `{ activeTech, onSetActiveTech, allTags }` — renders alphabetically-sorted tag pills plus an "All" button. `Projects.tsx` wraps the filtered grid in `AnimatePresence mode="popLayout"` with each card in a `motion.div` (layout prop, enter/exit animations); `useReducedMotion()` sets transition duration to 0 when true. `getAllTechStacks()` (from `data/projects.ts`) extracts a deduplicated sorted list of all tech labels across all projects — use it to populate the filter and anywhere else a full tech list is needed.
- **Related projects:** `findRelatedProjects(currentProject, allProjects, limit?)` (from `utils/projectUtils.ts`) returns up to `DEFAULT_RELATED_PROJECTS_LIMIT` (3) projects ranked by tech stack overlap (case-insensitive). The `RelatedProjects` component (`components/RelatedProjects/index.tsx`) renders these below the pitch deck on project detail pages — add `<RelatedProjects currentProject={project} />` after `<PitchDeckPage>` when creating new project pages. Its logic lives in the `useRelatedProjects` hook (`hooks/useRelatedProjects.ts`), which wraps `findRelatedProjects` with the full project list. Project tests that render a page component must mock `../../components/RelatedProjects`.
- **Project navigation:** `ProjectNavButtons` (from `components/ProjectNavButtons/`) renders prev/next project links at the bottom of project detail pages. Uses `useAdjacentProjects(projectId)` hook which returns `{prev, next}` by wrapping around the `projects` array circularly. Navigates via each project's `pitchUrl` (falls back to `'/'` if unset). Add `<ProjectNavButtons projectId={project.id} />` after `<RelatedProjects>` when creating new project pages. Tests that render a project page must mock `../../components/ProjectNavButtons/ProjectNavButtons`.

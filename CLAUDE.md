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
    hooks/        # Custom React hooks (data-fetching logic isolated here for future API swap)
    data/         # Static content (projects, experience, skills) as typed TS objects
    types/        # Shared TypeScript interfaces
    styles/       # Global CSS custom properties / design tokens
    test/
      setup.ts    # @testing-library/jest-dom (auto-loaded by vitest)
    main.tsx      # Entry point (excluded from coverage)
    App.tsx       # Root component — renders section components in order
```

Content lives in `src/data/` as plain TypeScript objects (no CMS). To add/update projects or experience, edit those files.

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

## Key Conventions

- Functional components with explicit props interfaces
- Named exports only from `src/data/` (no default exports)
- Use CSS custom properties from `src/styles/` — no hardcoded colours

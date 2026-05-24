# me — Euston Lee's Portfolio

Personal portfolio site for **Euston Lee**, Software Engineer. Built with Vite + React + TypeScript.

**Live:** [eustonlee.com](https://eustonlee.com)

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Router v6
- Vitest + Testing Library (100% coverage enforced)

## Design

Bold & modern: `#0A0A0A` background, white text, `#3B82F6` electric blue accent.

## Getting started

```bash
npm install        # install all workspaces
npm run dev        # start Vite dev server (HMR)
npm run build      # type-check + build to client/dist/
npm run preview    # serve production build locally
```

## Testing & linting

```bash
npm test                # run all tests once
npm run test:watch      # watch mode
npm run test:coverage   # must hit 100% coverage

npm run lint            # ESLint check
npm run lint:fix        # ESLint auto-fix
npm run format          # Prettier format
npm run format:check    # Prettier check (CI)
```

## Structure

```
client/   # Vite + React + TypeScript frontend
pitch/    # Standalone HTML pitch decks (not part of Vite build)
```

See [CLAUDE.md](CLAUDE.md) for full architecture and conventions.

<!-- git-wrap-up-baseline: 0197524 -->

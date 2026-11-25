# moduix + Vue + Tailwind + Vite

A standalone TypeScript app using the published `@moduix/vue-tailwind` package with Tailwind CSS v4.
Requires Node.js 22.12+ and pnpm (or any Node package manager).

## Create an app

```bash
pnpm dlx giget@latest gh:Blinks44/moduix/starters/vue-vite-tailwind my-app
cd my-app
pnpm install
pnpm dev
```

Open the address printed by Vite. Edit `src/App.vue` to start building.
The Projects dashboard demonstrates the flat component API with Tailwind CSS v4 utilities; the
foundation tokens, Tailwind import, and `@source` directive live in `src/styles.css`. The app
follows your system's light or dark theme; the topbar button overrides it.

Search and filter the table, create or edit projects in a Dialog, and undo deletion from a Toast.
The sidebar also opens Team, Reports, and Settings; on mobile it becomes a Drawer.
Sample data lives in `src/data.ts`. Edits stay in memory and reset when the page reloads.
Connect your API in `src/App.vue` to persist changes.
`#app-root` uses `isolation: isolate` so portalled overlays always stack above the app.

## Build

```bash
pnpm build
pnpm preview
```

`build` checks TypeScript and produces `dist/`. `preview` serves that build locally.
Stop either server with Ctrl+C.

[Open in StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/vue-vite-tailwind)
· [Documentation](https://moduix.dev/docs/quick-start)

This directory is intentionally outside the monorepo workspace. Its own lockfile and npm
versions let it run without the rest of the repository. Its local `pnpm-workspace.yaml`
keeps installs independent when working inside the monorepo too.
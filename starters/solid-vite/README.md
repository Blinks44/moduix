# moduix + Solid + Vite

A standalone TypeScript app using the published `@moduix/solid` package with CSS Modules.
Requires Node.js 22.12+ and pnpm 12.14.0.

## Create an app

```bash
pnpm dlx giget@latest gh:Blinks44/moduix/starters/solid-vite my-app
cd my-app
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by Vite. Edit `src/App.tsx` to start building.
The Projects dashboard demonstrates the flat component API; foundation styles and the reset are
imported once in `src/main.tsx`. The app follows your system's light or dark theme; the topbar button overrides it.

Search and filter the table, create or edit projects in a Dialog, and undo deletion from a Toast.
The sidebar also opens Team, Reports, and Settings; on mobile it becomes a Drawer.
Sample data lives in `src/data.ts`. Edits stay in memory and reset when the page reloads.
Connect your API in `src/App.tsx` (or `src/App.vue` for Vue) to persist changes.
Overlays render inside `#app-root` through the native portal reference in `src/portal.ts`.

## Build

```bash
pnpm build
pnpm preview
```

`build` checks TypeScript and produces `dist/`. `preview` serves that build locally.
Stop either server with Ctrl+C.

[Open in StackBlitz](https://stackblitz.com/github/Blinks44/moduix/tree/main/starters/solid-vite)
· [Documentation](https://moduix.dev/docs/quick-start)

This directory is intentionally outside the monorepo workspace. Its own lockfile and npm
versions let it run without the rest of the repository. Its local `pnpm-workspace.yaml`
keeps installs independent when working inside the monorepo too.
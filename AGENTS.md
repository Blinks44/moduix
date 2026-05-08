# moduix-monorepo

Monorepo for the UI component library and its documentation.

## Packages

| Package | Path          | Purpose              |
| ------- | ------------- | -------------------- |
| `ui`    | `packages/ui` | UI component library |
| `docs`  | `apps/docs`   | Documentation site   |

## Routing

Before starting work, identify which package the task belongs to and read that package's `AGENTS.md`:

- Component work (creation, updates, styles, Storybook) -> `packages/ui/AGENTS.md`
- Documentation work (site, pages, routing) -> `apps/docs/AGENTS.md`

Always read the target package instructions before changing files. If a task touches both packages, read both files.

## General Rules

- The monorepo is managed with Turborepo (`turbo.json`).
- Linting uses `oxlint` (config in `packages/oxlint-config`).
- Formatting uses `oxfmt` (config in `packages/oxfmt-config`).
- Before working on documentation, build the UI package from the monorepo root with `npm run build:ui`; docs import `moduix` from the built output, so fresh UI changes will not be available otherwise.
- In MDX code snippets, avoid TypeScript generic syntax like `useState<T>()` when an equivalent `as T` assertion works. IDE MDX parsers may treat `<T>` as JSX and report cascading formatting errors.
- Do not start a dev server yourself. The user always starts it when opening the project, so Storybook, docs, and dev servers should be treated as already running. Use the existing server for checks.

## Validation

After code changes, run these commands from the monorepo root:

- Format: `npm run fmt:fix`
- Lint: `npm run lint:check`
- TypeScript check: `npm run tsc:check`
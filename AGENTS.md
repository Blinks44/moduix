# moduix-monorepo

Monorepo for the Ark-backed `moduix` React component library, shadcn-compatible registry output,
and documentation site. Treat the library as shipped software in active development: preserve the
current public API, keep docs aligned with behavior, and remove stale guidance when contracts change.

## Skill Routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md).

- Always apply `.agents/skills/engineering-principles/SKILL.md` for coding tasks.
- For CSS or CSS Modules work, apply `.agents/skills/css-authoring/SKILL.md`.
- For JS/TS work, apply `.agents/skills/js-react-conventions/SKILL.md`.
- For TanStack Start, TanStack Router, or TanStack Intent work in `apps/docs`, apply `.agents/skills/tanstack-intent/SKILL.md`.
- For Ark UI or shadcn reference material, apply `.agents/skills/upstream-library-docs/SKILL.md`.
- For component work in `packages/react`, apply `.agents/skills/ui-component-workflow/SKILL.md`.
- When the user explicitly asks to create or update a changeset, apply `.agents/skills/changeset-workflow/SKILL.md`.
- For local component markdown in `packages/react/src/components`, apply `.agents/skills/local-component-docs/SKILL.md`.
- For docs work in `apps/docs`, apply `.agents/skills/docs-workflow/SKILL.md`.
- For tasks that touch both `packages/react` and `apps/docs`, also apply `.agents/skills/cross-package-sync/SKILL.md`.

`engineering-principles` is the immutable baseline skill. Keep project-specific rules in dedicated
skills. `AGENTS.md` owns routing, repo-wide rules, and validation; skills should stay narrow and
should not repeat the same validation matrix.

If a task spans UI and docs, apply skills in this order:

1. `engineering-principles`
2. `css-authoring` when CSS or CSS Modules are part of the task
3. `upstream-library-docs` when upstream Ark UI or shadcn behavior matters
4. `ui-component-workflow`
5. `local-component-docs` when component markdown is created or updated
6. `cross-package-sync`
7. `docs-workflow`

## Repository Rules

### Global

- Monorepo uses Turborepo (`turbo.json`).
- Linting uses `oxlint` from `packages/oxlint-config`.
- Formatting uses `oxfmt` from `packages/oxfmt-config`.
- Do not start dev servers manually; use the already running project server.
- Do not open, launch, or automate a browser unless the user explicitly asks for browser testing or visual inspection.

### Shared Library Contract

- Components are thin, styled Ark UI wrappers by default unless local component docs say otherwise.
- Preserve Ark anatomy, controlled/uncontrolled behavior, callback detail objects, refs, `asChild`,
  provider/context hooks, `HiddenInput`, and data attributes unless an intentional moduix difference
  is documented.
- Keep component APIs, naming, and composition patterns consistent across similar components.
- `packages/react/src/components` uses `kebab-case` directories. Keep implementation files in their
  existing names, for example `packages/react/src/components/password-input/PasswordInput.tsx`.
- Use relative imports for component-to-component dependencies inside `packages/react/src/components`.
- Use `@/lib/moduix/*` for shared registry-safe utilities, icons, and styles.
- Read Ark UI and shadcn references online through `.agents/skills/upstream-library-docs/SKILL.md`;
  do not rely on local snapshots.

### Docs and Registry Sync

- Before docs changes or docs validation that depend on React output, run `npm run build:react` from
  the repo root.
- After changes to a component in `packages/react`, update that component's local `.md` file in
  `packages/react/src/components` when behavior, API, styling contract, or recommended usage changed.
- The root `registry.json` is the source of truth for the shadcn/GitHub registry. Source files in
  registry items point directly at `packages/react/src/...`.
- `npm run build:registry` generates JSON artifacts into `packages/react/registry/default`.
- Consumer registry targets remain namespaced under `@components/moduix/*` and `@lib/moduix/*`.
- In MDX snippets, prefer `as T` over `useState<T>()`; MDX can parse `<T>` as JSX.

## Required Validation

After code changes, run from repo root:

- `npm run fmt:fix`
- `npm run lint:check`
- `npm run build:react` before `npm run tsc:check` when `packages/react` changed or docs depend on fresh React output
- Never run `npm run build:react` and `npm run tsc:check` in parallel. Wait for `build:react` to finish successfully before starting `tsc:check`.
- `npm run tsc:check`
- `npm run build:registry` after validation when registry-shipped source code in `packages/react` changed
# moduix-monorepo

Monorepo for the Ark-backed `moduix` React component library, shadcn-compatible registry output,
and documentation site. Treat the library as shipped software in active development: preserve the
current public API, keep docs aligned with behavior, and remove stale guidance when contracts change.

## Skill Routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md).

- Always apply `.agents/skills/engineering-principles/SKILL.md` for coding tasks.
- For a complete production review of one component and its docs, apply
  `.agents/skills/component-production-review/SKILL.md`.
- For CSS or CSS Modules work, apply `.agents/skills/css-authoring/SKILL.md`.
- For JS/TS work, apply `.agents/skills/js-react-conventions/SKILL.md`.
- For Ark UI or shadcn reference material, apply `.agents/skills/upstream-library-docs/SKILL.md`.
- For component work in `packages/react`, apply `.agents/skills/ui-component-workflow/SKILL.md`.
- When the user explicitly asks to create or update a changeset, apply `.agents/skills/changeset-workflow/SKILL.md`.
- For local component markdown in `packages/react/src/components`, apply `.agents/skills/local-component-docs/SKILL.md`.
- For docs work in the Rspress 2 app in `apps/docs`, apply `.agents/skills/docs-workflow/SKILL.md` and `.agents/skills/rspress-best-practices/SKILL.md`.
- For migrating or reviewing live-preview sizing and docs-only controls, apply
  `.agents/skills/preview-frame-migration/SKILL.md`.
- For Rspress theme or layout work, apply `.agents/skills/rspress-custom-theme/SKILL.md`.
- When creating documentation pages, apply `.agents/skills/rspress-description-generator/SKILL.md`.
- For tasks that touch both `packages/react` and `apps/docs`, also apply `.agents/skills/cross-package-sync/SKILL.md`.

`engineering-principles` is the immutable baseline skill. Keep project-specific rules in dedicated
skills. `AGENTS.md` owns routing, repo-wide rules, and validation; skills should stay narrow and
should not repeat the same validation matrix.

If a task spans UI and docs, apply skills in this order:

1. `engineering-principles`
2. `component-production-review` when the task is a full one-component production review
3. `css-authoring` when CSS or CSS Modules are part of the task
4. `upstream-library-docs` when upstream Ark UI or shadcn behavior matters
5. `ui-component-workflow`
6. `local-component-docs` when component markdown is created or updated
7. `cross-package-sync`
8. `docs-workflow`
9. `rspress-best-practices`
10. `preview-frame-migration` when existing live previews are in scope

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

- For interactive docs development, use the already-running `npm run dev:docs` workflow. Turbo first
  creates a clean React `dist`, then keeps it current through `rslib --watch --no-clean`; do not run
  `npm run build:react` alongside that watcher.
- `npm run build:docs` is an explicit production/CI check, not part of normal docs development or
  routine agent validation. Its dependency graph performs a clean React build, so never run it while
  `dev:docs` is active. Do not manually prebuild React for docs-only changes.
- `npm run tsc:check` does not rebuild package output, so it is safe during `dev:docs`. It relies on
  the package-shaped `dist` produced by the workflow's initial build and watcher.
- After changes to a component in `packages/react`, update that component's local `.md` file in
  `packages/react/src/components` when behavior, API, styling contract, or recommended usage changed.
- `registry/registry.json` is the source manifest for the hosted React registry. Source files in
  registry items point directly at `packages/react/src/...`.
- `npm run build:registry` generates the deployed JSON artifacts into `apps/docs/docs/public/r/react`.
- Consumer registry targets remain namespaced under `@components/moduix/*` and `@lib/moduix/*`.
- In MDX snippets, prefer `as T` over `useState<T>()`; MDX can parse `<T>` as JSX.

## Required Validation

After code changes, run from repo root:

- `npm run fmt:fix`
- `npm run lint:check`
- Run `npm run build:react` before `npm run tsc:check` when `packages/react` source, package output,
  or Rslib configuration changed. Docs-only work does not require a separate React build.
- Never run `npm run build:react` and `npm run tsc:check` in parallel. Wait for `build:react` to finish successfully before starting `tsc:check`.
- Run `npm run tsc:check`; it checks the current package-shaped `dist` without rebuilding it.
- `npm run build:registry` after validation when registry-shipped source code in `packages/react` changed
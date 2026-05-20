# moduix-monorepo

Monorepo for the UI component library and documentation.

## Skill Routing

Use project skills from [`.ai/skills/`](.ai/skills/README.md).

- Component work in `packages/ui` (new component, API/style updates, Storybook) -> `.ai/skills/ui-component-workflow/SKILL.md`
- Documentation work in `apps/docs` (pages, MDX, examples, docs routing/content) -> `.ai/skills/docs-workflow/SKILL.md`
- Tasks that touch both packages or require docs/UI parity -> `.ai/skills/cross-package-sync/SKILL.md`

If a task spans UI and docs:

1. Apply `ui-component-workflow`.
2. Apply `cross-package-sync`.
3. Apply `docs-workflow`.

## Global Rules

- Monorepo is managed with Turborepo (`turbo.json`).
- Linting uses `oxlint` (config in `packages/oxlint-config`).
- Formatting uses `oxfmt` (config in `packages/oxfmt-config`).
- Do not start dev servers manually; use the already running project server.
- Before docs validation or docs changes that depend on UI output, run `npm run build:ui` from repo root.
- In MDX snippets, avoid `useState<T>()` style generics when `as T` works; MDX parsers can treat `<T>` as JSX.

## Required Validation

After code changes, run from repo root:

- `npm run fmt:fix`
- `npm run lint:check`
- `npm run tsc:check`
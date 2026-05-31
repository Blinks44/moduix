# moduix-monorepo

Monorepo for the UI component library and documentation.

## Skill Routing

Use project skills from [`.ai/skills/`](.ai/skills/README.md).

- For every coding task, first apply `.ai/skills/engineering-principles/SKILL.md` (mandatory baseline).
- If `rtk` is installed and available in `PATH`, immediately after that apply `.ai/skills/rtk-command-proxy/SKILL.md` (mandatory baseline for shell commands).
- If `rtk` is not installed, skip `rtk-command-proxy` and run shell commands directly.
- For JS/TS coding tasks, apply `.ai/skills/js-react-conventions/SKILL.md`.
- Component work in `packages/ui` (new component, API/style updates, Storybook) -> `.ai/skills/ui-component-workflow/SKILL.md`
- Documentation work in `apps/docs` (pages, MDX, examples, docs routing/content) -> `.ai/skills/docs-workflow/SKILL.md`
- Tasks that touch both packages or require docs/UI parity -> `.ai/skills/cross-package-sync/SKILL.md`

`engineering-principles` and `rtk-command-proxy` are immutable baseline skills when applied. Do not add
project-specific coding style rules to them; place those rules in dedicated skills.

If a task spans UI and docs:

1. Apply `engineering-principles`.
2. If `rtk` is available, apply `rtk-command-proxy`; otherwise skip it.
3. Apply `ui-component-workflow`.
4. Apply `cross-package-sync`.
5. Apply `docs-workflow`.

## Global Rules

- Monorepo is managed with Turborepo (`turbo.json`).
- Linting uses `oxlint` (config in `packages/oxlint-config`).
- Formatting uses `oxfmt` (config in `packages/oxfmt-config`).
- Do not start dev servers manually; use the already running project server.
- Before docs validation or docs changes that depend on UI output, run `npm run build:ui` from repo root.
- After changes in `packages/ui`, run `npm run build:ui` before `npm run tsc:check`, otherwise workspace consumers can read stale declaration output.
- In MDX snippets, avoid `useState<T>()` style generics when `as T` works; MDX parsers can treat `<T>` as JSX.
- Keep component APIs, naming, code structure, and composition patterns uniform across the library. Similar components must use the same prop names and conventions (for example, avoid mismatches like `withArrow` vs `showArrow` for the same behavior).

## Required Validation

After code changes, run from repo root:

- `npm run fmt:fix`
- `npm run lint:check`
- `npm run build:ui` (before `npm run tsc:check` when `packages/ui` changed)
- `npm run tsc:check`
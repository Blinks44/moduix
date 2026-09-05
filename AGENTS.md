# moduix-monorepo

`moduix` is an Ark UI-backed React and Solid component system distributed as CSS Modules and Tailwind packages, with shadcn-compatible registries and an Rspress documentation site.

## Workspace map

- `packages/react` and `packages/solid` — public framework-native CSS Modules packages, tests, and component-local docs.
- `packages/react-tailwind` and `packages/solid-tailwind` — public Tailwind variants kept behaviorally aligned with their framework counterparts.
- `playgrounds/react`, `playgrounds/solid`, `playgrounds/react-tailwind`, and `playgrounds/solid-tailwind` — private Storybooks for parity checks.
- `website` — the Rspress documentation site, runnable component examples, and generated registry artifacts.
- `packages/foundation/registry.json` and each public package's `registry.json` — source manifests for the hosted registries; each manifest owns files within its package.
- `packages/oxlint-config` and `packages/oxfmt-config` — shared linting and formatting configuration.

## Skill routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md). Apply only the skills that match the changed surface.

- **Any coding task:** `engineering-principles`.
- **Any component implementation or public contract change:** `ui-component-workflow`; it owns the four-package impact check and synchronization of existing counterparts, tests, stories, exports, and registries.
- **React implementation in `packages/react` or `packages/react-tailwind`:** `js-react-conventions`.
- **React-to-Solid component ports or synchronization:** `react-to-solid`; additionally use `css-authoring` for styles,
  `upstream-library-docs` for current Ark Solid behavior, `rstest-best-practices` for tests, and
  `rslib-best-practices` when changing a Solid package build.
- **Tailwind component work:** `tailwind-component-workflow`; also use `css-authoring`, the applicable framework skill, and `rstest-best-practices` when tests change.
- **Component styles or shared tokens:** `css-authoring`; synchronize existing CSS Modules and Tailwind counterparts through `ui-component-workflow`.
- **Component-local markdown:** `local-component-docs`.
- **Rspress pages, examples, or CSS-variable documentation in `website`:** `docs-workflow`; additionally use
  `rspress-description-generator` for new-page or description-frontmatter work, `rspress-best-practices` for
  Rspress configuration, navigation, build, deployment, or debugging, `rspress-localization` for any localization
  work, and `rspress-custom-theme` for theme
  or layout changes.
- **Tests:** `rstest-best-practices`.
- **Rslib configuration or library build issues:** `rslib-best-practices`.
- **Changesets:** `changeset-workflow`, only when the user explicitly requests one.

For work that changes packages and `website`, apply component skills first and documentation skills second. Do not duplicate framework mechanics: `ui-component-workflow` coordinates parity, while framework and styling skills own native implementation details.

## Required validation

After code changes, run from the repository root:

- `pnpm run fmt:fix`
- `pnpm run lint:check`
- `pnpm run tsc:check`
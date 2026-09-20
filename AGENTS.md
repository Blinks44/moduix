# moduix-monorepo

`moduix` is a multi-framework, Ark UI-backed component system distributed as CSS Modules and Tailwind packages, with shadcn-compatible registries and an Rspress documentation site. React and Solid adapters ship today; the Vue adapter is in development; Svelte adapters are planned. Shared workflows must be framework-neutral and discover shipped adapters instead of assuming that the current package count is permanent.

## Workspace map

- `packages/<framework>`: public framework-native CSS Modules adapters, tests, and component-local docs. The current adapters are `react` and `solid`; `vue` is scaffolded and in development.
- `packages/<framework>-tailwind`: public Tailwind variants kept behaviorally aligned with the CSS Modules adapter for that framework. The current variants are `react-tailwind` and `solid-tailwind`; `vue-tailwind` is scaffolded and in development.
- `playgrounds/<framework>` and `playgrounds/<framework>-tailwind`: private playgrounds for parity checks when that adapter ships.
- `website` - the Rspress documentation site, runnable component examples, and generated registry artifacts.
- `packages/foundation/registry.json` and each public package's `registry.json` - source manifests for the hosted registries; each manifest owns files within its package.
- `packages/oxlint-config` and `packages/oxfmt-config` - shared linting and formatting configuration.

## README package-manager commands

GitHub Markdown does not provide the interactive package-manager tabs used by Rspress. Use `pnpm`
for installation, CLI, and repository commands in the root and package README files. npm badges and
links may still identify the registry where a package is published.

## Skill routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md). Apply only the skills that match the changed surface.

- **Any coding task:** `engineering-principles`.
- **Any component implementation or public contract change:** `component-workflow`; it owns the shipped-adapter impact check and synchronization of existing counterparts, tests, stories, exports, and registries.
- **React implementation in `packages/react` or `packages/react-tailwind`:** `conventions-react`.
- **Vue implementation in `packages/vue` or `packages/vue-tailwind`:** `conventions-vue`; additionally use `research-upstream-libraries` for current Ark Vue behavior.
- **Framework-specific implementation:** use the matching native convention or migration skill when
  it exists. Add a focused framework skill when a new adapter enters development instead of expanding
  React or Solid instructions into generic pseudocode.
- **Component ports to Solid:** `migration-component-to-solid`; it creates or synchronizes both the
  CSS Modules and Tailwind Solid adapters. Additionally use `conventions-css` for styles,
  `research-upstream-libraries` for current Ark Solid behavior, `rstest-best-practices` for tests,
  and `rslib-best-practices` when changing a Solid package build.
- **Component ports to Vue:** `migration-component-to-vue`; it creates or synchronizes both the CSS
  Modules and Tailwind Vue adapters. Additionally use `conventions-vue`, `conventions-css`,
  `research-upstream-libraries`, and `rstest-best-practices`; use `rslib-best-practices` only when
  changing a Vue package build.
- **CSS Modules-to-Tailwind component migrations:** `migration-css-modules-to-tailwind`; also use
  `conventions-css`, the applicable framework convention skill, and `rstest-best-practices` when
  tests change. Do not load a framework migration skill unless the framework adapter itself is also
  missing or being repaired.
- **Component styles or shared tokens:** `conventions-css`; synchronize existing CSS Modules and Tailwind counterparts through `component-workflow`.
- **Component-local markdown:** `component-contract-docs`.
- **Rspress pages, examples, framework synchronization, or CSS-variable documentation in `website`:** `docs-workflow`; additionally use
  `rspress-description-generator` for new-page or description-frontmatter work, `rspress-best-practices` for
  Rspress configuration, navigation, build, deployment, or debugging, `rspress-localization` for any localization
  work, and `rspress-custom-theme` for theme
  or layout changes.
- **Tests:** `rstest-best-practices`.
- **Rslib configuration or library build issues:** `rslib-best-practices`.
- **Changesets:** `changeset-workflow`, only when the user explicitly requests one.

For work that changes packages and `website`, apply component skills first and documentation skills second. Do not duplicate framework mechanics: `component-workflow` coordinates parity, while migration and convention skills own native implementation details.

## Required validation

After code changes, run from the repository root:

- `pnpm run fmt:fix`
- `pnpm run lint:check`
- `pnpm run tsc:check`
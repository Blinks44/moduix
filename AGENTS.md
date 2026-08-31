# moduix-monorepo

`moduix` is an Ark UI-backed React component library with a shadcn-compatible registry and an Rspress documentation site.

## Workspace map

- `packages/react` — the shipped `@moduix/react` component library, stories, tests, and component-local docs.
- `packages/solid` — the native Solid component library kept contract-compatible with shipped React components as they are ported.
- `playgrounds` — private React and Solid Vite Storybooks for manual visual and interaction parity checks.
- `website` — the Rspress documentation site, runnable component examples, and generated registry artifacts.
- `registry/registry.json` — source manifest for the hosted React registry; its source files point into `packages/react/src`.
- `packages/oxlint-config` and `packages/oxfmt-config` — shared linting and formatting configuration.

## Skill routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md). Apply only the skills that match the changed surface.

- **Any coding task:** `engineering-principles`.
- **React or TypeScript in `packages/react`:** `js-react-conventions` and `ui-component-workflow`; also use
  `css-authoring` for styles, `upstream-library-docs` for Ark/Chakra/shadcn behavior, and
  `local-component-docs` when component markdown changes. Check and synchronize an existing Solid counterpart through
  `ui-component-workflow`.
- **React-to-Solid component ports or synchronization:** `react-to-solid`; additionally use `css-authoring` for styles,
  `upstream-library-docs` for current Ark Solid behavior, `rstest-best-practices` for tests, and
  `rslib-best-practices` when creating or changing the Solid package build. Keep paired framework-native stories in
  `playgrounds/react` and `playgrounds/solid`.
- **Rspress pages, examples, or CSS-variable documentation in `website`:** `docs-workflow`; additionally use
  `rspress-description-generator` for new-page or description-frontmatter work, `rspress-best-practices` for
  Rspress configuration, navigation, build, deployment, or debugging, `rspress-localization` for any localization
  work, and `rspress-custom-theme` for theme
  or layout changes.
- **Tests:** `rstest-best-practices`.
- **Rslib configuration or library build issues:** `rslib-best-practices`.
- **Changesets:** `changeset-workflow`, only when the user explicitly requests one.

For work that changes both `packages/react` and `website`, apply the relevant component skills first, then the
relevant documentation skills. `ui-component-workflow` owns synchronization across the React package, an existing
Solid counterpart, playground stories, and consumer-facing surfaces.

## Required validation

After code changes, run from the repository root:

- `pnpm run fmt:fix`
- `pnpm run lint:check`
- `pnpm run tsc:check`
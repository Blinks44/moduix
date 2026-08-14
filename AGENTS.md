# moduix-monorepo

`moduix` is an Ark UI-backed React component library with a shadcn-compatible registry and an Rspress documentation site.

## Workspace map

- `packages/react` — the shipped `@moduix/react` component library, stories, tests, and component-local docs.
- `apps/docs` — the Rspress documentation site, runnable component examples, and generated registry artifacts.
- `registry/registry.json` — source manifest for the hosted React registry; its source files point into `packages/react/src`.
- `packages/oxlint-config` and `packages/oxfmt-config` — shared linting and formatting configuration.

## Skill routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md). Apply only the skills that match the changed surface.

- **Any coding task:** `engineering-principles`.
- **React or TypeScript in `packages/react`:** `js-react-conventions` and `ui-component-workflow`; also use
  `css-authoring` for styles, `upstream-library-docs` for Ark/Chakra/shadcn behavior, and
  `local-component-docs` when component markdown changes.
- **Rspress pages, examples, or CSS-variable documentation in `apps/docs`:** `docs-workflow`; additionally use
  `rspress-description-generator` for new-page or description-frontmatter work, `rspress-best-practices` for
  Rspress configuration, navigation, build, deployment, or debugging, `rspress-localization` for any localization
  work, and `rspress-custom-theme` for theme
  or layout changes.
- **Tests:** `rstest-best-practices`.
- **Rslib configuration or library build issues:** `rslib-best-practices`.
- **Changesets:** `changeset-workflow`, only when the user explicitly requests one.

For work that changes both `packages/react` and `apps/docs`, apply the relevant component skills first, then the
relevant documentation skills. `ui-component-workflow` owns the synchronization contract between those surfaces.

## Required validation

After code changes, run from the repository root:

- `npm run fmt:fix`
- `npm run lint:check`
- `npm run tsc:check`
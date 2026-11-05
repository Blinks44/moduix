# moduix-monorepo

`moduix` is a multi-framework, Ark UI-backed component system distributed as CSS Modules and Tailwind packages, with shadcn-compatible registries and an Rspress documentation site. React, Solid, and Vue adapters ship today; Svelte adapters are in development and unpublished. Shared workflows must be framework-neutral and discover shipped adapters instead of assuming that the current package count is permanent.

## Workspace map

- `packages/<framework>`: public framework-native CSS Modules adapters, tests, and component-local docs. The current adapters are `react`, `solid`, and `vue`; `svelte` is in development.
- `packages/<framework>-tailwind`: public Tailwind variants kept behaviorally aligned with the CSS Modules adapter for that framework. The current variants are `react-tailwind`, `solid-tailwind`, and `vue-tailwind`; `svelte-tailwind` is in development.
- `playgrounds/<framework>` and `playgrounds/<framework>-tailwind`: private playgrounds for parity checks when that adapter ships.
- `starters/<framework>-vite`: standalone consumer apps using published npm packages; intentionally
  outside the workspace, each with its own lockfile. Validate with `pnpm run check:starters`.
- `website` - the Rspress documentation site, runnable component examples, and generated registry artifacts.
- `packages/foundation/registry.json` and each public package's `registry.json` - source manifests for the hosted registries; each manifest owns files within its package.
- Root `.oxlintrc.json` and `.oxfmtrc.json` - shared linting and formatting configuration (oxlint and oxfmt are root devDependencies).

## README package-manager commands

GitHub Markdown does not provide the interactive package-manager tabs used by Rspress. Use `pnpm`
for installation, CLI, and repository commands in the root and package README files. npm badges and
links may still identify the registry where a package is published.

## Git and local files

- Commit messages follow Conventional Commits: `feat: ...`, `fix: ...`, `docs: ...`.
- Temporary files (plans, reviews, audit scripts, screenshots, logs) go to the gitignored `.local/`.
  Keep durable project artifacts outside `.local/`.
- Clean up after every task: delete temporary scripts, logs, screenshots, downloads, test projects,
  and build output created for one-off verification once they are no longer needed, including
  files in `.local/` and system temporary directories. Stop servers and other processes you started.
- Before handing off, inspect your temporary files and remove obsolete artifacts. Keep only material
  needed for unfinished work; record its path, purpose, and deletion condition in the active plan.
  Preserve active plans and unrelated in-progress work; do not delete files merely by extension.

## Public component API

All framework adapters use one flat public value-export shape. The family name is the root component,
and every other public part is prefixed with that family name: `Accordion`, `AccordionItem`,
`AccordionItemTrigger`, `AccordionRootProvider`, and `AccordionContext`. Hooks stay top-level, such as
`useAccordion`. Do not expose `Component.Part`, `Component.Root`, `Object.assign` compound components,
namespace objects, or duplicate `ComponentRoot` aliases. Keep framework syntax native while preserving
these names across React, Solid, Vue, CSS Modules, Tailwind, npm packages, and registry source.

React, Solid, and Vue implement the flat public API. Treat the flat shape as the existing contract,
not as a compatibility transition. Future adapters must implement this contract directly without
legacy aliases.

## Skill routing

Use project skills from [`.agents/skills/`](.agents/skills/README.md). Apply only the skills that match the changed surface.

- **Any coding task:** `engineering-principles`.
- **Any component implementation or public contract change:** `component-workflow`; it owns the shipped-adapter impact check and synchronization of existing counterparts, tests, stories, exports, and registries.
- **React implementation in `packages/react` or `packages/react-tailwind`:** `conventions-react`.
- **Solid implementation in `packages/solid` or `packages/solid-tailwind`:** `conventions-solid`; additionally use `research-upstream-libraries` when current Ark Solid behavior matters.
- **Vue implementation in `packages/vue` or `packages/vue-tailwind`:** `conventions-vue`; additionally use `research-upstream-libraries` for current Ark Vue behavior.
- **Svelte implementation in `packages/svelte` or `packages/svelte-tailwind`:** `conventions-svelte`; additionally use `research-upstream-libraries` for current Ark Svelte behavior.
- **Framework-specific implementation:** use the matching native convention skill. Add a focused
  convention skill when a new adapter enters development instead of expanding another framework's
  instructions into generic pseudocode.
- **Temporary repository migrations:** follow the applicable local plan in `.local/`. Plans own
  finite rollout order, progress, concurrency, and deletion conditions; permanent framework and
  component mechanics stay in skills. Plans must not be included in commits.
- **Component styles or shared tokens:** `conventions-css`; synchronize existing CSS Modules and Tailwind counterparts through `component-workflow`.
- **Component-local markdown:** `component-contract-docs`.
- **Rspress pages, examples, framework synchronization, or CSS-variable documentation in `website`:** `docs-workflow`; additionally use
  `rspress-description-generator` for new-page or description-frontmatter work, `rspress-best-practices` for
  Rspress configuration, navigation, build, deployment, or debugging, `rspress-localization` for any localization
  work, and `rspress-custom-theme` for theme
  or layout changes.
- **Docs site visuals:** the `Moduix.sketch` design file is the source of truth for the site's look,
  layout, and page structure. Use `sketch-design-to-code` when implementing from it and
  `sketch-design-from-reference` when changing the design; both need the Sketch MCP server.
- **Tests:** `conventions-tests` and `rstest-best-practices`.
- **Rslib configuration or library build issues:** `rslib-best-practices`.
- **Changesets:** `changeset-workflow` for consumer-facing component changes and explicit release-note
  requests. Include a patch or minor changeset before handoff or commit; major requires an explicit
  user decision.

For work that changes packages and `website`, apply component skills first and documentation skills second. Do not duplicate framework mechanics: `component-workflow` coordinates parity, convention skills own native implementation details, and temporary plans own only finite rollout work.

## Required validation

After code changes, run from the repository root:

- `pnpm run fmt:fix`
- `pnpm run lint:check`
- `pnpm run tsc:check`

When an active plan serializes workspace-wide mutating commands for a shared worktree, component
agents run only the scoped checks allowed by that plan. The designated integration owner runs the
deferred repository-wide commands after concurrent agents finish.
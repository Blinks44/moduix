# moduix Project Skills

Local agent skills for maintaining the four public `moduix` component packages, registries, playgrounds, and docs.

The library is Ark-backed and actively developed. Skills should preserve current public contracts,
keep package/docs/registry output aligned, and remove stale instructions when behavior changes.

Skills are intentionally narrow and composable:

- `AGENTS.md` owns routing, repo-wide rules, and validation.
- Each skill owns one technical surface; it links to adjacent skills instead of copying their rules.
- Conditional details live in `references/`, not in every task's initial context.

## Skills

- `engineering-principles` — baseline behavior for all coding work.
- `changeset-workflow` — an explicitly requested `.changeset` entry.
- `component-workflow` — coordinates component contracts across React, Solid, React Tailwind, and Solid Tailwind.
- `migration-react-to-solid` — ports and synchronizes native Solid equivalents, tests, and paired React/Solid playground stories.
- `migration-css-modules-to-tailwind` — ports a component into both Tailwind packages with tests, stories, npm exports, and shadcn registry items.
- `conventions-css` — CSS, CSS Modules, Tailwind, selectors, and public CSS-variable contracts.
- `conventions-react` — React and TypeScript implementation conventions.
- `component-contract-docs` — maintainers' markdown beside a component source file.
- `research-upstream-libraries` — current Ark UI, Chakra UI, and shadcn research.
- `rstest-best-practices` — Rstest configuration and test design.
- `rslib-best-practices` — Rslib configuration, outputs, and build troubleshooting.
- `docs-workflow` — localized MDX, component and framework synchronization, previews, CSS-variable references, and registry guidance in `website`.
- `rspress-best-practices` — Rspress configuration, navigation, search, assets, deployment, and debugging.
- `rspress-custom-theme` — the Rspress visual shell, theme variables, slots, wrappers, and ejection.
- `rspress-description-generator` — description frontmatter and search/AI metadata.
- `rspress-localization` — locale structure, translated MDX, runtime text, parity, and localization review.

## Source Of Truth

Use `AGENTS.md` in the repo root as the source of truth for skill routing, global repository rules,
and required validation. Keep individual skills focused on their own workflow instead of repeating
the same validation matrix.
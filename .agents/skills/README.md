# moduix Project Skills

Local agent skills for maintaining the shipped `moduix` component library and docs.

The library is Ark-backed and actively developed. Skills should preserve current public contracts,
keep package/docs/registry output aligned, and remove stale instructions when behavior changes.

Skills are intentionally narrow and composable:

- `AGENTS.md` owns routing, repo-wide rules, and validation.
- Each skill owns one technical surface; it links to adjacent skills instead of copying their rules.
- Conditional details live in `references/`, not in every task's initial context.

## Skills

- `engineering-principles` — baseline behavior for all coding work.
- `changeset-workflow` — an explicitly requested `.changeset` entry.
- `css-authoring` — CSS, CSS Modules, selectors, and public CSS-variable contracts.
- `js-react-conventions` — React and TypeScript implementation conventions.
- `ui-component-workflow` — shipped component behavior, API, stories, exports, and registry synchronization.
- `local-component-docs` — maintainers' markdown beside a component source file.
- `upstream-library-docs` — current Ark UI, Chakra UI, and shadcn research.
- `rstest-best-practices` — Rstest configuration and test design.
- `rslib-best-practices` — Rslib configuration, outputs, and build troubleshooting.
- `docs-workflow` — consumer-facing MDX, previews, CSS-variable references, and registry guidance in `website`.
- `rspress-best-practices` — Rspress configuration, navigation, search, assets, deployment, and debugging.
- `rspress-custom-theme` — the Rspress visual shell, theme variables, slots, wrappers, and ejection.
- `rspress-description-generator` — description frontmatter and search/AI metadata.
- `rspress-localization` — locale structure, translated MDX, runtime text, parity, and localization review.

## Source Of Truth

Use `AGENTS.md` in the repo root as the source of truth for skill routing, global repository rules,
and required validation. Keep individual skills focused on their own workflow instead of repeating
the same validation matrix.
# moduix Project Skills

Local agent skills for maintaining the multi-framework `moduix` package family, registries, playgrounds, and docs. React, Solid, Vue, and Svelte adapters ship today. General skills discover the adapters that actually exist instead of treating the current package count as permanent.

The library is Ark-backed and actively developed. Skills should preserve current behavior and the
documented target public contract, keep package/docs/registry output aligned, and remove stale
instructions when behavior changes.

The flat public value API is defined once in `AGENTS.md`. Skills follow it and do not restate it;
they must not introduce compound `Component.Part` APIs, namespace objects, or `ComponentRoot` aliases.

Skills are intentionally narrow and composable:

- `AGENTS.md` owns routing, repo-wide rules, and validation.
- Each skill owns one technical surface; it links to adjacent skills instead of copying their rules.
- Conditional details live in `references/`, not in every task's initial context.
- Framework-specific convention skills stay narrow. Add a native skill when a new adapter enters
  development; keep one framework's mechanics out of other framework convention skills.
- Finite repository migrations live in the gitignored `.local/` directory, reference permanent
  skills for implementation, and are deleted after their completion condition is met. Plans are not
  repository documentation and must not be committed.

## Skills

- `engineering-principles`: baseline behavior for all coding work.
- `changeset-workflow`: patch/minor changesets for consumer-facing component changes and explicit release-note requests; major only by explicit user decision.
- `component-workflow`: coordinates component contracts across every shipped framework and styling adapter.
- `conventions-css`: CSS, CSS Modules, Tailwind, selectors, and public CSS-variable contracts.
- `conventions-react`: React and TypeScript implementation conventions.
- `conventions-solid`: Solid and TypeScript implementation conventions.
- `conventions-vue`: Vue and TypeScript implementation conventions.
- `conventions-svelte`: Svelte 5 and TypeScript implementation conventions.
- `conventions-tests`: repository test scope, environment selection, and readable fixtures.
- `component-contract-docs`: maintainers' markdown beside a component source file.
- `research-upstream-libraries`: current Ark UI, Chakra UI, and shadcn research.
- `rstest-best-practices`: Rstest configuration and test design.
- `rslib-best-practices`: Rslib configuration, outputs, and build troubleshooting.
- `docs-workflow`: localized MDX, page-type structure, framework synchronization, previews, package-manager-neutral commands, CSS-variable references, and registry guidance in `website`.
- `rspress-best-practices`: Rspress configuration, navigation, search, assets, deployment, and debugging.
- `rspress-custom-theme`: the Rspress visual shell, theme variables, slots, wrappers, and ejection.
- `rspress-description-generator`: description frontmatter and search/AI metadata.
- `rspress-localization`: locale structure, translated MDX, runtime text, parity, and localization review.
- `sketch-design-to-code`: implement UI from a Sketch document through the Sketch MCP server (vendored from `sketch-hq/agents`).
- `sketch-design-from-reference`: build or refine a Sketch design from a URL, screenshot, or code (vendored from `sketch-hq/agents`).

Claude Code discovers skills only in `.claude/skills/`, so each skill there is a symlink to its
folder in `.agents/skills/`. Add the symlink when adding a skill.

The `rslib-*`, `rspress-*` and `rstest-*` skills come from `rstackjs/agent-skills` (pinned in
`skills-lock.json`) and carry moduix notes added locally; the `sketch-*` skills come from
`sketch-hq/agents` (pinned in `skills-lock.json`, kept byte-identical to upstream and excluded from
oxfmt). Updating any of them from upstream overwrites local edits: diff the result and
re-apply the moduix notes.

## Source Of Truth

Use `AGENTS.md` in the repo root as the source of truth for skill routing, global repository rules,
and required validation. Keep individual skills focused on their own workflow instead of repeating
the same validation matrix.
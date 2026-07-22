# moduix Project Skills

Local agent skills for maintaining the shipped `moduix` component library and docs.

The library is Ark-backed and actively developed. Skills should preserve current public contracts,
keep package/docs/registry output aligned, and remove stale instructions when behavior changes.

Skills are intentionally composable:

- `AGENTS.md` owns routing, repo-wide rules, and validation.
- Each skill should stay narrow, task-specific, and free of repeated validation checklists.
- Prefer linking to adjacent skills over copying their instructions.

## Skills

- `.agents/skills/engineering-principles/SKILL.md` - baseline engineering behavior for coding tasks
- `.agents/skills/css-authoring/SKILL.md` - CSS, CSS Modules, and selector-structure rules
- `.agents/skills/js-react-conventions/SKILL.md` - JS/TS React conventions with a simplicity-first bias
- `.agents/skills/changeset-workflow/SKILL.md` - opt-in workflow for creating or updating `.changeset/*.md` release notes
- `.agents/skills/rspress-best-practices/SKILL.md` - Rspress 2 conventions for configuration, content, themes, and deployment
- `.agents/skills/rspress-custom-theme/SKILL.md` - Rspress theme customization through CSS variables, BEM hooks, and layout slots
- `.agents/skills/rspress-description-generator/SKILL.md` - Rspress page description frontmatter and AI/search metadata
- `.agents/skills/rspress-docs-generator/SKILL.md` - create and maintain Rspress 2 documentation sites
- `.agents/skills/upstream-library-docs/SKILL.md` - routing for online Ark UI, Chakra UI, and shadcn references
- `.agents/skills/ui-component-workflow/SKILL.md` - workflow for `packages/react` component implementation and API changes
- `.agents/skills/local-component-docs/SKILL.md` - rules for component-local markdown and changelog upkeep
- `.agents/skills/docs-workflow/SKILL.md` - workflow for docs pages, examples, and CSS variable docs in `apps/docs`
- `.agents/skills/cross-package-sync/SKILL.md` - parity rules for tasks that touch both UI and docs

## Source Of Truth

Use `AGENTS.md` in the repo root as the source of truth for skill routing, global repository rules,
and required validation. Keep individual skills focused on their own workflow instead of repeating
the same validation matrix.
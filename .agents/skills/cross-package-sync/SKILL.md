---
name: cross-package-sync
description: Use when a task touches both packages/ui and apps/docs, or when a UI change can make docs inaccurate.
---

# Skill: cross-package-sync

Use this skill when work spans `packages/ui` and `apps/docs`.

## Scope

- UI API, behavior, or styling changes that require docs updates
- new UI components that need docs pages or examples
- export changes that affect docs imports or snippets

## Rules

- Follow the skill order in `AGENTS.md`.
- Rebuild UI before validating docs against changed UI output.
- Keep code, stories, local component docs, and site docs aligned to the same current API.
- Remove docs for deleted props, types, styling hooks, feature flags, and legacy examples in the same task.
- Teach the recommended default path first. Keep lower-level composition as the advanced path.
- Reuse `docs-workflow/references/component-doc-patterns.md` for preview and CSS-variable doc rules instead of redefining them here.

## Done Criteria

1. No mismatch remains between touched UI files and docs.
2. Docs no longer teach removed or deprecated behavior.
3. Required validation from `AGENTS.md` passed.
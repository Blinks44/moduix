# Skill: cross-package-sync

Use this skill when a task touches both `packages/ui` and `apps/docs`, or when a UI change can make docs inaccurate.

## Scope

- UI API, behavior, or style changes that require docs updates
- New UI components that require docs pages or examples
- Export changes affecting docs imports or snippets

## Required Sequence

1. Apply `ui-component-workflow`.
2. Run `npm run build:ui` from repo root.
3. Apply `docs-workflow` against the freshly built UI output.

## Synchronization Rules

- Docs must reflect the simplified API, not the historical one.
- Remove docs for deleted props, types, slot APIs, feature flags, or legacy examples in the same task.
- Examples should use the recommended composition-first API, not compatibility shims.
- Exported names, part names, and imports in docs must match the actual UI package.
- `CSS Properties` must reflect the current public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.

## Done Criteria

1. No mismatch remains between touched UI components and docs.
2. Docs no longer teach removed or deprecated complexity.
3. UI was rebuilt before docs verification.
4. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`
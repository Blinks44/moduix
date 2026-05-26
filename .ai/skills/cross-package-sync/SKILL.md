# Skill: cross-package-sync

Use this skill when a task touches both `packages/ui` and `apps/docs`, or when a UI change can make docs inaccurate.

## Scope

- UI API, behavior, or style changes that require docs updates
- New UI components that require docs pages or examples
- Export changes affecting docs imports or snippets

## Required Sequence

Follow the routing order from `AGENTS.md`, then run `npm run build:ui` from repo root before validating docs against changed UI output.

## Synchronization Rules

- Code, CSS, stories, and docs must converge on the same simplified architecture rather than preserving compatibility-era complexity in one layer.
- Docs must reflect the simplified API, not the historical one.
- Remove docs for deleted props, types, slot APIs, feature flags, or legacy examples in the same task.
- Examples should use the recommended composition-first API, not compatibility shims.
- Default examples should use the simple high-level path.
- If low-level parts remain as an escape hatch, keep them documented as an advanced path and ensure the names match the actual exported building blocks.
- When a component family shares a small-sugar contract, docs and stories should use the same prop
  names and supported behavior across that family.
- If a popup-family component exposes a built-in arrow, keep its default state consistent across
  that family and update docs/stories/examples in the same task when the default changes.
- Keep popup-family and dialog-family contracts separate in docs and stories. Do not let one
  family inherit the other's sugar vocabulary by accident.
- When a component keeps a narrow DX sugar prop, make sure code, stories, and docs all present it
  as a small convenience on top of the default path rather than as a replacement for composition.
- `CSS Properties` must reflect the current public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- When a UI simplification removes CSS hooks, verify that docs, stories, and examples stop referencing them in the same task.

## Done Criteria

1. No mismatch remains between touched UI components and docs.
2. Docs no longer teach removed or deprecated complexity.
3. UI was rebuilt before docs verification.
4. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`
5. The same default usage and escape-hatch story appears consistently across UI, stories, and docs.
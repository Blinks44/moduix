---
name: ui-component-workflow
description: Coordinate moduix component behavior, API, styles, tests, stories, exports, and registries across React, Solid, React Tailwind, and Solid Tailwind packages.
---

# UI Component Workflow

Own the public component contract across the four package variants:

| Runtime | CSS Modules      | Tailwind                  |
| ------- | ---------------- | ------------------------- |
| React   | `packages/react` | `packages/react-tailwind` |
| Solid   | `packages/solid` | `packages/solid-tailwind` |

Use framework-native code in every package. Share tokens, animations, reset, and presets through
`packages/foundation`; do not create a shared component runtime or generate framework source.

## Start with an impact check

Before editing, locate the component in all four packages and their tests, playground stories,
exports, local markdown, and registry items.

- Synchronize every counterpart that already exists and is affected by the changed contract.
- A new component intended for the package family includes all four variants unless the user scopes
  the task more narrowly or an upstream/dependency gap is reported.
- Do not create an unrelated missing port merely because another component changed.
- If a change is genuinely runtime- or styling-specific, keep unaffected variants unchanged and
  state why in the handoff.

## Contract to preserve

Keep public names, parts, props, defaults, controlled state, callbacks, refs, DOM anatomy, ARIA,
keyboard behavior, focus management, native form behavior, Ark state/data attributes, CSS variables,
and lifecycle equivalent wherever the frameworks support the same contract.

React is the established product contract, not source code to copy mechanically. Translate it into
native Solid and Tailwind forms using `react-to-solid`, `js-react-conventions`,
`tailwind-component-workflow`, and `css-authoring` as applicable. Preserve intentional framework
differences and verify current Ark APIs instead of emulating missing primitives.

## Synchronization surfaces

For each affected existing variant, update only the surfaces the change reaches:

- implementation and framework-local helpers/icons;
- CSS Module or Tailwind classes and shared foundation tokens;
- behavior tests with equivalent assertions;
- the matching playground story with the same exported scenarios and demo layout;
- package subpath exports and build output;
- the package-owned registry item and dependencies;
- component-local or public documentation when its described contract changed.

Never edit `website/docs/public/r` by hand. When a registry source changes, run
`pnpm run build:registry` and keep only the generated artifacts belonging to the source changes.

## Stories and tests

The four playgrounds are a comparison matrix, not four independent catalogs. For a component that
exists in multiple variants, keep story names, scenario data, states, and demo styling aligned;
adapt only framework syntax and the styling mechanism.

Port tests assertion-for-assertion by behavior. Do not weaken a React assertion to make Solid pass,
or omit a Tailwind override test because the CSS Modules version does not need it. Add
variant-specific coverage only for a real variant-specific contract.

## Completion

Before handoff:

1. Re-run the four-package impact check and report any intentional gap.
2. Run focused tests for every changed package.
3. Build affected package and Storybook outputs when exports, CSS generation, or distribution changed.
4. Run registry generation when registry sources changed.
5. Run the repository validation required by `AGENTS.md`.

For consumer-facing changes, create one multi-package changeset only when explicitly requested; use
`changeset-workflow` to list exactly the affected public packages.
---
name: component-workflow
description: Coordinate moduix component behavior, API, styles, tests, stories, exports, and registries across every shipped framework and styling adapter.
---

# Component Workflow

Own the public component contract across every shipped framework and styling adapter. The current matrix is:

| Runtime | CSS Modules      | Tailwind                  |
| ------- | ---------------- | ------------------------- |
| React   | `packages/react` | `packages/react-tailwind` |
| Solid   | `packages/solid` | `packages/solid-tailwind` |

Vue and Svelte adapters are planned but are not shipped contracts yet. When a new adapter becomes public, add its package and playground rows to this matrix; the rest of this workflow should continue to operate on the discovered shipped set.

Use framework-native code in every package. Share tokens, animations, reset, and presets through
`packages/foundation`; do not create a shared component runtime or generate framework source.

## Start with an impact check

Before editing, locate the component in every shipped adapter and styling variant, together with its
tests, playground stories, exports, local markdown, and registry items.

- Synchronize every counterpart that already exists and is affected by the changed contract.
- A new component intended for the package family includes every shipped variant unless the user scopes
  the task more narrowly or an upstream/dependency gap is reported.
- Do not create an unrelated missing port merely because another component changed.
- If a change is genuinely runtime- or styling-specific, keep unaffected variants unchanged and
  state why in the handoff.

## Contract to preserve

Keep public names, parts, props, defaults, controlled state, callbacks, refs, DOM anatomy, ARIA,
keyboard behavior, focus management, native form behavior, Ark state/data attributes, visual defaults,
and lifecycle equivalent wherever the frameworks support the same contract. Keep framework peers
within the same styling track equivalent. CSS Modules and Tailwind may intentionally expose different
styling mechanisms: detailed component variables for CSS Modules and utility/class overrides for Tailwind.

Treat the shipped public behavior, component-local contract docs, and Ark UI behavior as the product
contract. An existing implementation can provide evidence, but it is not framework-neutral source
code to copy mechanically. Translate the contract into each adapter's native primitives and syntax.
Use framework-specific convention or migration skills when they exist, preserve intentional framework
differences, and verify current Ark APIs instead of emulating missing primitives.

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

The configured playgrounds are a comparison matrix, not independent catalogs. For a component that
exists in multiple variants, keep story names, scenario data, states, and demo styling aligned;
adapt only framework syntax and the styling mechanism.

Port tests assertion-for-assertion by behavior. Do not weaken a React assertion to make Solid pass,
or omit a Tailwind override test because the CSS Modules version does not need it. Add
variant-specific coverage only for a real variant-specific contract.

## Completion

Before handoff:

1. Re-run the shipped-variant impact check and report any intentional gap.
2. Run focused tests for every changed package.
3. Build affected package and Storybook outputs when exports, CSS generation, or distribution changed.
4. Run registry generation when registry sources changed.
5. Run the repository validation required by `AGENTS.md`.

For consumer-facing changes, create one multi-package changeset only when explicitly requested; use
`changeset-workflow` to list exactly the affected public packages.
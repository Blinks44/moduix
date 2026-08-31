---
name: ui-component-workflow
description: Use for implementation, UX/API review, behavior, composition, stories, exports, registry synchronization, and existing Solid-counterpart checks for components in packages/react.
---

# UI Component Workflow

Own the shipped component contract in `packages/react`: behavior, public composition, exports, stories, and registry synchronization. Keep Ark behavior intact while making the moduix API smaller and clearer.

## Read first

1. `AGENTS.md` and the touched component's implementation, styles, story, and local markdown.
2. The public docs and registry manifest when the change reaches consumers.
3. Check whether the component already exists in `packages/solid`; if it does, read its
   implementation, tests, and both playground stories.
4. Current Ark, Chakra, or shadcn sources only when their behavior materially informs the decision;
   use `upstream-library-docs` for that research.

## Workflow

1. Define the changed public contract: behavior, parts, props, refs, state, accessibility, CSS variables, and migration impact.
2. Implement the smallest Ark-shaped change. Preserve lower-level composition when adding narrow convenience parts.
3. If a Solid counterpart exists and the changed contract applies to it, synchronize its native
   implementation, tests, exports, CSS, and playground story using `react-to-solid`. Preserve
   intentional framework differences rather than copying React mechanics.
4. Update exports, stories, local markdown, public docs, and registry artifacts that describe the changed contract.
5. Test the changed behavior and remove obsolete code, examples, and styling paths created by the change.

## API decisions

- Keep Ark behavior, callback detail objects, accessibility semantics, lifecycle, part names, and state attributes unless a documented product decision changes them.
- Prefer an explicit part tree and narrow conveniences over prop-heavy wrapper components, aliases, renamed events, value translators, hidden state machines, or shadcn-shaped compatibility trees.
- Do not add nested prop bags by default. Add one only for a fixed structure and a small recurring subset that explicit composition cannot express clearly.
- Every convenience part remains stylable and composable: preserve meaningful `className`, `data-slot`, CSS variables, or lower-level parts.
- For review-only work, report findings by consumer impact and do not edit implementation.

## Native form controls

When moduix owns Ark's native hidden control, render it on every public composition path and preserve controlled and uncontrolled state, `name`, `form`, validity, reset synchronization, refs, `ids`, provider/context hooks, and `asChild` validity. Do not scan consumer children or add a compatibility registry. Removing a public hidden-control part is an intentional documented API change.

## Synchronization

- Keep stories, package barrels, local markdown, public docs, and registry output aligned with the shipped API.
- Keep `playgrounds/react` and `playgrounds/solid` story scenarios and demo styling aligned whenever
  the component already exists in Solid. The React package story remains the source to copy into the
  React playground; write the Solid version with framework-native syntax.
- If a Solid counterpart exists but a React change is genuinely framework-only and does not alter
  its contract, leave Solid unchanged and state that result in the handoff. If no Solid counterpart
  exists, do not create a new port unless the task requests one.
- Cover exposed provider, context, and state surfaces in stories when they are consumer contracts.
- Update `registry/registry.json` and run `npm run build:registry` when a registry-shipped component changes its public import, styling, or dependency contract.
- Use existing component directory and import conventions; do not start a development server outside the project workflow.
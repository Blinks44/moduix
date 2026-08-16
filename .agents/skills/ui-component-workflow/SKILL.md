---
name: ui-component-workflow
description: Use for implementation, UX/API review, behavior, composition, stories, exports, and registry synchronization of components in packages/react.
---

# UI Component Workflow

Own the shipped component contract in `packages/react`: behavior, public composition, exports, stories, and registry synchronization. Keep Ark behavior intact while making the moduix API smaller and clearer.

## Read first

1. `AGENTS.md` and the touched component's implementation, styles, story, and local markdown.
2. The public docs and registry manifest when the change reaches consumers.
3. Current Ark, Chakra, or shadcn sources only when their behavior materially informs the decision; use `upstream-library-docs` for that research.

## Workflow

1. Define the changed public contract: behavior, parts, props, refs, state, accessibility, CSS variables, and migration impact.
2. Implement the smallest Ark-shaped change. Preserve lower-level composition when adding narrow convenience parts.
3. Update exports, stories, local markdown, public docs, and registry artifacts that describe the changed contract.
4. Test the changed behavior and remove obsolete code, examples, and styling paths created by the change.

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
- Cover exposed provider, context, and state surfaces in stories when they are consumer contracts.
- Update `registry/registry.json` and run `npm run build:registry` when a registry-shipped component changes its public import, styling, or dependency contract.
- Use existing component directory and import conventions; do not start a development server outside the project workflow.
# Skill: ui-component-workflow

Use this skill for work in `packages/ui`.

## Scope

- new components
- component API, behavior, and style changes
- stories, local component docs, and public exports

## Read First

1. `AGENTS.md`
2. `packages/ui/references/base-ui-llms.txt`
3. `packages/ui/references/shadcn-llms.txt`
4. `packages/ui/src/components/<ComponentName>/<component-name>.md`
5. `.ai/skills/cross-package-sync/SKILL.md` when docs parity may be affected

If a required Base UI reference is missing, stop and report it instead of guessing.

Before editing an existing component, inspect:

- current implementation
- CSS module
- stories
- local component markdown
- adjacent docs/examples when the API is user-facing

Build context first. Know what behavior is essential, what styling hooks are public, and what
complexity is historical rather than useful.

## Goal

Build thin styled wrappers over Base UI primitives.

Target shape:

- simple function components
- inline prop typing where possible
- minimal wrapper logic
- predictable composition
- small public API
- simple default path with composition available for advanced cases

Aim for the shadcn feel, but with small, high-value DX sugar when it removes repeated production
boilerplate without turning the component into a configurator.

## Implementation Rules

- Stack: React + TypeScript + CSS Modules + `@base-ui/react`
- Keep component structure consistent:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use PascalCase for component files/folders and kebab-case for the local markdown file.
- Accept `className` on meaningful visual roots.
- Use `data-slot` on exported parts and meaningful styling hooks.
- Prefer direct primitive passthrough over custom wrapper logic.
- Do not add business logic, internal state layers, or future-proofing APIs.

## API Rules

- Prefer composition over feature flags.
- Prefer explicit public parts over `slotProps`, `classNames`, render shims, or prop bags.
- Keep controlled and uncontrolled primitive behavior intact unless a wrapper adds real user value.
- Keep infrastructure slots internal unless they are meaningful building blocks for consumers.
- Do not create god components that own every optional concern.

For every custom prop, ask:

1. Is this a common production case?
2. Can composition already express it?
3. Is it duplicating Base UI?
4. Does it clearly improve DX?
5. Does it keep the component simple?

If the answer is weak, simplify or delete it.

## Small Sugar Contract

Small sugar is allowed only when it improves a frequent default workflow and keeps the real
composition model visible.

Good sugar:

- literal, predictable naming
- narrow scope
- obvious boilerplate reduction
- common production scenario
- composition still available

Bad sugar:

- replaces composition wholesale
- duplicates large areas of primitive API
- introduces parallel customization systems
- exposes internal structure through prop bags
- makes the component harder to explain

Use `Pagination` as the reference shape for non-trivial sugar: keep the compositional API, then add
small headless convenience only where it materially improves repeated usage.

### Popup-like Components

For positioned popup-like `*Content` wrappers, the preferred default contract is:

- `className`
- `side`
- `sideOffset`
- `align`
- `alignOffset`
- `arrowPadding`
- `collisionAvoidance`
- `collisionBoundary`
- `collisionPadding`
- `showArrow`

Rules:

- `showArrow` is the standard name for toggling the built-in arrow.
- built-in arrows are opt-in by default
- `showArrow` only turns the default arrow on or off
- custom arrow content and structural overrides stay in explicit composition

Do not copy this popup vocabulary into dialogs, drawers, alerts, or other non-positioned overlays.

### Dialog-like Components

For dialog-like components:

- keep the visible content wrapper thin
- allow only narrow workflow sugar that matches repeated library usage
- keep backdrop, viewport, and close structure simple by default

If the prop starts describing internal layout or hidden structure, move that behavior back to
composition.

## Typing Rules

- Type props inline unless a named type adds real meaning or reuse.
- Do not export prop aliases that only restate primitive props.
- Avoid helper types, generics, `Pick`, and `Omit` unless they protect a real public contract.
- Keep the public type surface small.
- Keep the file readable without understanding internal type plumbing first.
- When `React.ComponentProps` or similar adds noise, prefer direct type imports such as
  `import type { ComponentProps } from 'react'` in the touched file.

## Refs and Imperative APIs

- Do not add `forwardRef` unless the ref is part of the real consumer API or required by the primitive.
- Remove wrapper-level imperative helpers that are not essential Base UI behavior.

## Styling Rules

- Use tokens from `src/styles/*`.
- Add public styling tokens to `src/styles/theme.css` with `initial` and a nearby default-value comment.
- Keep `theme.css` variables sorted alphabetically, except ordered size scales.
- Keep selectors flat, simple, and readable.
- Remove dead classes, selectors, modifiers, data-attribute branches, and obsolete CSS variables.
- Do not keep defensive or speculative styling complexity.
- Demo layout styles belong in `ComponentName.stories.module.css`, not library CSS.

## Stories, Docs, and Sync

- Stories and local component markdown must reflect the real API.
- Remove deleted props, legacy customization paths, and outdated examples in the same task.
- Prefer short, production-like examples over exhaustive configuration demos.
- If API, behavior, styling hooks, or recommended usage changed, activate `cross-package-sync` and
  update docs in the same task.
- Docs should teach the simple path first, then composition, then advanced escape hatches.
- Keep docs structurally clear and consistent with stronger pages like `Toast`.

## Preservation Rules

Simplification must preserve:

- accessibility behavior
- keyboard navigation
- focus management
- screen reader behavior
- Base UI lifecycle, state, transitions, and interactions
- meaningful styling hooks such as `data-slot`

Remove architecture, not real behavior.

## Done Criteria

The task is done only when all of this is true:

1. `tsx`, `css`, and local `md` files were analyzed before editing.
2. The component is thinner, simpler, and still clearly shadcn-like.
3. The API is no larger than necessary.
4. Any added sugar is small, useful, and tied to a common production case.
5. Dead props, dead types, dead styles, and unnecessary complexity are removed.
6. The component is pleasant and easy for library consumers to use.
7. Stories and local docs match the shipped API.
8. Related docs are updated when public behavior changed.
9. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run build:ui` before `npm run tsc:check` when `packages/ui` changed
   - `npm run tsc:check`
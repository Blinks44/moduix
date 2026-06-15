---
name: ui-component-workflow
description: Use for work in packages/ui, including component implementation, API changes, stories, exports, and local component docs.
---

# Skill: ui-component-workflow

Use this skill for work in `packages/ui`.

## Scope

- new components
- component API, behavior, and style changes
- stories, public exports, and local component docs

## Read First

1. `AGENTS.md`
2. `packages/ui/src/components/<component-name>/<component-name>.md`
3. `.agents/skills/js-react-conventions/SKILL.md`
4. `.agents/skills/upstream-library-docs/SKILL.md` when Base UI or shadcn behavior matters
5. `.agents/skills/local-component-docs/SKILL.md` when component markdown changes
6. `.agents/skills/cross-package-sync/SKILL.md` when public changes affect docs
7. `references/component-family-contracts.md` for popup-like and dialog-like families

Before editing an existing component, inspect the TSX implementation, CSS module, stories, and local component markdown. Check public docs/examples when the change is user-facing.

## Goal

Build thin styled wrappers over Base UI primitives:

- minimal wrapper logic
- predictable composition
- small public API
- simple default path with explicit advanced composition

Small DX sugar is acceptable only when it removes repeated production boilerplate without hiding the real composition model.

## Core Rules

- Keep the standard component shape:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use `kebab-case` for component folders and local markdown files.
- Prefer relative imports for component-to-component dependencies inside `src/components`.
- Use `@/lib/moduix/*` imports for shared registry-safe utilities, icons, and foundation code.
- Accept `className` on meaningful visual roots.
- Use stable `data-slot` hooks on exported parts.
- Prefer direct primitive passthrough over custom wrapper logic.
- Prefer composition over feature flags, slot bags, render shims, and prop bags.
- Keep controlled/uncontrolled primitive behavior intact unless the wrapper adds clear value.
- Keep infrastructure slots internal unless they are meaningful consumer building blocks.
- Do not add business logic, extra state layers, speculative APIs, or god components.

For every custom prop, ask:

1. Is this common in production?
2. Can composition already express it?
3. Is it duplicating Base UI?
4. Does it clearly improve DX?
5. Does it keep the component simple?

If the answer is weak, simplify or remove it.

## Styling and Sync

- Use tokens from `src/styles/*`.
- Add public styling tokens to `src/styles/theme.css` with `initial` and a nearby default-value comment.
- Keep selectors flat and readable. Remove dead classes, modifiers, and obsolete CSS variables.
- Put demo-only layout styles in stories CSS, not library CSS.
- Stories and local component markdown must match the shipped API.
- Remove deleted props, legacy customization paths, and outdated examples in the same task.
- If API, behavior, styling hooks, or recommended usage changed, update local component markdown in the same task.
- If docs become inaccurate, apply `cross-package-sync`.
- If a registry-shipped component changes public styling, import contract, or registry dependencies, update `registry.json` and run `npm run build:registry`.
- Simplification must preserve accessibility behavior, keyboard navigation, focus management, screen reader behavior, Base UI lifecycle/state/transitions, and meaningful styling hooks.

## Validation

Run the required checks from `AGENTS.md` after changes.
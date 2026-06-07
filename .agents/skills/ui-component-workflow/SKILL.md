---
name: ui-component-workflow
description: Use for work in packages/ui, including component implementation, API changes, stories, exports, and local component docs.
---

# Skill: ui-component-workflow

Use this skill for work in `packages/ui`.

## Scope

- new components
- component API, behavior, and style changes
- stories, local component docs, and public exports

## Read First

1. `AGENTS.md`
2. `.agents/skills/upstream-library-docs/SKILL.md` when Base UI or shadcn reference material matters
3. `packages/ui/src/components/<component-name>/<component-name>.md`
4. `.agents/skills/local-component-docs/SKILL.md` when component markdown is created or updated
5. `.agents/skills/cross-package-sync/SKILL.md` when public changes affect docs
6. `references/component-family-contracts.md` when popup-like or dialog-like contracts matter

Before editing an existing component, inspect the implementation, CSS module, stories, local markdown, and user-facing docs/examples when relevant.

## Goal

Build thin styled wrappers over Base UI primitives:

- simple function components
- inline prop typing where practical
- minimal wrapper logic
- predictable composition
- small public API
- simple default path with explicit advanced composition

Small DX sugar is acceptable only when it removes repeated production boilerplate without hiding the real composition model.

## Rules

- Stack: React, TypeScript, CSS Modules, `@base-ui/react`
- Keep the standard component shape:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use `kebab-case` for component folders and local markdown files. Keep the main implementation, CSS module, stories, and `index.ts` filenames in their current per-component names, for example `password-input/PasswordInput.tsx`.
- Prefer relative imports for component-to-component dependencies inside `src/components`.
- Use `@/lib/moduix/*` imports for shared utilities, icons, and registry-safe foundation code.
- Accept `className` on meaningful visual roots.
- Use `data-slot` on exported parts and meaningful styling hooks.
- Prefer direct primitive passthrough over custom wrapper logic.
- Do not add business logic, extra state layers, or speculative APIs.
- Prefer composition over feature flags.
- Prefer explicit public parts over `slotProps`, `classNames`, render shims, or prop bags.
- Keep controlled and uncontrolled primitive behavior intact unless a wrapper adds clear value.
- Keep infrastructure slots internal unless they are meaningful building blocks for consumers.
- Do not build god components.

For every custom prop, ask:

1. Is this common in production?
2. Can composition already express it?
3. Is it duplicating Base UI?
4. Does it clearly improve DX?
5. Does it keep the component simple?

If the answer is weak, simplify or remove it.

Typing and refs:

- Type props inline unless a named type adds real meaning or reuse.
- Do not export prop aliases that only restate primitive props.
- Avoid helper types, generics, `Pick`, and `Omit` unless they protect a real public contract.
- Keep the public type surface small.
- Do not add `forwardRef` unless the ref is part of the real consumer API or required by the primitive.
- Remove wrapper-level imperative helpers that are not essential Base UI behavior.

Styling:

- Use tokens from `src/styles/*`.
- Add public styling tokens to `src/styles/theme.css` with `initial` and a nearby default-value comment.
- Keep `theme.css` variables sorted alphabetically except ordered size scales.
- Keep selectors flat and readable.
- Remove dead classes, selectors, modifiers, and obsolete CSS variables.
- Put demo-only layout styles in stories CSS, not library CSS.

Sync and preservation:

- Stories and local component markdown must match the shipped API.
- Remove deleted props, legacy customization paths, and outdated examples in the same task.
- If API, behavior, styling hooks, or recommended usage changed, update component markdown in the same task and apply `cross-package-sync` when docs are affected.
- If a registry-ready component changes its public styling, import contract, or registry dependency graph, update the root `registry.json`, rebuild the registry output with `npm run build:registry`, and keep `quick-start.mdx`, README files, and component install snippets aligned.
- Simplification must preserve accessibility behavior, keyboard navigation, focus management, screen reader behavior, Base UI lifecycle/state/transitions, and meaningful styling hooks such as `data-slot`.
- Load `references/component-family-contracts.md` for popup-like and dialog-like family rules instead of repeating them in task notes.

## Done Criteria

1. TSX, CSS, stories, and local markdown were reviewed before editing.
2. The component is thinner and no more complex than necessary.
3. Stories and local docs match the shipped API.
4. Public docs were updated when user-facing behavior changed.
5. Required validation from `AGENTS.md` passed.
6. `npm run build:registry` ran when registry-shipped source code in `packages/ui` changed.
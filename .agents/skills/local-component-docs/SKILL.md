---
name: local-component-docs
description: Use for component-local markdown in packages/react/src/components, including wrapper contracts, preservation notes, and concise changelog entries.
---

# Local Component Docs

Own a component's local markdown in `packages/react/src/components`. It records the shipped moduix wrapper contract for maintainers; it is not a second public documentation site or a copy of upstream reference material.

## Write the wrapper contract

- Describe moduix's exported parts, defaults, composition, accessibility, styling hooks, and intentional differences from upstream.
- Use Ark and Chakra only to understand the model. Preserve the Ark mental model first, then explain moduix conveniences.
- If no dedicated Ark primitive exists, say so plainly and name the exact Ark guide, factory model, or moduix-owned contract. Do not invent upstream anatomy.
- Keep public identifiers, imports, callbacks, CSS variables, and state names exact.

## Coverage

Document relevant exposed behavior, not a generic checklist: refs, `Field`/`Fieldset` state inheritance, hidden native controls and reset/submission behavior, `asChild`, `ids`, context hooks, `RootProvider`, lazy mounting, `present`, exit animation, and consumer-targetable state attributes or CSS variables.

For a moduix-owned native form control, state whether moduix inserts it automatically, where it renders, how `name` and `form` work, and which semantic props replace manual configuration. Do not list an internal part as public anatomy.

## Structure

Use these compact sections when relevant:

1. **Upstream reference** — exact URL or explicit absence of a dedicated primitive.
2. **Purpose** — one short statement.
3. **Public contract** — parts, defaults, and composition.
4. **Preservation notes** — Ark-shaped behavior that must not regress.
5. **Styling and accessibility** — only real consumer hooks and constraints.
6. **Differences from upstream** — intentional deviations and migration notes.

## Keep it current

Update the local markdown with API, behavior, styling, CSS-variable, accessibility, or recommended-composition changes. Add a short dated changelog entry only for material user-facing contract changes; avoid implementation trivia.
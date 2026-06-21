# Bleed

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI refs: https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/bleed

## Purpose

`Bleed` lets a child intentionally escape a constrained parent while staying in normal document
flow. Use it for full-width media, section backgrounds, dividers, and panels inside a centered or
padded layout.

Ark UI does not ship a dedicated `Bleed` primitive, so moduix implements this component as an
Ark-aligned factory wrapper with `@ark-ui/react/factory`.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Keeps the API intentionally small: one root part with polymorphic DOM ownership through `asChild`.
- Keeps the layout model explicit: negative inline and block margins on a single root.
- Uses Chakra's `inline` and `block` axis model as a secondary reference while keeping moduix's
  token-based values and full-viewport mode.

## Current behavior contract

- Uses Ark-style root composition: `Bleed.Root`.
- `Bleed` itself is the same root component with `Bleed.Root` attached for namespace consistency.
- Root accepts Ark factory div props, including `asChild`.
- Applies `data-scope="bleed"`, `data-part="root"`, `data-slot="bleed-root"`, `data-inline`, and
  `data-block` on the root.
- Applies negative inline and/or block margins with CSS Modules and `--bleed-*` variables.
- Does not add inner wrappers, state, ARIA, keyboard handling, focus management, or lifecycle
  behavior.
- Preserves normal document flow; it is not positioned and does not portal content.

## Anatomy and exported parts

```text
Bleed.Root
└─ children
```

Every exported part accepts `className` and uses the standard hooks below:

| Part         | Hook                     | Notes                                           |
| ------------ | ------------------------ | ----------------------------------------------- |
| `Bleed.Root` | `data-slot="bleed-root"` | Root layout wrapper for inline and block bleed. |
| `Bleed.Root` | `data-scope="bleed"`     | Ark-aligned component scope.                    |
| `Bleed.Root` | `data-part="root"`       | Ark-aligned part name.                          |
| `Bleed.Root` | `data-inline`            | Selects inline bleed behavior.                  |
| `Bleed.Root` | `data-block`             | Selects block bleed behavior.                   |

## Composition

```tsx
import { Bleed } from '@moduix/react';

<Bleed asChild>
  <figure>
    <img src="/hero.png" alt="Map preview" />
    <figcaption>Full-width media inside a constrained article.</figcaption>
  </figure>
</Bleed>;
```

`Bleed` is composition-first: put any visual surface, media, text, or semantic content inside it.
Use `asChild` when another element should own the rendered DOM node.

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior.
- `Styling`: follows Ark's `className`, `data-scope`, and `data-part` guidance.
- `Refs`: the forwarded ref targets the rendered root, or the single child element with `asChild`.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `Bleed` component
  page for this wrapper to mirror.
- `Stateful or behavioral patterns`: intentionally unsupported; `Bleed` remains a single-root
  layout primitive.
- `Chakra directional props`: intentionally not exposed. moduix supports axis-level `inline` and
  `block` modes, not `inlineStart`, `inlineEnd`, `blockStart`, or `blockEnd`.

## Accessibility and state

- `Bleed` has no managed state, callbacks, or ARIA behavior.
- `asChild` requires exactly one semantic child that accepts DOM props and a ref.
- A normal root ref resolves to `HTMLDivElement`; with `asChild`, Ark forwards it to the rendered
  child element.
- The root keeps stable hooks for styling and test targeting:
  - `data-scope`
  - `data-part`
  - `data-slot`
  - `data-inline`
  - `data-block`
- Because the root stays in normal document flow, reading order and focus order follow JSX order.

## Defaults and styling

| Entry       | Default | Values / Notes                               |
| ----------- | ------- | -------------------------------------------- |
| `inline`    | `full`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `block`     | `none`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`         |
| `asChild`   | `false` | Ark factory composition                      |
| `className` | -       | Applied to the root                          |

Public CSS variables:

| Variable                   | Default            | Used by                |
| -------------------------- | ------------------ | ---------------------- |
| `--bleed-block-xs`         | `var(--spacing-1)` | `block="xs"`           |
| `--bleed-block-sm`         | `var(--spacing-2)` | `block="sm"`           |
| `--bleed-block-md`         | `var(--spacing-3)` | `block="md"`           |
| `--bleed-block-lg`         | `var(--spacing-4)` | `block="lg"`           |
| `--bleed-block-xl`         | `var(--spacing-6)` | `block="xl"`           |
| `--bleed-inline-full`      | `calc(50% - 50vw)` | `inline="full"` margin |
| `--bleed-inline-full-size` | `100vw`            | `inline="full"` width  |
| `--bleed-inline-xs`        | `var(--spacing-1)` | `inline="xs"`          |
| `--bleed-inline-sm`        | `var(--spacing-2)` | `inline="sm"`          |
| `--bleed-inline-md`        | `var(--spacing-3)` | `inline="md"`          |
| `--bleed-inline-lg`        | `var(--spacing-4)` | `inline="lg"`          |
| `--bleed-inline-xl`        | `var(--spacing-6)` | `inline="xl"`          |

## Intentional sugar and differences from upstream

- There is still no upstream Ark primitive for this component; moduix keeps it as a thin factory
  wrapper rather than inventing a richer primitive surface.
- The old `as` prop was removed in favor of Ark `asChild`.
- moduix adds Ark-style namespace access through `Bleed.Root`.
- moduix adds Ark-style `data-scope` and `data-part` hooks on the root.
- moduix defaults to token-based axis values and adds `inline="full"`; this differs from Chakra's
  arbitrary style-value and one-sided direction props.

## Agent notes

- Keep `Bleed` a thin single-root layout primitive.
- Add sugar only if it removes frequent production boilerplate without hiding the simple
  margin-based model. The current `inline`, `block`, and Ark root props are the intended public
  surface.
- If CSS variables change, update `theme.css`, docs CSS Properties, stories/examples, and this file
  in the same task.

## Local changelog

- 2026-06-18: Completed the Ark migration audit, documented factory composition, ref and
  `asChild` constraints, Chakra-informed differences, and the preferred root-only `<Bleed />`
  usage.
- 2026-06-17: Migrated `Bleed` to an Ark-aligned factory wrapper, added `Bleed.Root`, replaced
  `as` with `asChild`, and aligned docs/examples to the new root contract.